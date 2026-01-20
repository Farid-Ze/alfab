// Package metrics provides application metrics tracking.
package metrics

import (
	"sync"
	"sync/atomic"
	"time"
)

// Counter is a simple atomic counter
type Counter struct {
	value int64
}

// Inc increments the counter by 1
func (c *Counter) Inc() {
	atomic.AddInt64(&c.value, 1)
}

// Add adds the given value to the counter
func (c *Counter) Add(delta int64) {
	atomic.AddInt64(&c.value, delta)
}

// Value returns the current counter value
func (c *Counter) Value() int64 {
	return atomic.LoadInt64(&c.value)
}

// Gauge is a simple gauge that can go up and down
type Gauge struct {
	value int64
}

// Set sets the gauge to the given value
func (g *Gauge) Set(value int64) {
	atomic.StoreInt64(&g.value, value)
}

// Inc increments the gauge by 1
func (g *Gauge) Inc() {
	atomic.AddInt64(&g.value, 1)
}

// Dec decrements the gauge by 1
func (g *Gauge) Dec() {
	atomic.AddInt64(&g.value, -1)
}

// Value returns the current gauge value
func (g *Gauge) Value() int64 {
	return atomic.LoadInt64(&g.value)
}

// Histogram tracks value distributions (simplified)
type Histogram struct {
	mu     sync.Mutex
	count  int64
	sum    float64
	min    float64
	max    float64
	values []float64
}

// Observe records a value
func (h *Histogram) Observe(value float64) {
	h.mu.Lock()
	defer h.mu.Unlock()

	h.count++
	h.sum += value

	if h.count == 1 || value < h.min {
		h.min = value
	}
	if h.count == 1 || value > h.max {
		h.max = value
	}

	// Keep last 1000 values for percentile calculation
	if len(h.values) >= 1000 {
		h.values = h.values[1:]
	}
	h.values = append(h.values, value)
}

// Count returns the number of observations
func (h *Histogram) Count() int64 {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.count
}

// Sum returns the sum of all observations
func (h *Histogram) Sum() float64 {
	h.mu.Lock()
	defer h.mu.Unlock()
	return h.sum
}

// Mean returns the average value
func (h *Histogram) Mean() float64 {
	h.mu.Lock()
	defer h.mu.Unlock()
	if h.count == 0 {
		return 0
	}
	return h.sum / float64(h.count)
}

// Metrics holds application metrics
type Metrics struct {
	// HTTP metrics
	HTTPRequestsTotal   Counter
	HTTPRequestDuration Histogram

	// Lead metrics
	LeadsCreatedTotal Counter
	LeadsFailedTotal  Counter

	// System metrics
	ActiveConnections Gauge
	StartTime         time.Time
}

// NewMetrics creates a new Metrics instance
func NewMetrics() *Metrics {
	return &Metrics{
		StartTime: time.Now(),
	}
}

// Uptime returns the duration since start
func (m *Metrics) Uptime() time.Duration {
	return time.Since(m.StartTime)
}

// Snapshot returns a snapshot of all metrics
func (m *Metrics) Snapshot() map[string]interface{} {
	return map[string]interface{}{
		"uptime_seconds":        m.Uptime().Seconds(),
		"http_requests_total":   m.HTTPRequestsTotal.Value(),
		"http_request_duration_mean_ms": m.HTTPRequestDuration.Mean() * 1000,
		"leads_created_total":   m.LeadsCreatedTotal.Value(),
		"leads_failed_total":    m.LeadsFailedTotal.Value(),
		"active_connections":    m.ActiveConnections.Value(),
	}
}
