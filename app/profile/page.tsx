"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Profile() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [profile, setProfile] = useState({
    name: "",
    phone: "",
  })

  useEffect(() => {
    if (user) {
      fetchProfile()
    }
  }, [user])

  const fetchProfile = async () => {
    try {
      const { data, error } = await supabase.from("profiles").select("name, phone").eq("id", user?.id).single()

      if (error) throw error

      setProfile({
        name: data.name || "",
        phone: data.phone || "",
      })
    } catch (error) {
      console.error("Error fetching profile:", error)
      toast.error("Failed to fetch profile")
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setProfile((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const { error } = await supabase.from("profiles").upsert({
        id: user?.id,
        name: profile.name,
        phone: profile.phone,
        updated_at: new Date(),
      })

      if (error) throw error

      toast.success("Profile updated successfully!")
    } catch (error) {
      console.error("Error updating profile:", error)
      toast.error("Failed to update profile")
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return <div>Please sign in to view this page.</div>
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-md mx-auto bg-gray-900/50 backdrop-blur-sm rounded-lg p-6 border border-gray-800">
          <h1 className="text-3xl font-bold mb-8 text-center">Profile</h1>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                Email
              </label>
              <Input
                type="email"
                id="email"
                value={user.email}
                disabled
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700 opacity-50"
              />
            </div>
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                Name
              </label>
              <Input
                type="text"
                id="name"
                name="name"
                value={profile.name}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700"
              />
            </div>
            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                Phone
              </label>
              <Input
                type="tel"
                id="phone"
                name="phone"
                value={profile.phone}
                onChange={handleChange}
                className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700"
              />
            </div>
            <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}
