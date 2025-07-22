"use client"

import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

export default function Store() {
  return (
    <div className="min-h-screen grid-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Ivonix Labs Store</h1>
          <p className="text-xl text-gray-400 mb-12">
            Our online store is under construction. Check back soon for amazing products!
          </p>
          <div className="text-6xl font-bold text-yellow-500">Coming Soon</div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
