package lead

import "errors"

var ErrSpam = errors.New("spam")

type InvalidError struct{ msg string }

func (e InvalidError) Error() string { return e.msg }

func ErrInvalid(msg string) error { return InvalidError{msg: msg} }

func IsInvalid(err error) bool {
	_, ok := err.(InvalidError)
	return ok
}
