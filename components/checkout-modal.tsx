"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { X, CreditCard, MapPin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useAuth } from "@/contexts/auth-context"
import { useCart, type CartItem } from "@/contexts/cart-context"
import { loadRazorpay, createRazorpayOrder, verifyPayment } from "@/lib/razorpay"
import { toast } from "sonner"
import { supabase } from "@/lib/supabase"

interface CheckoutModalProps {
  isOpen: boolean
  onClose: () => void
  items: CartItem[]
  total: number
}

export default function CheckoutModal({ isOpen, onClose, items, total }: CheckoutModalProps) {
  const { user } = useAuth()
  const { clearCart } = useCart()
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  })

  useEffect(() => {
    if (user) {
      const fetchProfile = async () => {
        try {
          const { data, error } = await supabase.from("profiles").select("name, phone").eq("id", user.id).single()

          if (error) throw error

          setFormData((prev) => ({
            ...prev,
            name: data.name || user.user_metadata.name || "",
            email: user.email || "",
            phone: data.phone || "",
          }))
        } catch (error) {
          console.error("Error fetching profile:", error)
        }
      }

      fetchProfile()
    }
  }, [user])

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
  }

  const handlePayment = async () => {
    if (!user) {
      toast.error("Please sign in to continue")
      return
    }

    // Validate form
    const requiredFields = ["name", "email", "phone", "address", "city", "state", "pincode"]
    const missingFields = requiredFields.filter((field) => !formData[field as keyof typeof formData])

    if (missingFields.length > 0) {
      toast.error("Please fill in all required fields")
      return
    }

    setLoading(true)

    try {
      // Load Razorpay script
      const razorpayLoaded = await loadRazorpay()
      if (!razorpayLoaded) {
        throw new Error("Failed to load Razorpay")
      }

      // Create order
      const orderData = await createRazorpayOrder(Math.round(total * 100)) // Convert to paise

      // Configure Razorpay options
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID || "rzp_test_your_key_id",
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Ivonix Labs",
        description: `Order for ${items.length} item(s)`,
        order_id: orderData.id,
        handler: async (response: any) => {
          try {
            // Verify payment
            const verification = await verifyPayment(response)

            if (verification.success) {
              // Save order to database
              await saveOrder(response, orderData)

              toast.success("Payment successful! Order placed.")
              clearCart()
              onClose()
            } else {
              throw new Error("Payment verification failed")
            }
          } catch (error) {
            console.error("Payment verification error:", error)
            toast.error("Payment verification failed")
          }
        },
        prefill: {
          name: formData.name,
          email: formData.email,
          contact: formData.phone,
        },
        theme: {
          color: "#EAB308", // Yellow color matching your theme
        },
        modal: {
          ondismiss: () => {
            setLoading(false)
          },
        },
      }

      // Open Razorpay checkout
      const razorpay = new window.Razorpay(options)
      razorpay.open()
    } catch (error) {
      console.error("Payment error:", error)
      toast.error("Failed to initiate payment")
      setLoading(false)
    }
  }

  const saveOrder = async (paymentResponse: any, orderData: any) => {
    try {
      const { error } = await supabase.from("orders").insert([
        {
          user_id: user?.id,
          order_id: orderData.id,
          payment_id: paymentResponse.razorpay_payment_id,
          amount: total,
          currency: "INR",
          status: "paid",
          items: items,
          shipping_address: formData,
          created_at: new Date().toISOString(),
        },
      ])

      if (error) throw error
    } catch (error) {
      console.error("Error saving order:", error)
      // Don't throw here as payment was successful
    }
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50"
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-black border border-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto"
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-800">
              <h2 className="text-2xl font-bold">Checkout</h2>
              <button onClick={onClose} className="text-gray-400 hover:text-white">
                <X size={24} />
              </button>
            </div>

            <div className="p-6 space-y-6">
              {/* Order Summary */}
              <div className="bg-gray-900/50 rounded-lg p-4">
                <h3 className="font-semibold mb-3">Order Summary</h3>
                <div className="space-y-2">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between text-sm">
                      <span>
                        {item.name} × {item.quantity}
                      </span>
                      <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-gray-700 pt-2 mt-2">
                    <div className="flex justify-between font-semibold">
                      <span>Total:</span>
                      <span className="text-yellow-400">₹{total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Shipping Information */}
              <div>
                <h3 className="font-semibold mb-4 flex items-center">
                  <MapPin className="w-5 h-5 mr-2" />
                  Shipping Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Full Name *</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => handleInputChange("name", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email *</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => handleInputChange("email", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Phone *</label>
                    <Input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange("phone", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Pincode *</label>
                    <Input
                      value={formData.pincode}
                      onChange={(e) => handleInputChange("pincode", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-300 mb-1">Address *</label>
                    <Input
                      value={formData.address}
                      onChange={(e) => handleInputChange("address", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">City *</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">State *</label>
                    <Input
                      value={formData.state}
                      onChange={(e) => handleInputChange("state", e.target.value)}
                      className="bg-gray-900/50 border-gray-700"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Button */}
              <div className="pt-4 border-t border-gray-800">
                <Button
                  onClick={handlePayment}
                  disabled={loading}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold py-3"
                >
                  <CreditCard className="w-5 h-5 mr-2" />
                  {loading ? "Processing..." : `Pay ₹${total.toFixed(2)}`}
                </Button>
                <p className="text-xs text-gray-400 text-center mt-2">Secure payment powered by Razorpay</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
