package lead

import (
	"errors"
	"fmt"
)

// ErrSpam is returned when spam is detected (e.g., honeypot filled)
var ErrSpam = errors.New("spam detected")

// InvalidError represents a validation error
type InvalidError struct {
	reason string
}

func (e InvalidError) Error() string {
	return e.reason
}

// ErrInvalid creates a new validation error
func ErrInvalid(reason string) error {
	return InvalidError{reason: reason}
}

// ErrInvalidf creates a new formatted validation error
func ErrInvalidf(format string, args ...interface{}) error {
	return InvalidError{reason: fmt.Sprintf(format, args...)}
}

// IsInvalid checks if an error is a validation error
func IsInvalid(err error) bool {
	var invErr InvalidError
	return errors.As(err, &invErr)
}

// ErrNotFound is returned when a lead is not found
var ErrNotFound = errors.New("lead not found")
