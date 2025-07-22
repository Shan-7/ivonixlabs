"use client"

import { motion } from "framer-motion"
import { Box, Layers, Zap } from "lucide-react"

const features = [
  {
    icon: Box,
    title: "Complete Package",
    description:
      "Your project includes a complete electronics solution, custom firmware, and user-friendly interfaces. Everything is engineered for reliability and performance.",
  },
  {
    icon: Zap,
    title: "Seamless Integrations",
    description:
      "We handle all necessary integrations including communication protocols, sensor interfaces, and control systems to ensure your hardware works flawlessly.",
  },
  {
    icon: Layers,
    title: "Modern, Scalable Tech",
    description:
      "We use the latest technologies combined with proven engineering practices to ensure your product is robust, efficient, and built to scale.",
  },
]

export default function Features() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-center mb-4"
        >
          From Concept to Launch in <span className="gradient-text">Weeks</span>, Not Months
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-gray-400 text-center max-w-3xl mx-auto mb-16 text-lg"
        >
          Ignite your project with our rapid development process. We turn your vision into market-ready products in just
          4-5 weeks, giving you the edge in today&apos;s fast-paced tech landscape.
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 px-4 md:px-0">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center p-6 bg-gray-800/50 rounded-xl"
            >
              <div className="flex justify-center mb-6">
                <feature.icon className="w-12 h-12 text-yellow-500" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{feature.title}</h3>
              <p className="text-gray-400 leading-relaxed text-sm md:text-base">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
