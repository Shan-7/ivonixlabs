"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ConsultationFormModal from "./consultation-form-modal"

const Hero = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)

  useEffect(() => {
    // Open the consultation form when the component mounts
    setIsConsultationModalOpen(true)
  }, [])

  return (
    <section className="min-h-screen flex items-center bg-black text-white relative overflow-hidden bg-black">
      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center relative z-10">
        {/* Left column: Hero content */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 text-left md:pr-8 mt-8 md:mt-0"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-6">
            Transforming Ideas into <span className="text-blue-500">Intelligent Solutions</span>
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl text-gray-400 mb-8"
          >
            From Electronics Design to AI-Powered Robotics, We Build the Future
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <button
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-yellow-500 text-black px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors"
            >
              Start Building
            </button>
            <a
              href="#our-work"
              className="bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700 transition-colors text-center"
            >
              Our Work
            </a>
          </motion.div>

          <div className="flex gap-2 mt-2 justify-center mb-8 md:hidden">
            <Link
              href="/3d-printing"
              className="bg-gray-800 text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 transition-colors text-center"
            >
              3D Print
            </Link>
          </div>
        </motion.div>

        {/* Right column: Video */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8"
        >
          <div className="relative aspect-video rounded-xl overflow-hidden">
            <video
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finalivonix-vqKfHinupSWxv8jg1i0JGogfTjGHw6.mp4"
              autoPlay
              loop
              muted
              playsInline
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/20 to-transparent pointer-events-none" />
          </div>
        </motion.div>
      </div>

      <ConsultationFormModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
    </section>
  )
}

export default Hero
