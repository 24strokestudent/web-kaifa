package main

import (
	"fmt"
	"os"
	"sort"
	"strings"
)

type Entry struct {
	Word  string
	Count int
}

// Count splits on whitespace and folds case. Punctuation remains part of a word.
func Count(text string) []Entry {
	counts := make(map[string]int)
	for _, word := range strings.Fields(text) {
		counts[strings.ToLower(word)]++
	}
	result := make([]Entry, 0, len(counts))
	for word, count := range counts {
		result = append(result, Entry{Word: word, Count: count})
	}
	sort.Slice(result, func(i, j int) bool {
		if result[i].Count != result[j].Count {
			return result[i].Count > result[j].Count
		}
		return result[i].Word < result[j].Word
	})
	return result
}

func main() {
	text := "Go go WEB"
	if len(os.Args) > 1 {
		text = strings.Join(os.Args[1:], " ")
	}
	for _, item := range Count(text) {
		fmt.Printf("%s:%d\n", item.Word, item.Count)
	}
}
