package event

import "errors"

// ErrNotFound is returned when an event is not found
var ErrNotFound = errors.New("event not found")
