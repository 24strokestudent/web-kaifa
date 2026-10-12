package main

import (
	"encoding/json"
	"errors"
	"log"
	"math"
	"net/http"
	"net/url"
	"strconv"
	"time"
)

func writeJSON(w http.ResponseWriter, status int, value any) {
	w.Header().Set("Content-Type", "application/json; charset=utf-8")
	w.WriteHeader(status)
	if err := json.NewEncoder(w).Encode(value); err != nil {
		log.Printf("encode response: %v", err)
	}
}

func finiteParameter(values url.Values, key string) (float64, error) {
	inputs, ok := values[key]
	if !ok || len(inputs) != 1 || inputs[0] == "" {
		return 0, errors.New("expected one number")
	}
	value, err := strconv.ParseFloat(inputs[0], 64)
	if err != nil || math.IsNaN(value) || math.IsInf(value, 0) {
		return 0, errors.New("expected a finite number")
	}
	return value, nil
}

// NewHandler creates a fresh router; tests do not need to open a listening port.
func NewHandler() http.Handler {
	mux := http.NewServeMux()
	mux.HandleFunc("GET /health", func(w http.ResponseWriter, r *http.Request) {
		writeJSON(w, http.StatusOK, map[string]string{"status": "ok"})
	})
	mux.HandleFunc("GET /add", func(w http.ResponseWriter, r *http.Request) {
		a, errA := finiteParameter(r.URL.Query(), "a")
		b, errB := finiteParameter(r.URL.Query(), "b")
		if errA != nil || errB != nil {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "a and b must each be one finite number"})
			return
		}
		sum := a + b
		if math.IsInf(sum, 0) || math.IsNaN(sum) {
			writeJSON(w, http.StatusBadRequest, map[string]string{"error": "sum must be finite"})
			return
		}
		writeJSON(w, http.StatusOK, map[string]float64{"sum": sum})
	})
	return mux
}

func main() {
	server := &http.Server{
		Addr:              "127.0.0.1:8752",
		Handler:           NewHandler(),
		ReadHeaderTimeout: 5 * time.Second,
	}
	log.Println("HTTP exercise: http://127.0.0.1:8752")
	log.Fatal(server.ListenAndServe())
}
