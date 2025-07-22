"use client"

import { motion } from "framer-motion"
import Image from "next/image"

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
    title: "Environmental Sensor Suite",
    description: "Advanced dust and gas sensor data analysis system",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yOQIibajLaSkGOgOQHceUfJj68heWx.png",
    tags: ["IoT", "Sensors"],
  },
  {
    title: "Team Innovoltz Project",
    description: "Innovative electronics project with custom PCB design",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NT9cdCRoVkz4iz3foDRQ3MrdLdxV9j.png",
    tags: ["Hardware", "PCB"],
  },
  {
    title: "Embedded Systems Development",
    description: "Advanced embedded system with multiple components and sensors",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ayI2ttTFo8anZuE4MXArTrmhrLIJem.png",
    tags: ["Embedded", "IoT"],
  },
  {
    title: "Smart Home Automation",
    description: "Integrated IoT solution for modern living",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Vu0d3CdnIux2FpcuqzxMJ1E2NLHvcp.png",
    tags: ["IoT", "Automation"],
  },
]

export default function Projects() {
  return (
    <section id="projects" className="py-24 px-4 bg-gray-900">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-500">Innovative Projects</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Explore our cutting-edge solutions in electronics, software, and AI
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl overflow-hidden shadow-lg"
            >
              <div className="relative aspect-video">
                <Image src={project.image || "/placeholder.svg"} alt={project.title} fill className="object-cover" />
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
      </div>
    </section>
  )
}
