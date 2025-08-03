"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import ConsultationFormModal from "./consultation-form-modal"

const Hero = () => {
  const [isConsultationModalOpen, setIsConsultationModalOpen] = useState(false)
  const [typewriterText, setTypewriterText] = useState("")
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  const questions = [
    "Want to build an attractive website?",
    "Want to build intelligent hardware?",
    "Need custom electronics solutions?",
    "Looking for AI-powered systems?",
    "Ready to innovate with IoT?",
  ]

  useEffect(() => {
    // Open the consultation form when the component mounts
    setIsConsultationModalOpen(true)
  }, [])

  useEffect(() => {
    const currentQuestion = questions[currentQuestionIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 1000 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && typewriterText === currentQuestion) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && typewriterText === "") {
        setIsDeleting(false)
        setCurrentQuestionIndex((prev) => (prev + 1) % questions.length)
      } else if (!isDeleting) {
        setTypewriterText(currentQuestion.substring(0, typewriterText.length + 1))
      } else {
        setTypewriterText(currentQuestion.substring(0, typewriterText.length - 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [typewriterText, currentQuestionIndex, isDeleting, questions])

  return (
    <section className="min-h-screen flex items-center relative overflow-hidden">
      {/* Soft Animated Background */}
      <div className="absolute inset-0">
        {/* Base gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-black to-slate-800" />

        {/* Soft floating orbs */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.3, 0.6, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-purple-500/8 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            opacity: [0.2, 0.5, 0.2],
          }}
          transition={{
            duration: 10,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/4 w-48 h-48 bg-yellow-500/8 rounded-full blur-2xl"
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.4, 0.7, 0.4],
          }}
          transition={{
            duration: 6,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Subtle grid overlay */}
        <div className="absolute inset-0 bg-grid-white/[0.02]" />

        {/* Gentle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/30" />
      </div>

      <div className="container mx-auto px-4 flex flex-col-reverse md:flex-row items-center relative z-10">
        {/* Left column: Hero content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            ease: "easeOut",
          }}
          className="w-full md:w-1/2 text-left md:pr-8 mt-8 md:mt-0"
        >
          <motion.h1
            className="text-4xl md:text-6xl font-bold mb-6"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <span>Transforming Ideas into </span>
            <span className="text-blue-400 relative">
              Intelligent Solutions
              <motion.div
                className="absolute -inset-1 bg-blue-500/20 rounded-lg blur-sm -z-10"
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{
                  duration: 4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              />
            </span>
          </motion.h1>

          {/* Soft Typewriter Effect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-8 relative"
          >
            <div className="absolute -inset-2 bg-gradient-to-r from-yellow-500/10 to-orange-500/10 rounded-lg blur-lg" />
            <p className="text-2xl md:text-3xl font-semibold text-yellow-400 h-16 flex items-center relative z-10">
              {typewriterText}
              <motion.span
                className="ml-1 text-yellow-300"
                animate={{ opacity: [0, 1, 0] }}
                transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY }}
              >
                |
              </motion.span>
            </p>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-xl text-gray-300 mb-8"
          >
            From Electronics Design to AI-Powered Robotics, We Build the Future
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4"
          >
            <motion.button
              onClick={() => setIsConsultationModalOpen(true)}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 text-black px-8 py-3 rounded-xl font-semibold relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 17 }}
            >
              Start Building
            </motion.button>

            <motion.a
              href="#our-work"
              className="bg-gray-800/60 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-gray-700/60 transition-all text-center border border-gray-600/30"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Our Work
            </motion.a>
          </motion.div>

          <motion.div
            className="flex gap-2 mt-2 justify-center mb-8 md:hidden"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
          >
            <Link
              href="/3d-printing"
              className="bg-gray-800/60 backdrop-blur-sm text-white px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 hover:text-black transition-all text-center border border-gray-600/30"
            >
              3D Print
            </Link>
          </motion.div>
        </motion.div>

        {/* Right column: Video with Soft Effects */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.8,
            delay: 0.3,
            ease: "easeOut",
          }}
          className="w-full md:w-1/2 mt-8 md:mt-0 md:pl-8 relative"
        >
          <motion.div
            className="relative aspect-video rounded-xl overflow-hidden"
            whileHover={{ scale: 1.01 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            {/* Soft Glowing Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500/30 via-purple-500/30 to-yellow-500/30 rounded-xl blur-sm" />

            <div className="relative bg-black rounded-xl overflow-hidden">
              <video
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/finalivonix-vqKfHinupSWxv8jg1i0JGogfTjGHw6.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/10 to-transparent pointer-events-none" />

              {/* Simple Status Indicators */}
              <div className="absolute top-4 right-4 w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <div
                className="absolute bottom-4 left-4 w-1.5 h-1.5 bg-blue-400 rounded-full animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
            </div>
          </motion.div>

          {/* Floating Tech Badges - Simplified */}
          <motion.div
            className="absolute -top-3 -right-3 w-6 h-6 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-md flex items-center justify-center text-black font-bold text-xs"
            animate={{ y: [0, -5, 0] }}
            transition={{
              duration: 3,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          >
            AI
          </motion.div>

          <motion.div
            className="absolute -bottom-3 -left-3 w-6 h-6 bg-gradient-to-r from-blue-400 to-purple-500 rounded-md flex items-center justify-center text-white font-bold text-xs"
            animate={{ y: [0, 5, 0] }}
            transition={{
              duration: 2.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: 1,
            }}
          >
            IoT
          </motion.div>
        </motion.div>
      </div>

      <ConsultationFormModal isOpen={isConsultationModalOpen} onClose={() => setIsConsultationModalOpen(false)} />
    </section>
  )
}

export default Hero
