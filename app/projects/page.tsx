"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

const projects = [
  {
    title: "Smart Parking System",
    description: "AI-powered parking management solution with automated entry and space detection",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HIm3cI33hmlzF02WJ5xHaGHd5y30d2.png",
    tags: ["AI", "IoT", "Automation"],
  },
  {
    title: "AI-Powered Intrusion Detection",
    description: "Real-time face recognition for enhanced security",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0wdfRQ77rYKMY8ZuMn30Hdk8dDUJKf.png",
    tags: ["AI", "Security"],
  },
  {
    title: "Multiface Attendance System",
    description: "MTCNN-based technology for efficient attendance tracking",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bhxqt9z4xqWJtLp1awYGYVVVfw5Ogn.png",
    tags: ["AI", "Computer Vision"],
  },
  {
    title: "Insect Detection AI",
    description: "Advanced computer vision system for accurate insect identification and classification",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-9H224zII8cuwXUquuNxAsgLRkkfv2O.png",
    tags: ["AI", "Computer Vision"],
  },
  {
    title: "AI Drive Navigation Bot",
    description: "Autonomous navigation robot with advanced sensing and pathfinding capabilities",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-wTFdKbP3OBLxu73H19PaW4IblrMojT.png",
    tags: ["Robotics", "AI", "Arduino"],
  },
  {
    title: "WalkPi Audio Player",
    description: "Custom PCB audio player with OLED display and LED visualization",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-EHs6epOJKr0f8CkDo6TQrRJoJ2UzWd.png",
    tags: ["Hardware", "IoT"],
  },
  {
    title: "Raspberry Pi Eye",
    description: "Advanced vision system using Raspberry Pi for various applications",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dNeDa1zNAUdoXcvAr1C4JTD0IWuWRX.png",
    tags: ["Raspberry Pi", "IoT"],
  },
  {
    title: "Floor Cleaning Robot",
    description: "Real-time monitoring and management system for parking facilities",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WllYG1tnpguSjQA53NieTPtAaF1fmv.png",
    tags: ["IoT", "Automation"],
  },
  {
    title: "Environmental Sensor Suite",
    description: "Advanced dust and gas sensor data analysis system",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-iBmDXw14fmQpKkVlC963y5os12kMhp.png",
    tags: ["IoT", "Data Analysis"],
  },
  {
    title: "ESP32 IoT Module",
    description: "Custom IoT module with temperature and humidity sensing",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WtJauGrAUjuz8Gt1GtI1YU8LFMaihj.png",
    tags: ["IoT", "ESP32"],
  },
]

export default function Projects() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredProjects = projects.filter(
    (project) =>
      project.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.tags.some((tag) => tag.toLowerCase().includes(searchQuery.toLowerCase())),
  )

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
          <h1 className="text-4xl font-bold mb-6 text-center">Our Projects</h1>
          <p className="text-xl text-gray-400 mb-12 text-center">
            Explore our portfolio of innovative solutions across various industries
          </p>

          <div className="mb-8">
            <div className="relative max-w-2xl mx-auto">
              <input
                type="search"
                placeholder="Search projects..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-3 bg-gray-900/50 border border-gray-800 rounded-lg text-white placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-yellow-500/50"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={`${project.title}-${index}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-black/50 border border-gray-800 rounded-lg overflow-hidden hover:border-gray-700 transition-colors"
              >
                <div className="relative aspect-video">
                  <Image
                    src={project.image || "/placeholder.svg"}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
                  <p className="text-gray-400 mb-4">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-300 border border-yellow-500/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
