"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"
import AnimatedBackground from "@/components/animated-background"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"

export default function Settings() {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setPasswords((prev) => ({ ...prev, [name]: value }))
  }

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    if (passwords.newPassword !== passwords.confirmNewPassword) {
      toast.error("New passwords don't match")
      setLoading(false)
      return
    }

    try {
      const { error } = await supabase.auth.updateUser({
        password: passwords.newPassword,
      })

      if (error) throw error

      toast.success("Password updated successfully")
      setPasswords({
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
      })
    } catch (error) {
      console.error("Error updating password:", error)
      toast.error("Failed to update password")
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
          <h1 className="text-3xl font-bold mb-8 text-center">Settings</h1>
          <div className="space-y-8">
            <div>
              <h2 className="text-xl font-semibold mb-4">Change Password</h2>
              <form onSubmit={handlePasswordChange} className="space-y-4">
                <div>
                  <label htmlFor="currentPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Current Password
                  </label>
                  <Input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    value={passwords.currentPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="newPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    New Password
                  </label>
                  <Input
                    type="password"
                    id="newPassword"
                    name="newPassword"
                    value={passwords.newPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700"
                  />
                </div>
                <div>
                  <label htmlFor="confirmNewPassword" className="block text-sm font-medium text-gray-300 mb-1">
                    Confirm New Password
                  </label>
                  <Input
                    type="password"
                    id="confirmNewPassword"
                    name="confirmNewPassword"
                    value={passwords.confirmNewPassword}
                    onChange={handleChange}
                    required
                    className="w-full px-3 py-2 bg-gray-800/50 border border-gray-700"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                  disabled={loading}
                >
                  {loading ? "Updating..." : "Update Password"}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
