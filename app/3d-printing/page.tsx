"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search, Upload, Calculator, Eye, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import ProjectFormModal from "@/components/project-form-modal"
import STLViewer from "@/components/stl-viewer"
import QuoteCalculator from "@/components/quote-calculator"
import { useCart } from "@/contexts/cart-context"

const prints = [
  {
    id: "pokemon-pokeball",
    name: "Pokemon Pokeball",
    description:
      "High-quality 3D printed Pokeball with smooth finish and precise details. Perfect for collectors and Pokemon fans.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Vu0d3CdnIux2FpcuqzxMJ1E2NLHvcp.png",
    material: "PLA",
    finishTime: "8 hours",
    category: "Collectibles",
    volume: 125.5,
    price: 799,
  },
  {
    id: "geometric-pikachu",
    name: "Geometric Pikachu Wall Art",
    description:
      "Modern geometric interpretation of Pikachu in sleek black. Perfect for wall decoration with intricate line patterns.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QK2wRXcb0mREaB1V6wEkmf7QKf9se3.png",
    material: "PETG",
    finishTime: "6 hours",
    category: "Wall Art",
    volume: 89.3,
    price: 1199,
  },
  {
    id: "glasses-stand",
    name: "Novelty Glasses Stand",
    description:
      "Fun and practical glasses holder with mustache design. Keeps your eyewear safe while adding character to your space.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-paMPiZczZEpau8TjSTdg31zHVtieRZ.png",
    material: "PLA",
    finishTime: "4 hours",
    category: "Functional",
    volume: 45.2,
    price: 449,
  },
  {
    id: "cricket-keychain",
    name: "Cricket Jersey Keychain",
    description:
      "Custom cricket jersey keychain with player name and number. Perfect for sports fans and memorabilia collectors.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ignw0EEYNJUKAQWgaCSVA0sBAxYdC.png",
    material: "PLA",
    finishTime: "2 hours",
    category: "Custom Accessories",
    volume: 12.8,
    price: 199,
  },
  {
    id: "battery-organizer",
    name: "Battery Organizer",
    description:
      "Practical battery storage solution with custom fit slots. Keeps your batteries organized and easily accessible.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CfuAIFNSmkYKXNvTB7NDL8zNtAPy94.png",
    material: "PETG",
    finishTime: "6 hours",
    category: "Functional",
    volume: 156.7,
    price: 1599,
  },
  {
    id: "rubiks-stand",
    name: "Rubiks Cube Stand",
    description:
      "Artistic geometric stand for Rubiks cube display. Features a modern minimalist design with stable base.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NRHDL6OWt548LzG1oe9uqgfktvFThS.png",
    material: "PLA",
    finishTime: "8 hours",
    category: "Display",
    volume: 78.9,
    price: 649,
  },
  {
    id: "iron-man-helmet",
    name: "Iron Man Helmet",
    description: "High-detail Iron Man helmet replica. Perfect for cosplay or display with metallic finish.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WM5M5LqnCLsj0EddpKZe7NqrYSDxFd.png",
    material: "PLA",
    finishTime: "36 hours",
    category: "Cosplay",
    volume: 890.4,
    price: 4999,
  },
  {
    id: "3d-benchy",
    name: "3D Benchy",
    description: "The classic 3D printer benchmark boat. Shows our printer's capability for fine detail and overhangs.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D9iQQYNTpkjhOqBooAdlnHp3R68230.png",
    material: "PLA",
    finishTime: "2 hours",
    category: "Test Print",
    volume: 15.6,
    price: 149,
  },
  {
    id: "arc-reactor",
    name: "Arc Reactor Replica",
    description:
      "Detailed Iron Man arc reactor with metallic finish and LED compatibility. Perfect for cosplay or display.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HRu9QAIJ8MHx86YXlBFvn5oxQY27ny.png",
    material: "PLA/TPU",
    finishTime: "12 hours",
    category: "Cosplay",
    volume: 234.1,
    price: 1899,
  },
]

