"use client"
import { useState } from "react"
import type React from "react"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Mail } from "lucide-react"
import { toast } from "sonner"
export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      // Redirect to Substack subscription page with pre-filled email
      window.location.href = `https://substack.com/@ivonixlabs?email=${encodeURIComponent(email)}`
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }
  return (
    <section className="py-24 px-4 bg-black/50">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-lg md:text-xl text-gray-400">
            Get the latest updates on electronics, robotics, and innovation
          </p>
        </motion.div>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full pl-10 py-3 text-base bg-black/50 border-gray-800 rounded-lg"
            />
          </div>
          <Button
            type="submit"
            className="bg-yellow-500 hover:bg-yellow-600 text-black px-8 py-3 text-base font-semibold rounded-lg w-full sm:w-auto"
            disabled={loading}
          >
            {loading ? "Subscribing..." : "Subscribe"}
          </Button>
        </form>
      </div>
    </section>
  )
}
