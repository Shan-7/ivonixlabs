"use client"

import { motion } from "framer-motion"
import { Cpu, Globe, CircuitBoardIcon as Circuit, Brain, BotIcon as Robot, Wifi } from "lucide-react"

const services = [
  { icon: Cpu, title: "Embedded Systems" },
  { icon: Globe, title: "Web Development" },
  { icon: Circuit, title: "PCB Design" },
  { icon: Brain, title: "AI/ML Development" },
  { icon: Robot, title: "Robotics" },
  { icon: Wifi, title: "IoT Solutions" },
]

export default function Services() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">
            Comprehensive solutions for all your electronics and software needs
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="flex flex-col items-center text-center"
            >
              <div className="w-16 h-16 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
                <service.icon className="w-8 h-8 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold">{service.title}</h3>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
