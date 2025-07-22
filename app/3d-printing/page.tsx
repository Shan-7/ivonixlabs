"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import ProjectFormModal from "@/components/project-form-modal"

const prints = [
  {
    id: 1,
    name: "Pokemon Pokeball",
    description:
      "High-quality 3D printed Pokeball with smooth finish and precise details. Perfect for collectors and Pokemon fans.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-Vu0d3CdnIux2FpcuqzxMJ1E2NLHvcp.png",
    material: "PLA",
    finishTime: "8 hours",
    category: "Collectibles",
  },
  {
    id: 2,
    name: "Geometric Pikachu Wall Art",
    description:
      "Modern geometric interpretation of Pikachu in sleek black. Perfect for wall decoration with intricate line patterns.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-QK2wRXcb0mREaB1V6wEkmf7QKf9se3.png",
    material: "PETG",
    finishTime: "6 hours",
    category: "Wall Art",
  },
  {
    id: 3,
    name: "Novelty Glasses Stand",
    description:
      "Fun and practical glasses holder with mustache design. Keeps your eyewear safe while adding character to your space.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-paMPiZczZEpau8TjSTdg31zHVtieRZ.png",
    material: "PLA",
    finishTime: "4 hours",
    category: "Functional",
  },
  {
    id: 4,
    name: "Cricket Jersey Keychain",
    description:
      "Custom cricket jersey keychain with player name and number. Perfect for sports fans and memorabilia collectors.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-1ignw0EEYNJUKAQWgaCSVA0sBAxYdC.png",
    material: "PLA",
    finishTime: "2 hours",
    category: "Custom Accessories",
  },
  {
    id: 5,
    name: "Battery Organizer",
    description:
      "Practical battery storage solution with custom fit slots. Keeps your batteries organized and easily accessible.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-CfuAIFNSmkYKXNvTB7NDL8zNtAPy94.png",
    material: "PETG",
    finishTime: "6 hours",
    category: "Functional",
  },
  {
    id: 6,
    name: "Rubiks Cube Stand",
    description:
      "Artistic geometric stand for Rubiks cube display. Features a modern minimalist design with stable base.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-NRHDL6OWt548LzG1oe9uqgfktvFThS.png",
    material: "PLA",
    finishTime: "8 hours",
    category: "Display",
  },
  {
    id: 7,
    name: "Iron Man Helmet",
    description: "High-detail Iron Man helmet replica. Perfect for cosplay or display with metallic finish.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-WM5M5LqnCLsj0EddpKZe7NqrYSDxFd.png",
    material: "PLA",
    finishTime: "36 hours",
    category: "Cosplay",
  },
  {
    id: 8,
    name: "3D Benchy",
    description: "The classic 3D printer benchmark boat. Shows our printer's capability for fine detail and overhangs.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-D9iQQYNTpkjhOqBooAdlnHp3R68230.png",
    material: "PLA",
    finishTime: "2 hours",
    category: "Test Print",
  },
  {
    id: 9,
    name: "Arc Reactor Replica",
    description:
      "Detailed Iron Man arc reactor with metallic finish and LED compatibility. Perfect for cosplay or display.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-HRu9QAIJ8MHx86YXlBFvn5oxQY27ny.png",
    material: "PLA/TPU",
    finishTime: "12 hours",
    category: "Cosplay",
  },
]

export default function ThreeDPrinting() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false)

  const filteredPrints = prints.filter(
    (print) =>
      print.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      print.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      print.category.toLowerCase().includes(searchQuery.toLowerCase()),
  )

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
                  <Image src={print.image} alt={print.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{print.name}</h3>
                  <p className="text-gray-400 mb-4">{print.description}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-blue-400">Material: {print.material}</span>
                    <span className="text-sm text-blue-400">Print Time: {print.finishTime}</span>
                  </div>
                  <div className="mb-4">
                    <span className="text-xs px-2 py-1 rounded-full bg-yellow-500/20 text-yellow-500">
                      {print.category}
                    </span>
                  </div>
                  <Button
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Request Quote
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </main>
      <Footer />
      <ProjectFormModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  )
}
