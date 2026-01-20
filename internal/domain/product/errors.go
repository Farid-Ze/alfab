package product

import "errors"

// ErrNotFound is returned when a product/brand/category is not found
var ErrNotFound = errors.New("not found")
