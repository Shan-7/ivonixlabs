"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, Plus, Minus, ShoppingBag, CreditCard, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/cart-context"
import { useAuth } from "@/contexts/auth-context"
import Image from "next/image"
import CheckoutModal from "./checkout-modal"

export default function CartSidebar() {
  const { items, removeFromCart, updateQuantity, getTotalPrice, getTotalItems, isOpen, setIsOpen } = useCart()
  const { user } = useAuth()
  const [showCheckout, setShowCheckout] = useState(false)

  const handleCheckout = () => {
    if (!user) {
      // Show auth modal or redirect to login
      setIsOpen(false)
      // You can trigger auth modal here
      return
    }
    setShowCheckout(true)
  }

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50"
              onClick={() => setIsOpen(false)}
            />

            {/* Cart Sidebar */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
              className="fixed top-0 right-0 h-full w-96 bg-black border-l border-gray-800 shadow-xl z-50 flex flex-col"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-4 border-b border-gray-800">
                <h2 className="text-xl font-semibold flex items-center">
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Cart ({getTotalItems()})
                </h2>
                <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
                  <X size={24} />
                </button>
              </div>

              {/* Cart Items */}
              <div className="flex-1 overflow-y-auto p-4">
                {items.length === 0 ? (
                  <div className="text-center text-gray-400 mt-8">
                    <ShoppingBag className="w-16 h-16 mx-auto mb-4 opacity-50" />
                    <p>Your cart is empty</p>
                    <p className="text-sm mt-2">Add some items to get started</p>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {items.map((item) => (
                      <motion.div key={item.id} layout className="bg-gray-900/50 rounded-lg p-4 border border-gray-800">
                        <div className="flex gap-3">
                          {item.image && (
                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                          )}
                          <div className="flex-1 min-w-0">
                            <h3 className="font-medium text-sm truncate">{item.name}</h3>
                            <p className="text-xs text-gray-400 mt-1">{item.category}</p>
                            <div className="flex items-center justify-between mt-2">
                              <span className="text-yellow-400 font-semibold">₹{item.price.toFixed(2)}</span>
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                  className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="w-8 text-center text-sm">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                  className="w-6 h-6 rounded-full bg-gray-800 flex items-center justify-center hover:bg-gray-700"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="w-6 h-6 rounded-full bg-red-900/50 flex items-center justify-center hover:bg-red-900/70 ml-2"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                )}
              </div>

              {/* Footer */}
              {items.length > 0 && (
                <div className="border-t border-gray-800 p-4 space-y-4">
                  <div className="flex justify-between items-center text-lg font-semibold">
                    <span>Total:</span>
                    <span className="text-yellow-400">₹{getTotalPrice().toFixed(2)}</span>
                  </div>
                  <Button
                    onClick={handleCheckout}
                    className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold"
                  >
                    <CreditCard className="w-4 h-4 mr-2" />
                    Proceed to Checkout
                  </Button>
                </div>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <CheckoutModal
        isOpen={showCheckout}
        onClose={() => setShowCheckout(false)}
        items={items}
        total={getTotalPrice()}
      />
    </>
  )
}
