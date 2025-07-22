"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export default function TestSupabase() {
  const [status, setStatus] = useState<string>("Loading...")

  useEffect(() => {
    async function testConnection() {
      try {
        const { data, error } = await supabase.from("test").select("*")
        if (error) throw error
        setStatus("Supabase connection successful!")
      } catch (error) {
        console.error("Supabase connection error:", error)
        setStatus(`Supabase connection failed: ${error instanceof Error ? error.message : String(error)}`)
      }
    }

    testConnection()
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-4">Supabase Connection Test</h1>
        <p>{status}</p>
      </div>
    </div>
  )
}
