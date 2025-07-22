"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { submitForm } from "@/lib/database"
import { toast } from "sonner"
import AuthModal from "./auth-modal"
import { supabase } from "@/lib/supabase"

interface PrintFormModalProps {
  isOpen: boolean
  onClose: () => void
}

export default function PrintFormModal({ isOpen, onClose }: PrintFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    projectDescription: "",
    material: "",
    dimensions: "",
    quantity: "",
    preferredTime: "",
  })

  const [loading, setLoading] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
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
            mobile: data.phone || "",
          }))
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }

      fetchProfile()
    }
  }, [user])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      setShowAuthModal(true)
      return
    }

    setLoading(true)
    try {
      await submitForm({
        form_type: "3d_print",
        user_id: user.id,
        name: formData.name,
        email: user.email, // Always use the user's email from auth
        phone: formData.mobile,
        project_description: formData.projectDescription,
        details: {
          material: formData.material,
          dimensions: formData.dimensions,
          quantity: formData.quantity,
          preferredTime: formData.preferredTime,
        },
      })
      toast.success("3D print request submitted successfully!")
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
              <h2 className="text-2xl font-bold">Start Your 3D Print</h2>
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
                <label htmlFor="mobile" className="block text-sm font-medium text-gray-300 mb-1">
                  Mobile Number
                </label>
                <Input
                  type="tel"
                  id="mobile"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                  placeholder="+1 (123) 456-7890"
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
                <label htmlFor="material" className="block text-sm font-medium text-gray-300 mb-1">
                  Preferred Material
                </label>
                <select
                  id="material"
                  name="material"
                  value={formData.material}
                  onChange={handleChange}
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-md text-white"
                >
                  <option value="">Select material</option>
                  <option value="PLA">PLA</option>
                  <option value="PETG">PETG</option>
                  <option value="ABS">ABS</option>
                  <option value="TPU">TPU</option>
                </select>
              </div>
              <div>
                <label htmlFor="dimensions" className="block text-sm font-medium text-gray-300 mb-1">
                  Dimensions (mm)
                </label>
                <Input
                  type="text"
                  id="dimensions"
                  name="dimensions"
                  value={formData.dimensions}
                  onChange={handleChange}
                  placeholder="e.g., 100x100x100"
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                />
              </div>
              <div>
                <label htmlFor="quantity" className="block text-sm font-medium text-gray-300 mb-1">
                  Quantity
                </label>
                <Input
                  type="number"
                  id="quantity"
                  name="quantity"
                  value={formData.quantity}
                  onChange={handleChange}
                  required
                  min="1"
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800"
                />
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
                  required
                  className="w-full px-3 py-2 bg-gray-900/50 border border-gray-800 rounded-md text-white"
                >
                  <option value="">Select preferred time</option>
                  <option value="9-12">9:00 AM - 12:00 PM</option>
                  <option value="13-18">1:00 PM - 6:00 PM</option>
                  <option value="18-21">6:00 PM - 9:00 PM</option>
                </select>
              </div>
              <Button type="submit" className="w-full bg-[#9D7EF0] hover:bg-[#B49AF4] text-white" disabled={loading}>
                {loading ? "Submitting..." : "Submit Request"}
              </Button>
            </form>
          </motion.div>
        </motion.div>
      )}
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </AnimatePresence>
  )
}
