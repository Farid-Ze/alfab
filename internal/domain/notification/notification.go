// Package notification defines notification domain models.
package notification

import (
	"time"

	"github.com/google/uuid"
)

// NotificationType defines the type of notification
type NotificationType string

const (
	TypeLeadCreated  NotificationType = "LEAD_CREATED"
	TypeLeadUpdated  NotificationType = "LEAD_UPDATED"
	TypeSystemAlert  NotificationType = "SYSTEM_ALERT"
	TypeEventReminder NotificationType = "EVENT_REMINDER"
)

// Notification represents a notification to be sent
type Notification struct {
	ID        uuid.UUID            `json:"id"`
	Type      NotificationType     `json:"type"`
	Subject   string               `json:"subject"`
	Body      string               `json:"body"`
	Recipient string               `json:"recipient,omitempty"`
	Channel   NotificationChannel  `json:"channel"`
	Status    NotificationStatus   `json:"status"`
	Metadata  map[string]string    `json:"metadata,omitempty"`
	Attempts  int                  `json:"attempts"`
	LastError string               `json:"last_error,omitempty"`
	CreatedAt time.Time            `json:"created_at"`
	SentAt    *time.Time           `json:"sent_at,omitempty"`
}

// NotificationChannel defines delivery channel
type NotificationChannel string

const (
	ChannelEmail    NotificationChannel = "EMAIL"
	ChannelWebhook  NotificationChannel = "WEBHOOK"
	ChannelWhatsApp NotificationChannel = "WHATSAPP"
	ChannelSlack    NotificationChannel = "SLACK"
)

// NotificationStatus defines the delivery status
type NotificationStatus string

const (
	StatusPending   NotificationStatus = "PENDING"
	StatusSending   NotificationStatus = "SENDING"
	StatusSent      NotificationStatus = "SENT"
	StatusFailed    NotificationStatus = "FAILED"
	StatusRetrying  NotificationStatus = "RETRYING"
)

// NewNotification creates a new notification
func NewNotification(notifType NotificationType, subject, body string) Notification {
	return Notification{
		ID:        uuid.New(),
		Type:      notifType,
		Subject:   subject,
		Body:      body,
		Channel:   ChannelWebhook,
		Status:    StatusPending,
		Metadata:  make(map[string]string),
		CreatedAt: time.Now().UTC(),
	}
}

// MarkSent marks the notification as sent
func (n *Notification) MarkSent() {
	now := time.Now().UTC()
	n.Status = StatusSent
	n.SentAt = &now
}

// MarkFailed marks the notification as failed
func (n *Notification) MarkFailed(err error) {
	n.Status = StatusFailed
	n.LastError = err.Error()
	n.Attempts++
}

// ShouldRetry checks if notification should be retried
func (n *Notification) ShouldRetry(maxAttempts int) bool {
	return n.Status == StatusFailed && n.Attempts < maxAttempts
}
