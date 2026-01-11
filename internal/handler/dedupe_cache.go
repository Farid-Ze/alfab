package handler

import (
	"container/list"
	"sync"
	"time"
)

// dedupeCache is a small in-memory TTL + LRU cache.
//
// Purpose: best-effort dedupe for telemetry retries (e.g. metric_id), so we don't
// double-count when the client re-sends on navigation/visibilitychange.
//
// Notes:
// - This is intentionally best-effort (single-process). In multi-replica
//   deployments, use a shared store if strict global dedupe is required.
// - Capacity is bounded by maxEntries.
type dedupeCache struct {
	mu         sync.Mutex
	maxEntries int
	ttl        time.Duration

	// order is LRU: front = newest, back = oldest.
	order *list.List
	items map[string]*list.Element
}

type dedupeEntry struct {
	key       string
	expiresAt time.Time
}

func newDedupeCache(maxEntries int, ttl time.Duration) *dedupeCache {
	if maxEntries <= 0 {
		maxEntries = 1
	}
	if ttl <= 0 {
		ttl = time.Minute
	}
	return &dedupeCache{
		maxEntries: maxEntries,
		ttl:        ttl,
		order:      list.New(),
		items:      make(map[string]*list.Element, maxEntries),
	}
}

// Seen returns true if key exists and is not expired; otherwise it records key
// and returns false.
func (c *dedupeCache) Seen(key string, now time.Time) bool {
	c.mu.Lock()
	defer c.mu.Unlock()

	if key == "" {
		return false
	}

	if el, ok := c.items[key]; ok {
		e := el.Value.(*dedupeEntry)
		if now.Before(e.expiresAt) {
			// Refresh LRU position.
			c.order.MoveToFront(el)
			return true
		}
		// Expired: remove and re-add below.
		c.order.Remove(el)
		delete(c.items, key)
	}

	// Insert new.
	el := c.order.PushFront(&dedupeEntry{key: key, expiresAt: now.Add(c.ttl)})
	c.items[key] = el

	// Enforce capacity.
	for len(c.items) > c.maxEntries {
		oldest := c.order.Back()
		if oldest == nil {
			break
		}
		e := oldest.Value.(*dedupeEntry)
		c.order.Remove(oldest)
		delete(c.items, e.key)
	}

	return false
}
