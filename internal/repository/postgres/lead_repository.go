package postgres

import (
	"context"
	"database/sql"
	"encoding/json"
	"fmt"
	"time"

	"example.com/alfabeauty-b2b/internal/domain/lead"
	"github.com/google/uuid"
)

type LeadRepository struct {
	db *sql.DB
}

func NewLeadRepository(db *sql.DB) *LeadRepository {
	return &LeadRepository{db: db}
}

func (r *LeadRepository) Create(ctx context.Context, l lead.Lead) (lead.Lead, error) {
	l.Normalize()

	var idem sql.NullString
	if l.IdempotencyKeyHash != "" {
		idem = sql.NullString{String: l.IdempotencyKeyHash, Valid: true}
	}

	raw, _ := json.Marshal(map[string]any{
		"business_name":       l.BusinessName,
		"contact_name":        l.ContactName,
		"phone_whatsapp":      l.PhoneWhatsApp,
		"city":                l.City,
		"salon_type":          l.SalonType,
		"consent":             l.Consent,
		"chair_count":         l.ChairCount,
		"specialization":      l.Specialization,
		"current_brands_used": l.CurrentBrandsUsed,
		"monthly_spend_range": l.MonthlySpendRange,
		"email":               l.Email,
		"message":             l.Message,
		"page_url_initial":     l.PageURLInitial,
		"page_url_current":     l.PageURLCurrent,
		"user_agent":           l.UserAgent,
		"ip_address":           l.IPAddress,
	})

	q := `
		WITH ins AS (
			INSERT INTO leads (
				idempotency_key_hash,
				name, email, phone, message,
				business_name, contact_name, phone_whatsapp, city, salon_type, consent,
				chair_count, specialization, current_brands_used, monthly_spend_range,
				page_url_initial, page_url_current,
				user_agent, ip_address,
				raw
			)
			VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12,$13,$14,$15,$16,$17,$18,$19,$20,$21)
			ON CONFLICT (idempotency_key_hash) WHERE idempotency_key_hash IS NOT NULL DO NOTHING
			RETURNING
				id, created_at,
				idempotency_key_hash,
				business_name, contact_name, phone_whatsapp, city, salon_type, consent,
				chair_count, specialization, current_brands_used, monthly_spend_range,
				email, message,
				page_url_initial, page_url_current,
				user_agent, ip_address
		)
		SELECT
			id, created_at,
			COALESCE(idempotency_key_hash, ''),
			business_name, contact_name, phone_whatsapp, city, salon_type, consent,
			chair_count, specialization, current_brands_used, monthly_spend_range,
			email, message,
			page_url_initial, page_url_current,
			user_agent, ip_address
		FROM ins
		UNION ALL
		SELECT
			id, created_at,
			COALESCE(idempotency_key_hash, ''),
			business_name, contact_name, phone_whatsapp, city, salon_type, consent,
			chair_count, specialization, current_brands_used, monthly_spend_range,
			email, message,
			page_url_initial, page_url_current,
			user_agent, ip_address
		FROM leads
		WHERE $1 IS NOT NULL AND idempotency_key_hash = $1
		ORDER BY created_at DESC
		LIMIT 1;
	`

	// Keep legacy non-null columns populated for backward compatibility.
	legacyName := l.ContactName
	legacyPhone := l.PhoneWhatsApp

	row := r.db.QueryRowContext(ctx, q,
		idem,
		legacyName,
		l.Email,
		legacyPhone,
		l.Message,
		l.BusinessName,
		l.ContactName,
		l.PhoneWhatsApp,
		l.City,
		l.SalonType,
		l.Consent,
		l.ChairCount,
		l.Specialization,
		l.CurrentBrandsUsed,
		l.MonthlySpendRange,
		l.PageURLInitial,
		l.PageURLCurrent,
		l.UserAgent,
		l.IPAddress,
		raw,
	)

	if err := row.Scan(
		&l.ID,
		&l.CreatedAt,
		&l.IdempotencyKeyHash,
		&l.BusinessName,
		&l.ContactName,
		&l.PhoneWhatsApp,
		&l.City,
		&l.SalonType,
		&l.Consent,
		&l.ChairCount,
		&l.Specialization,
		&l.CurrentBrandsUsed,
		&l.MonthlySpendRange,
		&l.Email,
		&l.Message,
		&l.PageURLInitial,
		&l.PageURLCurrent,
		&l.UserAgent,
		&l.IPAddress,
	); err != nil {
		return lead.Lead{}, fmt.Errorf("insert lead: %w", err)
	}

	return l, nil
}

