"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const projects = [
  {
    title: "AltInvest Platform",
    description: "Decentralized investment platform with multi-chain operability",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1vpHZj6RUc2v5pSYdjVbzKZ0NKwlB2.png",
  },
  {
    title: "AI-Powered Intrusion Detection",
    description: "Real-time face recognition for enhanced security",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-0wdfRQ77rYKMY8ZuMn30Hdk8dDUJKf.png",
  },
  {
    title: "Multiface Attendance System",
    description: "MTCNN-based technology for efficient attendance tracking",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bhxqt9z4xqWJtLp1awYGYVVVfw5Ogn.png",
  },
  {
    title: "WalkPi Audio Player",
    description: "Custom PCB audio player with OLED display and LED visualization",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-20iEiJyaNomKINo93Ni8Cy8SrYBKsK.png",
  },
  {
    title: "Insect Detection AI",
    description: "Computer vision system for accurate insect identification",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-E3PDtIyr5IJ4b7DVSHe54C08g79uS4.png",
  },
  {
    title: "Raspberry Pi Eye",
    description: "Advanced vision system using Raspberry Pi for various applications",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dNeDa1zNAUdoXcvAr1C4JTD0IWuWRX.png",
  },
  {
    title: "Pokemon Pokeball",
    description: "High-quality 3D printed Pokeball with smooth finish and precise details",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Vu0d3CdnIux2FpcuqzxMJ1E2NLHvcp.png",
  },
  {
    title: "Geometric Pikachu Wall Art",
    description: "Modern geometric interpretation of Pikachu in sleek black",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QK2wRXcb0mREaB1V6wEkmf7QKf9se3.png",
  },
  {
    title: "Novelty Glasses Stand",
    description: "Fun and practical glasses holder with mustache design",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-paMPiZczZEpau8TjSTdg31zHVtieRZ.png",
  },
]

export default function OurWork() {
  return (
    <section id="our-work" className="py-24 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="text-yellow-500">Innovative Work</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Explore some of our recent projects that showcase our expertise in electronics, software engineering, AI,
            and 3D printing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-4 md:px-0">
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900 rounded-lg overflow-hidden border border-gray-800 shadow-lg"
            >
              <div className="relative aspect-[16/9] mb-4 overflow-hidden">
                <Image
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{project.title}</h3>
                <p className="text-sm text-gray-400">{project.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
