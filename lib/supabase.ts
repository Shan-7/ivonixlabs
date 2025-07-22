import { createClient } from "@supabase/supabase-js"

const supabaseUrl = "https://xhbsxvuuxrofxvdnckrd.supabase.co"
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhoYnN4dnV1eHJvZnh2ZG5ja3JkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY3MzMwODYsImV4cCI6MjA1MjMwOTA4Nn0.oLqHUanz4DwKEkSQUDDT26w2twwRWd8wUJFD6dA7fxI"

if (!supabaseUrl || !supabaseAnonKey) {
  console.error("Supabase URL or Anon Key is missing")
}

console.log("Supabase URL:", supabaseUrl)
console.log("Supabase Anon Key:", supabaseAnonKey ? "Set" : "Not set")

export const supabase = createClient(supabaseUrl, supabaseAnonKey)
