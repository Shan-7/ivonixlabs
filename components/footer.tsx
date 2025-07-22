"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Zap, Twitter, Youtube, Instagram, MessageSquare, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { toast } from "sonner"

export default function Footer() {
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      window.location.href = `https://substack.com/@ivonixlabs?email=${encodeURIComponent(email)}`
    } catch (error) {
      toast.error("Failed to subscribe. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <footer className="bg-[#0a0f1a] text-white py-16">
      <div className="container mx-auto px-8 md:px-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Company Info */}
          <div>
            <Link href="/" className="flex items-center space-x-2 mb-4">
              <Zap className="w-6 h-6 text-yellow-500" />
              <span className="text-xl font-semibold">Ivonix Labs</span>
            </Link>
            <p className="text-base md:text-lg text-gray-400 mb-2">
              Innovating at the intersection of hardware and software.
            </p>
            <p className="text-base md:text-lg text-gray-400">Contact: +91 93705 66844</p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6">Quick Links</h3>
            <nav className="grid gap-4">
              <Link href="/about" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                About
              </Link>
              <Link href="/projects" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Projects
              </Link>
              <Link
                href="/3d-printing"
                className="text-base md:text-lg text-gray-400 hover:text-white transition-colors"
              >
                3D Printing
              </Link>
              <Link href="/products" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Products
              </Link>
              <Link href="/store" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Store
              </Link>
            </nav>
          </div>

          {/* Newsletter Section */}
          <div>
            <h3 className="text-lg md:text-xl font-semibold mb-6">Stay Updated</h3>
            <form onSubmit={handleSubscribe} className="space-y-4">
              <div className="relative">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-4 pr-32 h-12 bg-gray-900/50 border border-gray-700 rounded-l-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
                <Button
                  type="submit"
                  disabled={loading}
                  className="absolute right-0 inset-y-0 bg-yellow-500 hover:bg-yellow-600 text-black px-6 text-sm font-medium rounded-r-lg transition-colors"
                >
                  {loading ? "Subscribing..." : "Subscribe"}
                </Button>
              </div>
              <p className="text-sm text-gray-400">Join our newsletter for updates and insights</p>
            </form>
          </div>
        </div>

        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a
            href="https://twitter.com/ivonixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Twitter className="w-7 h-7" />
            <span className="sr-only">Twitter</span>
          </a>
          <a
            href="https://youtube.com/@ivonixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Youtube className="w-7 h-7" />
            <span className="sr-only">YouTube</span>
          </a>
          <a
            href="https://instagram.com/ivonixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Instagram className="w-7 h-7" />
            <span className="sr-only">Instagram</span>
          </a>
          <a
            href="https://reddit.com/r/ivonixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <MessageSquare className="w-7 h-7" />
            <span className="sr-only">Reddit</span>
          </a>
          <a
            href="https://linkedin.com/company/ivonixlabs"
            target="_blank"
            rel="noopener noreferrer"
            className="text-gray-400 hover:text-white transition-colors"
          >
            <Linkedin className="w-7 h-7" />
            <span className="sr-only">LinkedIn</span>
          </a>
        </div>

        {/* Copyright and Terms */}
        <div className="pt-8 border-t border-gray-800">
          <div className="text-center">
            <p className="text-base md:text-lg text-gray-400">
              &copy; {new Date().getFullYear()} Ivonix Labs. All rights reserved.
            </p>
            <div className="flex justify-center space-x-4 mt-4">
              <Link href="/terms" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link href="/cookies" className="text-base md:text-lg text-gray-400 hover:text-white transition-colors">
                Cookie Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
