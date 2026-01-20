// Package notify provides notification delivery services.
package notify

import (
	"bytes"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"time"

	"example.com/alfabeauty-b2b/internal/config"
	"example.com/alfabeauty-b2b/internal/domain/notification"
)

// Notifier handles notification delivery
type Notifier struct {
	cfg        config.Config
	httpClient *http.Client
}

// NewNotifier creates a new Notifier
func NewNotifier(cfg config.Config) *Notifier {
	return &Notifier{
		cfg: cfg,
		httpClient: &http.Client{
			Timeout: 30 * time.Second,
		},
	}
}

// Send sends a notification
func (n *Notifier) Send(ctx context.Context, notif notification.Notification) error {
	switch notif.Channel {
	case notification.ChannelWebhook:
		return n.sendWebhook(ctx, notif)
	case notification.ChannelEmail:
		return n.sendEmail(ctx, notif)
	default:
		// Default to webhook if configured
		if n.cfg.WebhookURL != "" {
			return n.sendWebhook(ctx, notif)
		}
		// Log only for demo mode
		log.Printf("[NOTIFY] %s: %s - %s", notif.Type, notif.Subject, notif.Body)
		return nil
	}
}

// sendWebhook sends notification via webhook
func (n *Notifier) sendWebhook(ctx context.Context, notif notification.Notification) error {
	if n.cfg.WebhookURL == "" {
		// No webhook configured, just log
		log.Printf("[NOTIFY-WEBHOOK] %s: %s", notif.Type, notif.Subject)
		return nil
	}

	payload := map[string]interface{}{
		"type":       notif.Type,
		"subject":    notif.Subject,
		"body":       notif.Body,
		"metadata":   notif.Metadata,
		"created_at": notif.CreatedAt.Format(time.RFC3339),
	}

	jsonData, err := json.Marshal(payload)
	if err != nil {
		return fmt.Errorf("failed to marshal notification: %w", err)
	}

	req, err := http.NewRequestWithContext(ctx, http.MethodPost, n.cfg.WebhookURL, bytes.NewBuffer(jsonData))
	if err != nil {
		return fmt.Errorf("failed to create request: %w", err)
	}

	req.Header.Set("Content-Type", "application/json")
	if n.cfg.WebhookSecret != "" {
		req.Header.Set("X-Webhook-Secret", n.cfg.WebhookSecret)
	}

	resp, err := n.httpClient.Do(req)
	if err != nil {
		return fmt.Errorf("webhook request failed: %w", err)
	}
	defer resp.Body.Close()

	if resp.StatusCode >= 400 {
		return fmt.Errorf("webhook returned status %d", resp.StatusCode)
	}

	return nil
}

// sendEmail sends notification via email (placeholder)
func (n *Notifier) sendEmail(ctx context.Context, notif notification.Notification) error {
	// TODO: Implement email sending via SMTP or email service API
	log.Printf("[NOTIFY-EMAIL] To: %s, Subject: %s", notif.Recipient, notif.Subject)
	return nil
}

// SendLeadNotification sends a notification for a new lead
func (n *Notifier) SendLeadNotification(ctx context.Context, businessName, contactName, phone, city string) error {
	notif := notification.NewNotification(
		notification.TypeLeadCreated,
		fmt.Sprintf("New Partner Lead: %s", businessName),
		fmt.Sprintf("New lead from %s (%s) in %s. Phone: %s", contactName, businessName, city, phone),
	)
	notif.Metadata["business_name"] = businessName
	notif.Metadata["contact_name"] = contactName
	notif.Metadata["phone"] = phone
	notif.Metadata["city"] = city

	return n.Send(ctx, notif)
}
