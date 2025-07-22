"use client"

import { motion } from "framer-motion"
import { PrinterIcon as Printer3d } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Start3DPrint() {
  return (
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="bg-yellow-500 rounded-lg p-8 md:p-12 text-center text-black"
        >
          <Printer3d className="w-16 h-16 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Start Your 3D Print Project</h2>
          <p className="text-xl mb-6 max-w-3xl mx-auto">
            Turn your ideas into reality with our professional 3D printing services. From prototypes to custom parts,
            we've got you covered.
          </p>
          <Link href="/3d-printing">
            <Button size="lg" className="bg-black text-yellow-500 hover:bg-gray-900">
              Get Started
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
