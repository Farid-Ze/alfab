package memory

import (
	"context"
	"testing"

	"github.com/google/uuid"

	"example.com/alfabeauty-b2b/internal/domain/notification"
	"example.com/alfabeauty-b2b/internal/obs"
)

func TestLeadNotificationRepository_EnqueueStoresTraceparent(t *testing.T) {
	repo := NewLeadNotificationRepository()
	leadID := uuid.New()
	tp := "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"

	ctx := obs.WithTraceparent(context.Background(), tp)
	if err := repo.Enqueue(ctx, leadID, "webhook"); err != nil {
		t.Fatalf("enqueue: %v", err)
	}

	ids := repo.IDs()
	if len(ids) != 1 {
		t.Fatalf("expected 1 notification, got %d", len(ids))
	}

	n, err := repo.GetByID(ids[0])
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if n.Traceparent != tp {
		t.Fatalf("expected traceparent %q, got %q", tp, n.Traceparent)
	}
	if n.Status != notification.StatusPending {
		t.Fatalf("expected status %q, got %q", notification.StatusPending, n.Status)
	}
}

func TestLeadNotificationRepository_EnqueueDuplicateFillsTraceparentWhenMissing(t *testing.T) {
	repo := NewLeadNotificationRepository()
	leadID := uuid.New()
	tp := "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"

	if err := repo.Enqueue(context.Background(), leadID, "webhook"); err != nil {
		t.Fatalf("enqueue: %v", err)
	}
	if err := repo.Enqueue(obs.WithTraceparent(context.Background(), tp), leadID, "webhook"); err != nil {
		t.Fatalf("enqueue duplicate: %v", err)
	}

	ids := repo.IDs()
	if len(ids) != 1 {
		t.Fatalf("expected 1 notification, got %d", len(ids))
	}

	n, err := repo.GetByID(ids[0])
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if n.Traceparent != tp {
		t.Fatalf("expected traceparent to be filled with %q, got %q", tp, n.Traceparent)
	}
}

func TestLeadNotificationRepository_EnqueueDuplicateDoesNotOverwriteTraceparent(t *testing.T) {
	repo := NewLeadNotificationRepository()
	leadID := uuid.New()
	tp1 := "00-4bf92f3577b34da6a3ce929d0e0e4736-00f067aa0ba902b7-01"
	tp2 := "00-11111111111111111111111111111111-2222222222222222-01"

	if err := repo.Enqueue(obs.WithTraceparent(context.Background(), tp1), leadID, "webhook"); err != nil {
		t.Fatalf("enqueue: %v", err)
	}
	if err := repo.Enqueue(obs.WithTraceparent(context.Background(), tp2), leadID, "webhook"); err != nil {
		t.Fatalf("enqueue duplicate: %v", err)
	}

	ids := repo.IDs()
	if len(ids) != 1 {
		t.Fatalf("expected 1 notification, got %d", len(ids))
	}

	n, err := repo.GetByID(ids[0])
	if err != nil {
		t.Fatalf("get: %v", err)
	}
	if n.Traceparent != tp1 {
		t.Fatalf("expected traceparent to remain %q, got %q", tp1, n.Traceparent)
	}
}
