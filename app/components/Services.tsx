"use client"

import { motion } from "framer-motion"
import { FiCpu, FiCode, FiDatabase } from "react-icons/fi"

const services = [
  {
    icon: <FiCpu size={40} />,
    title: "Hardware Solutions",
    description: "Cutting-edge electronic components and systems for your projects.",
  },
  {
    icon: <FiCode size={40} />,
    title: "Software Development",
    description: "Custom software solutions to power your hardware innovations.",
  },
  {
    icon: <FiDatabase size={40} />,
    title: "IoT Integration",
    description: "Seamlessly connect your devices to the Internet of Things.",
  },
]

const Services = () => {
  return (
    <section id="services" className="py-20 bg-gray-100">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 text-purple-900">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="bg-white p-6 rounded-lg shadow-lg"
            >
              <div className="text-purple-700 mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Services
