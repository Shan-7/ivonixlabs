"use client"

import { motion } from "framer-motion"
import Image from "next/image"

const testimonials = [
  {
    name: "Manoranjan Mishra",
    role: "Alumni IIT Bombay",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Ivonix Labs demonstrated exceptional expertise in circuit design. Their attention to detail and innovative approach to PCB design and component selection was impressive. The final product exceeded our expectations.",
  },
  {
    name: "Sumedh Gajghate",
    role: "President Udaan Club",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "Working with Ivonix Labs on drone and aeroplane projects was a fantastic experience. Their technical knowledge and practical implementation skills in aeronautics and control systems are outstanding.",
  },
  {
    name: "Tushar",
    role: "Full Stack Developer",
    image: "/placeholder.svg?height=80&width=80",
    quote:
      "The web development experience with Ivonix Labs was seamless. Their modern approach to development and ability to create intuitive user interfaces while maintaining robust backend systems is commendable.",
  },
]

export default function Testimonials() {
  return (
    <section className="py-24 px-4 overflow-hidden">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            What Our <span className="text-yellow-500">Clients Say</span>
          </h2>
          <p className="text-gray-400 max-w-3xl mx-auto text-lg">Hear from the professionals who trust Ivonix Labs</p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-gray-900/50 backdrop-blur-sm rounded-xl p-6 border border-gray-800"
            >
              <div className="flex items-center gap-4 mb-4">
                <Image
                  src={testimonial.image || "/placeholder.svg"}
                  alt={testimonial.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
                <div>
                  <h3 className="font-semibold text-lg">{testimonial.name}</h3>
                  <p className="text-sm text-gray-400">{testimonial.role}</p>
                </div>
              </div>
              <blockquote className="text-gray-300 font-mono text-base leading-relaxed">
                "{testimonial.quote}"
              </blockquote>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