export default function ThreeDPrinting() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [showSTLViewer, setShowSTLViewer] = useState(false)
  const [showQuoteCalculator, setShowQuoteCalculator] = useState(false)
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const { addToCart } = useCart()

  const filteredPrints = prints.filter(
    (print) =>
      print.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      print.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      print.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (file && file.name.toLowerCase().endsWith(".stl")) {
      setSelectedFile(file)
      setShowSTLViewer(true)
    } else {
      alert("Please upload a valid STL file")
    }
  }

  const handleAddToCart = (print: (typeof prints)[0]) => {
    addToCart({
      id: print.id,
      name: print.name,
      description: print.description,
      price: print.price,
      image: print.image,
      category: print.category,
      specifications: {
        material: print.material,
        finishTime: print.finishTime,
        volume: print.volume,
      },
    })
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
          className="max-w-6xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-6 text-center">3D Printing Services</h1>
          <p className="text-xl text-gray-400 mb-12 text-center">
            From collectibles to functional parts - bring your ideas to life with our professional 3D printing service
          </p>

          {/* 3D Tools Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="bg-black/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
            >
              <Upload className="w-12 h-12 text-blue-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Upload & Visualize</h3>
              <p className="text-gray-400 mb-4">Upload your STL file to visualize it in 3D and check dimensions</p>
              <div className="relative">
                <input
                  type="file"
                  accept=".stl"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <Button className="w-full bg-blue-500 hover:bg-blue-600">
                  <Upload className="w-4 h-4 mr-2" />
                  Upload STL File
                </Button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="bg-black/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
            >
              <Eye className="w-12 h-12 text-green-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">3D Viewer</h3>
              <p className="text-gray-400 mb-4">Interactive 3D visualization with rotation and zoom capabilities</p>
              <Button className="w-full bg-green-500 hover:bg-green-600" onClick={() => setShowSTLViewer(true)}>
                <Eye className="w-4 h-4 mr-2" />
                Open 3D Viewer
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="bg-black/50 border border-gray-800 rounded-xl p-6 backdrop-blur-sm"
            >
              <Calculator className="w-12 h-12 text-yellow-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">Instant Quote</h3>
              <p className="text-gray-400 mb-4">Get real-time pricing based on volume, material, and complexity</p>
              <Button
                className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                onClick={() => setShowQuoteCalculator(true)}
              >
                <Calculator className="w-4 h-4 mr-2" />
                Calculate Quote
              </Button>
            </motion.div>
          </div>

          <div className="flex justify-center mb-12">
            <Button
              size="lg"
              className="bg-yellow-500 hover:bg-yellow-600 rounded-xl text-black font-semibold"
              onClick={() => setIsModalOpen(true)}
            >
              Start Your 3D Print Project
            </Button>
          </div>

          <div className="mb-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="search"
                placeholder="Search prints..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-gray-900/50 border-gray-800"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            {filteredPrints.map((print) => (
              <motion.div
                key={print.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="bg-black/50 border border-gray-800 rounded-xl overflow-hidden"
              >
                <div className="relative aspect-square">
                  <Image src={print.image || "/placeholder.svg"} alt={print.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{print.name}</h3>
                  <p className="text-gray-400 mb-4">{print.description}</p>
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-sm text-blue-400">Material: {print.material}</span>
                    <span className="text-sm text-blue-400">Time: {print.finishTime}</span>
                  </div>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-green-400">Volume: {print.volume} cm³</span>
                    <span className="text-lg font-bold text-yellow-400">₹{print.price}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500">
                      {print.category}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-black"
                      onClick={() => handleAddToCart(print)}
                    >
                      <ShoppingCart className="w-4 h-4 mr-2" />
                      Add to Cart
                    </Button>
                    <Button variant="outline" className="bg-transparent" onClick={() => setIsModalOpen(true)}>
                      Custom
                    </Button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Pricing Information */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="bg-black/50 border border-gray-800 rounded-xl p-8 mb-16"
          >
            <h2 className="text-3xl font-bold mb-6 text-center">Pricing Information</h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-xl font-semibold mb-4 text-yellow-500">Material Pricing</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>PLA (Standard)</span>
                    <span className="text-green-400">₹15/cm³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>PETG (Durable)</span>
                    <span className="text-green-400">₹25/cm³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>ABS (Strong)</span>
                    <span className="text-green-400">₹30/cm³</span>
                  </div>
                  <div className="flex justify-between">
                    <span>TPU (Flexible)</span>
                    <span className="text-green-400">₹40/cm³</span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-4 text-blue-500">Additional Services</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span>Post-processing</span>
                    <span className="text-green-400">+₹200-500</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Support removal</span>
                    <span className="text-green-400">+₹100-300</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Custom colors</span>
                    <span className="text-green-400">+₹50-200</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Rush delivery</span>
                    <span className="text-green-400">+50%</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </main>
      <Footer />

      {/* Modals */}
      <ProjectFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      <STLViewer isOpen={showSTLViewer} onClose={() => setShowSTLViewer(false)} file={selectedFile} />
      <QuoteCalculator isOpen={showQuoteCalculator} onClose={() => setShowQuoteCalculator(false)} />
    </div>
  )
}
