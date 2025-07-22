"use client"

import { motion } from "framer-motion"

const About = () => {
  return (
    <section id="about" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="md:w-1/2 mb-8 md:mb-0"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-purple-900">Our Mission</h2>
            <p className="text-gray-700 text-lg">
              At Bricklabs, we're committed to pushing the boundaries of technology. Our mission is to create innovative
              solutions that bridge the gap between hardware and software, empowering businesses and individuals to
              build the future.
            </p>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="md:w-1/2"
          >
            <img src="/placeholder.svg?height=400&width=600" alt="Bricklabs Team" className="rounded-lg shadow-lg" />
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
