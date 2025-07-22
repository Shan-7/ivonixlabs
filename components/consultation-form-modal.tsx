"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { submitForm } from "@/lib/database"
import { toast } from "sonner"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"

interface ConsultationFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function ConsultationFormModal({ isOpen, onClose }: ConsultationFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    projectDescription: "",
    preferredTime: "",
  })

  const { user } = useAuth()

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase.from("profiles").select("name, phone").eq("id", user.id).single()

          if (error) throw error

          setFormData((prevData) => ({
            ...prevData,
            name: data.name || user.user_metadata.name || "",
            email: user.email || "",
            phone: data.phone || "",
          }))
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }

      fetchProfile()
    }
  }, [user])

  const [loading, setLoading] = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      await submitForm({
        form_type: "consultation",
        user_id: user?.id,
        name: formData.name,
        email: formData.email,
        phone: formData.phone || undefined,
        project_description: formData.projectDescription,
        details: {
          preferredTime: formData.preferredTime || undefined,
        },
      })
      toast.success("Consultation request submitted successfully!")
      onClose()
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit form")
    } finally {
      setLoading(false)
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.95, opacity: 0 }}
            className="bg-black border border-gray-800 rounded-lg p-6 w-full max-w-md relative"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Free Consultation</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-1">
                  Name
                </label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-1">
                  Email
                </label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-300 mb-1">
                  Phone Number
                </label>
                <Input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                  placeholder="+1 (123) 456-7890 (Optional)"
                />
              </div>
              <div>
                <label htmlFor="projectDescription" className="block text-sm font-medium text-gray-300 mb-1">
                  Project Description
                </label>
                <textarea
                  id="projectDescription"
                  name="projectDescription"
                  value={formData.projectDescription}
                  onChange={handleChange}
                  required
                  rows={3}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-md text-white"
                ></textarea>
              </div>
              <div>
                <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300 mb-1">
                  Preferred Time
                </label>
                <select
                  id="preferredTime"
                  name="preferredTime"
                  value={formData.preferredTime}
                  onChange={handleChange}
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-md text-white"
                >
                  <option value="">Select preferred time (Optional)</option>
                  <option value="9-12">9:00 AM - 12:00 PM</option>
                  <option value="13-18">1:00 PM - 6:00 PM</option>
                  <option value="18-21">6:00 PM - 9:00 PM</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-yellow-500 hover:bg-yellow-600 text-black" disabled={loading}>
                {loading ? "Scheduling..." : "Schedule Consultation"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
