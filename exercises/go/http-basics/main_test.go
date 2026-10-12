package main

import (
	"encoding/json"
	"net/http"
	"net/http/httptest"
	"strings"
	"testing"
	"time"
)

func TestHandler(t *testing.T) {
	cases := []struct {
		name   string
		method string
		path   string
		status int
		sum    float64
	}{
		{"health", "GET", "/health", 200, 0},
		{"addition", "GET", "/add?a=2&b=3", 200, 5},
		{"negative fraction", "GET", "/add?a=-1.5&b=2", 200, 0.5},
		{"zero", "GET", "/add?a=0&b=0", 200, 0},
		{"missing", "GET", "/add?a=2", 400, 0},
		{"invalid", "GET", "/add?a=x&b=3", 400, 0},
		{"nan", "GET", "/add?a=NaN&b=3", 400, 0},
		{"infinity", "GET", "/add?a=Inf&b=3", 400, 0},
		{"duplicate", "GET", "/add?a=2&a=3&b=4", 400, 0},
		{"overflow", "GET", "/add?a=1e308&b=1e308", 400, 0},
		{"method", "POST", "/add", 405, 0},
	}
	for _, tc := range cases {
		t.Run(tc.name, func(t *testing.T) {
			recorder := httptest.NewRecorder()
			NewHandler().ServeHTTP(recorder, httptest.NewRequest(tc.method, tc.path, nil))
			if recorder.Code != tc.status {
				t.Fatalf("status = %d, want %d; body=%s", recorder.Code, tc.status, recorder.Body.String())
			}
			if tc.status == http.StatusMethodNotAllowed {
				if !strings.Contains(recorder.Header().Get("Allow"), "GET") {
					t.Error("missing GET in Allow header")
				}
				return // ServeMux has a documented plain text default for 405.
			}
			if !strings.HasPrefix(recorder.Header().Get("Content-Type"), "application/json") {
				t.Error("expected JSON Content-Type")
			}
			var body map[string]json.RawMessage
			if err := json.Unmarshal(recorder.Body.Bytes(), &body); err != nil {
				t.Fatalf("invalid JSON: %v", err)
			}
			if tc.path == "/health" {
				var status string
				if err := json.Unmarshal(body["status"], &status); err != nil || status != "ok" {
					t.Errorf("health = %s, want ok", body["status"])
				}
			} else if tc.status == http.StatusOK {
				var sum float64
				if err := json.Unmarshal(body["sum"], &sum); err != nil || sum != tc.sum {
					t.Errorf("sum = %s, want %v", body["sum"], tc.sum)
				}
			} else if len(body["error"]) == 0 {
				t.Error("missing stable error field")
			}
		})
	}
}

// This round trip uses a temporary local port and closes the server automatically.
func TestHTTPRoundTrip(t *testing.T) {
	server := httptest.NewServer(NewHandler())
	defer server.Close()
	client := server.Client()
	client.Timeout = 2 * time.Second
	for _, tc := range []struct {
		path string
		want string
	}{
		{"/health", `{"status":"ok"}`},
		{"/add?a=2&b=3", `{"sum":5}`},
	} {
		t.Run(tc.path, func(t *testing.T) {
			response, err := client.Get(server.URL + tc.path)
			if err != nil {
				t.Fatal(err)
			}
			defer response.Body.Close()
			if response.StatusCode != http.StatusOK {
				t.Fatalf("status = %d, want 200", response.StatusCode)
			}
			var body json.RawMessage
			if err := json.NewDecoder(response.Body).Decode(&body); err != nil {
				t.Fatal(err)
			}
			if string(body) != tc.want {
				t.Errorf("response = %s, want %s", body, tc.want)
			}
		})
	}
}
