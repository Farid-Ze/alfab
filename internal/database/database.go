// Package database provides database connection and utilities.
package database

import (
	"context"
	"database/sql"
	"fmt"
	"time"

	"github.com/jackc/pgx/v5/pgxpool"
	"github.com/jackc/pgx/v5/stdlib"
)

// DB wraps a pgxpool for database operations
type DB struct {
	pool *pgxpool.Pool
}

// Connect establishes a connection to the PostgreSQL database.
func Connect(ctx context.Context, databaseURL string) (*DB, error) {
	if databaseURL == "" {
		return nil, fmt.Errorf("database URL is required")
	}

	config, err := pgxpool.ParseConfig(databaseURL)
	if err != nil {
		return nil, fmt.Errorf("failed to parse database URL: %w", err)
	}

	// Connection pool settings
	config.MaxConns = 25
	config.MinConns = 5
	config.MaxConnLifetime = time.Hour
	config.MaxConnIdleTime = 30 * time.Minute
	config.HealthCheckPeriod = time.Minute

	pool, err := pgxpool.NewWithConfig(ctx, config)
	if err != nil {
		return nil, fmt.Errorf("failed to create connection pool: %w", err)
	}

	// Test connection
	if err := pool.Ping(ctx); err != nil {
		pool.Close()
		return nil, fmt.Errorf("failed to ping database: %w", err)
	}

	return &DB{pool: pool}, nil
}

// Close closes the database connection pool.
func (db *DB) Close() {
	if db.pool != nil {
		db.pool.Close()
	}
}

// Pool returns the underlying pgxpool.Pool.
func (db *DB) Pool() *pgxpool.Pool {
	return db.pool
}

// Ping verifies the database connection.
func (db *DB) Ping(ctx context.Context) error {
	return db.pool.Ping(ctx)
}

// DB returns a stdlib *sql.DB for compatibility with libraries like goose.
func (db *DB) DB() (*sql.DB, error) {
	return stdlib.OpenDBFromPool(db.pool), nil
}

// Exec executes a query that doesn't return rows.
func (db *DB) Exec(ctx context.Context, sql string, args ...interface{}) error {
	_, err := db.pool.Exec(ctx, sql, args...)
	return err
}
