"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { DrillIcon as Drone, Package, Wrench } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { submitForm } from "@/lib/database"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

const droneModels = [
  {
    name: "DJI Mavic 3 Pro",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-VE8UtpwKFP5cw7j4VVueT9SSuicWGB.png",
    description: "Professional cinematography drone with dual camera system",
    specs: ["Hasselblad Camera", "4/3 CMOS Sensor", "Up to 46 minutes flight time"],
  },
  {
    name: "DJI Air 2S",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-UX0TPzQdlnVq44nsINgAV2vNX6PjQj.png",
    description: "Compact drone with 1-inch sensor camera",
    specs: ["1-inch Sensor", "5.4K Video", "Up to 31 minutes flight time"],
  },
  {
    name: "Custom FPV Racing Drone",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xR52GjoVwHZq5xthbmBb5HZvRWik2J.png",
    description: "High-performance racing drone with carbon fiber frame",
    specs: ["Digital FPV System", "Carbon Fiber Frame", "Custom Build"],
  },
  {
    name: "Custom Long Range Drone",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-tYtPIdAqRDARea8T5odpMVupEfe771.png",
    description: "Custom-built drone for extended flight missions",
    specs: ["Long Range System", "LED Navigation", "Extended Flight Time"],
  },
]

export default function Drones() {
  const [activeSection, setActiveSection] = useState<"build" | "rental" | "repair" | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
    droneType: "",
    preferredTime: "",
  })
  const [loading, setLoading] = useState(false)
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await submitForm({
        form_type: "drone",
        user_id: user?.id,
        name: formData.name,
        email: user?.email || "",
        phone: formData.phone,
        project_description: formData.message,
        details: {
          droneType: formData.droneType,
          preferredTime: formData.preferredTime,
        },
      })
      toast.success("Drone request submitted successfully!")
      setActiveSection(null)
      setFormData({
        name: "",
        email: "",
        phone: "",
        message: "",
        droneType: "",
        preferredTime: "",
      })
    } catch (error) {
      console.error("Form submission error:", error)
      toast.error(error instanceof Error ? error.message : "Failed to submit form")
    } finally {
      setLoading(false)
    }
  }

  const renderForm = () => {
    if (!activeSection) return null

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mt-8 p-6 bg-black/50 border border-gray-800 rounded-lg backdrop-blur-sm"
      >
        <h3 className="text-2xl font-bold mb-4">
          {activeSection === "build"
            ? "Custom Drone Build Request"
            : activeSection === "rental"
              ? "Drone Rental Inquiry"
              : "Drone Repair Request"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-300">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
                required
              />
            </div>
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-300">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
              required
            />
          </div>
          <div>
            <label htmlFor="message" className="block text-sm font-medium text-gray-300">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={4}
              value={formData.message}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
              required
            ></textarea>
          </div>
          <div>
            <label htmlFor="droneType" className="block text-sm font-medium text-gray-300">
              Drone Type
            </label>
            <select
              id="droneType"
              name="droneType"
              value={formData.droneType}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Select drone type</option>
              <option value="custom">Custom Build</option>
              <option value="rental">Rental</option>
              <option value="repair">Repair</option>
            </select>
          </div>
          <div>
            <label htmlFor="preferredTime" className="block text-sm font-medium text-gray-300">
              Preferred Time
            </label>
            <select
              id="preferredTime"
              name="preferredTime"
              value={formData.preferredTime}
              onChange={handleChange}
              className="mt-1 block w-full rounded-md bg-gray-900/50 border-gray-800 text-white focus:ring-yellow-500 focus:border-yellow-500"
              required
            >
              <option value="">Select preferred time</option>
              <option value="9-12">9:00 AM - 12:00 PM</option>
              <option value="13-18">1:00 PM - 6:00 PM</option>
              <option value="18-21">6:00 PM - 9:00 PM</option>
            </select>
          </div>
          <Button type="submit" className="w-full md:w-auto" disabled={loading}>
            {loading ? "Submitting..." : "Submit Request"}
          </Button>
        </form>
      </motion.div>
    )
  }

  return (
    <div className="min-h-screen grid-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-center">Drone Services</h1>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Explore our custom drone solutions, rental options, and repair services
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm"
            >
              <Drone className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Custom Drone Build</h2>
              <p className="text-gray-400 mb-4">
                Get a custom-built drone tailored to your specific needs and requirements.
              </p>
              <Button onClick={() => setActiveSection("build")} className="w-full">
                Request Build
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm"
            >
              <Package className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Drone Rental</h2>
              <p className="text-gray-400 mb-4">
                Rent high-quality drones for your projects, events, or recreational use.
              </p>
              <Button onClick={() => setActiveSection("rental")} className="w-full">
                Rent a Drone
              </Button>
            </motion.div>
            <motion.div
              whileHover={{ scale: 1.02 }}
              className="bg-black/50 border border-gray-800 p-6 rounded-lg backdrop-blur-sm"
            >
              <Wrench className="w-12 h-12 text-yellow-500 mb-4" />
              <h2 className="text-2xl font-bold mb-4">Drone Repair</h2>
              <p className="text-gray-400 mb-4">
                Professional repair services to get your drone back in the air quickly and safely.
              </p>
              <Button onClick={() => setActiveSection("repair")} className="w-full">
                Request Repair
              </Button>
            </motion.div>
          </div>

          {renderForm()}

          <div className="mt-16">
            <h2 className="text-3xl font-bold mb-8 text-center">Available Drone Models</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
              {droneModels.map((drone, index) => (
                <motion.div
                  key={drone.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden backdrop-blur-sm"
                >
                  <div className="relative aspect-video">
                    <Image src={drone.image || "/placeholder.svg"} alt={drone.name} fill className="object-cover" />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-semibold mb-2">{drone.name}</h3>
                    <p className="text-gray-400 mb-4">{drone.description}</p>
                    <ul className="space-y-2">
                      {drone.specs.map((spec, index) => (
                        <li key={index} className="flex items-center text-sm text-gray-300">
                          <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full mr-2"></span>
                          {spec}
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
