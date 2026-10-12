package main

import (
	"reflect"
	"testing"
)

func TestCount(t *testing.T) {
	cases := []struct {
		name string
		text string
		want []Entry
	}{
		{"empty", " \t\n", []Entry{}},
		{"case and count", "Go go WEB", []Entry{{"go", 2}, {"web", 1}}},
		{"deterministic ties", "b a", []Entry{{"a", 1}, {"b", 1}}},
		{"whitespace unicode", "中文\tGo\n中文", []Entry{{"中文", 2}, {"go", 1}}},
		{"punctuation retained", "Go, go", []Entry{{"go", 1}, {"go,", 1}}},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			if got := Count(tc.text); !reflect.DeepEqual(got, tc.want) {
				t.Errorf("Count(%q) = %#v, want %#v", tc.text, got, tc.want)
			}
		})
	}
}
