// Package postgres provides PostgreSQL implementations of repositories.
package postgres

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/google/uuid"
	"github.com/jackc/pgx/v5"
	"github.com/jackc/pgx/v5/pgxpool"

	"example.com/alfabeauty-b2b/internal/domain/lead"
)

// LeadRepository is a PostgreSQL implementation of lead repository
type LeadRepository struct {
	pool *pgxpool.Pool
}

// NewLeadRepository creates a new PostgreSQL lead repository
func NewLeadRepository(pool *pgxpool.Pool) *LeadRepository {
	return &LeadRepository{pool: pool}
}

// Create stores a new lead in the database
func (r *LeadRepository) Create(ctx context.Context, l lead.Lead) (lead.Lead, error) {
	l.Normalize()
	l.ID = uuid.New()
	l.CreatedAt = time.Now().UTC()

	query := `
		INSERT INTO leads (
			id, created_at, business_name, contact_name, phone_whatsapp, 
			city, salon_type, consent, chair_count, specialization,
			current_brands_used, monthly_spend_range, source,
			page_url_initial, page_url_current, user_agent, ip_address
		) VALUES (
			$1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17
		)
	`

	_, err := r.pool.Exec(ctx, query,
		l.ID, l.CreatedAt, l.BusinessName, l.ContactName, l.PhoneWhatsApp,
		l.City, l.SalonType, l.Consent, l.ChairCount, l.Specialization,
		l.CurrentBrandsUsed, l.MonthlySpendRange, l.Source,
		l.PageURLInitial, l.PageURLCurrent, l.UserAgent, l.IPAddress,
	)
	if err != nil {
		return lead.Lead{}, fmt.Errorf("failed to insert lead: %w", err)
	}

	return l, nil
}

// GetByID retrieves a lead by ID
func (r *LeadRepository) GetByID(ctx context.Context, id uuid.UUID) (lead.Lead, error) {
	query := `
		SELECT id, created_at, business_name, contact_name, phone_whatsapp,
			city, salon_type, consent, chair_count, specialization,
			current_brands_used, monthly_spend_range, source,
			page_url_initial, page_url_current, user_agent, ip_address
		FROM leads WHERE id = $1
	`

	var l lead.Lead
	err := r.pool.QueryRow(ctx, query, id).Scan(
		&l.ID, &l.CreatedAt, &l.BusinessName, &l.ContactName, &l.PhoneWhatsApp,
		&l.City, &l.SalonType, &l.Consent, &l.ChairCount, &l.Specialization,
		&l.CurrentBrandsUsed, &l.MonthlySpendRange, &l.Source,
		&l.PageURLInitial, &l.PageURLCurrent, &l.UserAgent, &l.IPAddress,
	)
	if err != nil {
		if errors.Is(err, pgx.ErrNoRows) {
			return lead.Lead{}, lead.ErrNotFound
		}
		return lead.Lead{}, fmt.Errorf("failed to get lead: %w", err)
	}

	return l, nil
}

// List returns leads with pagination
func (r *LeadRepository) List(ctx context.Context, limit, offset int) ([]lead.Lead, int, error) {
	// Get total count
	var total int
	err := r.pool.QueryRow(ctx, "SELECT COUNT(*) FROM leads").Scan(&total)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to count leads: %w", err)
	}

	// Get leads
	query := `
		SELECT id, created_at, business_name, contact_name, phone_whatsapp,
			city, salon_type, consent, chair_count, specialization,
			current_brands_used, monthly_spend_range, source,
			page_url_initial, page_url_current, user_agent, ip_address
		FROM leads
		ORDER BY created_at DESC
		LIMIT $1 OFFSET $2
	`

	rows, err := r.pool.Query(ctx, query, limit, offset)
	if err != nil {
		return nil, 0, fmt.Errorf("failed to query leads: %w", err)
	}
	defer rows.Close()

	var leads []lead.Lead
	for rows.Next() {
		var l lead.Lead
		err := rows.Scan(
			&l.ID, &l.CreatedAt, &l.BusinessName, &l.ContactName, &l.PhoneWhatsApp,
			&l.City, &l.SalonType, &l.Consent, &l.ChairCount, &l.Specialization,
			&l.CurrentBrandsUsed, &l.MonthlySpendRange, &l.Source,
			&l.PageURLInitial, &l.PageURLCurrent, &l.UserAgent, &l.IPAddress,
		)
		if err != nil {
			return nil, 0, fmt.Errorf("failed to scan lead: %w", err)
		}
		leads = append(leads, l)
	}

	if err := rows.Err(); err != nil {
		return nil, 0, fmt.Errorf("error iterating leads: %w", err)
	}

	return leads, total, nil
}
