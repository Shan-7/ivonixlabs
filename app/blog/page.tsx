"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"
import { ExternalLink } from "lucide-react"

export default function Blog() {
  return (
    <div className="min-h-screen grid-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl text-gray-400 mb-12">
            Stay tuned for exciting content about electronics, robotics, and innovation.
          </p>

          <div className="bg-black/50 border border-gray-800 rounded-lg p-8 backdrop-blur-sm">
            <h2 className="text-3xl font-bold text-yellow-500 mb-4">Coming Soon!</h2>
            <p className="text-gray-300 mb-8">
              We're preparing amazing content for you. Subscribe to our newsletter to be the first to know when we
              launch and receive exclusive updates about our projects.
            </p>

            <a
              href="https://substack.com/@ivonixlabs"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block"
            >
              <Button className="bg-[#FF6719] hover:bg-[#FF8142] text-white gap-2">
                Subscribe to Our Newsletter
                <ExternalLink size={16} />
              </Button>
            </a>
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
