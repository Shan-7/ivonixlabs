"use client"

import { motion } from "framer-motion"
import { Cpu } from "lucide-react"

export default function KeyFeature() {
  return (
    <section className="py-24 px-4 bg-black">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-gray-900/50 rounded-xl p-8 md:p-12 text-center"
        >
          <Cpu className="w-16 h-16 mx-auto mb-6 text-purple-500" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Custom Hardware Design</h2>
          <p className="text-xl text-gray-400 mb-6 max-w-3xl mx-auto">
            Our in-house hardware design team creates bespoke electronic solutions tailored to your specific needs. From
            PCB design to component selection, we ensure your product is optimized for performance and
            cost-effectiveness.
          </p>
          <ul className="text-left max-w-md mx-auto space-y-2 text-gray-300">
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Customized PCB layouts
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Efficient power management systems
            </li>
            <li className="flex items-center">
              <svg
                className="w-5 h-5 mr-2 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
              Integration of sensors and actuators
            </li>
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
