// Package smoke_notify tests notification delivery.
package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"github.com/joho/godotenv"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/domain/notification"
	"example.com/alfabeauty-b2b/internal/notify"
)

func main() {
	_ = godotenv.Load()

	cfg, err := config.LoadFromEnv()
	if err != nil {
		log.Fatalf("config error: %v", err)
	}

	ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
	defer cancel()

	// Create notifier
	notifier := notify.NewNotifier(cfg)

	// Create test notification
	testNotif := notification.Notification{
		Type:    notification.TypeLeadCreated,
		Subject: "[SMOKE TEST] New Partner Lead",
		Body:    "This is a smoke test notification for the lead notification system.",
		Metadata: map[string]string{
			"test":      "true",
			"timestamp": time.Now().Format(time.RFC3339),
		},
	}

	// Send notification
	if err := notifier.Send(ctx, testNotif); err != nil {
		log.Fatalf("notification failed: %v", err)
	}

	fmt.Println("✓ Smoke test notification sent successfully")
}
