-- +goose Up
-- +goose StatementBegin
CREATE TABLE IF NOT EXISTS leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
    
    -- Required fields (Paket A spec)
    business_name VARCHAR(255) NOT NULL,
    contact_name VARCHAR(255) NOT NULL,
    phone_whatsapp VARCHAR(50) NOT NULL,
    city VARCHAR(100) NOT NULL,
    salon_type VARCHAR(50) NOT NULL,
    consent BOOLEAN NOT NULL DEFAULT FALSE,
    
    -- Optional fields (progressive profiling)
    chair_count INTEGER,
    specialization VARCHAR(255),
    current_brands_used TEXT,
    monthly_spend_range VARCHAR(50),
    
    -- Tracking metadata
    source VARCHAR(100),
    page_url_initial TEXT,
    page_url_current TEXT,
    user_agent TEXT,
    ip_address VARCHAR(45)
);

-- Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_city ON leads(city);
CREATE INDEX IF NOT EXISTS idx_leads_salon_type ON leads(salon_type);
-- +goose StatementEnd

-- +goose Down
-- +goose StatementBegin
DROP TABLE IF EXISTS leads;
-- +goose StatementEnd
