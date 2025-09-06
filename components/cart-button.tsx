"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { motion, AnimatePresence } from "framer-motion"

export default function CartButton() {
  const { getTotalItems, setIsOpen } = useCart()
  const itemCount = getTotalItems()

  return (
    <Button
      onClick={() => setIsOpen(true)}
      variant="outline"
      className="relative bg-transparent border-gray-700 hover:bg-gray-800"
    >
      <ShoppingCart className="w-5 h-5" />
      <AnimatePresence>
        {itemCount > 0 && (
          <motion.span
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -top-2 -right-2 bg-yellow-500 text-black text-xs rounded-full w-5 h-5 flex items-center justify-center font-semibold"
          >
            {itemCount > 99 ? "99+" : itemCount}
          </motion.span>
        )}
      </AnimatePresence>
    </Button>
  )
}
