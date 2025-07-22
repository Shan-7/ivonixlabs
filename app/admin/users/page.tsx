"use client"

import { useState, useEffect } from "react"
import { useAuth } from "@/contexts/auth-context"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

interface UserProfile {
  id: string
  email: string
  created_at: string
  last_sign_in_at: string | null
}

export default function UserProfiles() {
  const [userProfiles, setUserProfiles] = useState<UserProfile[]>([])
  const { fetchUserProfiles } = useAuth()

  useEffect(() => {
    const loadUserProfiles = async () => {
      const profiles = await fetchUserProfiles()
      setUserProfiles(profiles)
    }
    loadUserProfiles()
  }, [fetchUserProfiles])

  return (
    <div className="min-h-screen grid-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-center">User Profiles</h1>
          <div className="bg-black/50 border border-gray-800 rounded-lg p-6 backdrop-blur-sm">
            <table className="w-full">
              <thead>
                <tr>
                  <th className="text-left p-2">Email</th>
                  <th className="text-left p-2">Created At</th>
                  <th className="text-left p-2">Last Sign In</th>
                </tr>
              </thead>
              <tbody>
                {userProfiles.map((profile) => (
                  <tr key={profile.id} className="border-t border-gray-800">
                    <td className="p-2">{profile.email}</td>
                    <td className="p-2">{new Date(profile.created_at).toLocaleString()}</td>
                    <td className="p-2">
                      {profile.last_sign_in_at ? new Date(profile.last_sign_in_at).toLocaleString() : "Never signed in"}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
