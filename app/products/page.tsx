"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"

const products = [
  {
    id: 1,
    name: "Ivonix Development Board",
    description: "High-performance microcontroller board with built-in voltage regulation and multiple I/O options.",
    price: 49.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Development Boards",
  },
  {
    id: 2,
    name: "Wireless Sensor Module",
    description: "Low-power wireless sensor module with integrated temperature, humidity, and pressure sensors.",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Sensors",
  },
  {
    id: 3,
    name: "IoT Gateway Hub",
    description: "Industrial-grade IoT gateway with multiple communication protocols and cloud connectivity.",
    price: 149.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "IoT",
  },
  {
    id: 4,
    name: "Power Management Module",
    description: "Advanced power management solution for battery-powered devices with multiple voltage outputs.",
    price: 39.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Power",
  },
  {
    id: 5,
    name: "Display Module Kit",
    description: "High-resolution display module with touch interface and protective case.",
    price: 79.99,
    image: "/placeholder.svg?height=300&width=300",
    category: "Display",
  },
]

export default function Products() {
  const [filteredProducts, setFilteredProducts] = useState(products)

  const handleSearch = (query: string) => {
    const filtered = products.filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase()) ||
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.category.toLowerCase().includes(query.toLowerCase()),
    )
    setFilteredProducts(filtered)
  }

  return (
    <div className="min-h-screen grid-background">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-6xl mx-auto text-center"
        >
          <h1 className="text-4xl font-bold mb-6">Our Products</h1>
          <p className="text-xl text-gray-400 mb-12">Exciting innovations coming your way. Stay tuned!</p>
          <div className="text-6xl font-bold text-yellow-500">Coming Soon</div>
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