func (r *LeadRepository) GetByID(ctx context.Context, id uuid.UUID) (lead.Lead, error) {
	q := `
		SELECT
			id, created_at,
			COALESCE(idempotency_key_hash, ''),
			business_name, contact_name, phone_whatsapp, city, salon_type, consent,
			chair_count, specialization, current_brands_used, monthly_spend_range,
			email, message,
			page_url_initial, page_url_current,
			user_agent, ip_address
		FROM leads
		WHERE id = $1;
	`

	var l lead.Lead
	if err := r.db.QueryRowContext(ctx, q, id).Scan(
		&l.ID,
		&l.CreatedAt,
		&l.IdempotencyKeyHash,
		&l.BusinessName,
		&l.ContactName,
		&l.PhoneWhatsApp,
		&l.City,
		&l.SalonType,
		&l.Consent,
		&l.ChairCount,
		&l.Specialization,
		&l.CurrentBrandsUsed,
		&l.MonthlySpendRange,
		&l.Email,
		&l.Message,
		&l.PageURLInitial,
		&l.PageURLCurrent,
		&l.UserAgent,
		&l.IPAddress,
	); err != nil {
		return lead.Lead{}, fmt.Errorf("get lead by id: %w", err)
	}

	return l, nil
}

func (r *LeadRepository) List(ctx context.Context, limit int, before time.Time) ([]lead.Lead, error) {
	if limit <= 0 {
		limit = 100
	}
	if limit > 5000 {
		limit = 5000
	}

	qBase := `
		SELECT
			id, created_at,
			COALESCE(idempotency_key_hash, ''),
			business_name, contact_name, phone_whatsapp, city, salon_type, consent,
			chair_count, specialization, current_brands_used, monthly_spend_range,
			email, message,
			page_url_initial, page_url_current,
			user_agent, ip_address
		FROM leads
	`

	var rows *sql.Rows
	var err error
	if before.IsZero() {
		q := qBase + ` ORDER BY created_at DESC LIMIT $1;`
		rows, err = r.db.QueryContext(ctx, q, limit)
	} else {
		q := qBase + ` WHERE created_at < $1 ORDER BY created_at DESC LIMIT $2;`
		rows, err = r.db.QueryContext(ctx, q, before, limit)
	}
	if err != nil {
		return nil, fmt.Errorf("list leads: %w", err)
	}
	defer rows.Close()

	res := make([]lead.Lead, 0, min(limit, 256))
	for rows.Next() {
		var l lead.Lead
		if err := rows.Scan(
			&l.ID,
			&l.CreatedAt,
			&l.IdempotencyKeyHash,
			&l.BusinessName,
			&l.ContactName,
			&l.PhoneWhatsApp,
			&l.City,
			&l.SalonType,
			&l.Consent,
			&l.ChairCount,
			&l.Specialization,
			&l.CurrentBrandsUsed,
			&l.MonthlySpendRange,
			&l.Email,
			&l.Message,
			&l.PageURLInitial,
			&l.PageURLCurrent,
			&l.UserAgent,
			&l.IPAddress,
		); err != nil {
			return nil, fmt.Errorf("scan lead: %w", err)
		}
		res = append(res, l)
	}
	if err := rows.Err(); err != nil {
		return nil, fmt.Errorf("list leads rows: %w", err)
	}

	return res, nil
}

func min(a, b int) int {
	if a < b {
		return a
	}
	return b
}
