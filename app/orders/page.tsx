"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Package, Calendar, CreditCard, MapPin, Eye } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import { supabase } from "@/lib/supabase"
import Navbar from "@/components/navbar"
import Footer from "@/components/footer"
import AnimatedBackground from "@/components/animated-background"
import { Button } from "@/components/ui/button"

interface Order {
  id: string
  order_id: string
  payment_id: string
  amount: number
  currency: string
  status: string
  items: any[]
  shipping_address: any
  created_at: string
}

export default function Orders() {
  const { user } = useAuth()
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) {
      fetchOrders()
    }
  }, [user])

  const fetchOrders = async () => {
    try {
      const { data, error } = await supabase
        .from("orders")
        .select("*")
        .eq("user_id", user?.id)
        .order("created_at", { ascending: false })

      if (error) throw error
      setOrders(data || [])
    } catch (error) {
      console.error("Error fetching orders:", error)
    } finally {
      setLoading(false)
    }
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-black">
        <AnimatedBackground />
        <Navbar />
        <main className="container mx-auto px-4 py-24">
          <div className="text-center">
            <h1 className="text-4xl font-bold mb-6">Orders</h1>
            <p className="text-gray-400">Please sign in to view your orders.</p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black">
      <AnimatedBackground />
      <Navbar />
      <main className="container mx-auto px-4 py-24">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="max-w-4xl mx-auto"
        >
          <h1 className="text-4xl font-bold mb-8 text-center">Your Orders</h1>

          {loading ? (
            <div className="text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-yellow-500 mx-auto mb-4"></div>
              <p>Loading your orders...</p>
            </div>
          ) : orders.length === 0 ? (
            <div className="text-center text-gray-400">
              <Package className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p className="text-xl mb-2">No orders yet</p>
              <p>Start shopping to see your orders here</p>
            </div>
          ) : (
            <div className="space-y-6">
              {orders.map((order) => (
                <motion.div
                  key={order.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-gray-900/50 border border-gray-800 rounded-lg p-6"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold">Order #{order.order_id.slice(-8)}</h3>
                      <div className="flex items-center text-sm text-gray-400 mt-1">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(order.created_at).toLocaleDateString()}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-yellow-400">₹{order.amount.toFixed(2)}</div>
                      <div
                        className={`text-sm px-2 py-1 rounded-full ${
                          order.status === "paid"
                            ? "bg-green-500/20 text-green-400"
                            : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                      </div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <Package className="w-4 h-4 mr-2" />
                        Items ({order.items.length})
                      </h4>
                      <div className="space-y-2">
                        {order.items.map((item: any, index: number) => (
                          <div key={index} className="flex justify-between text-sm">
                            <span>
                              {item.name} × {item.quantity}
                            </span>
                            <span>₹{(item.price * item.quantity).toFixed(2)}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h4 className="font-medium mb-2 flex items-center">
                        <MapPin className="w-4 h-4 mr-2" />
                        Shipping Address
                      </h4>
                      <div className="text-sm text-gray-400">
                        <p>{order.shipping_address.name}</p>
                        <p>{order.shipping_address.address}</p>
                        <p>
                          {order.shipping_address.city}, {order.shipping_address.state}
                        </p>
                        <p>{order.shipping_address.pincode}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-4 pt-4 border-t border-gray-700">
                    <div className="flex items-center text-sm text-gray-400">
                      <CreditCard className="w-4 h-4 mr-1" />
                      Payment ID: {order.payment_id.slice(-8)}
                    </div>
                    <Button variant="outline" size="sm">
                      <Eye className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
      <Footer />
    </div>
  )
}
