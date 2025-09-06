"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import { toast } from "sonner"

export interface CartItem {
  id: string
  name: string
  description: string
  price: number
  quantity: number
  image?: string
  category: string
  specifications?: Record<string, any>
}

interface CartContextType {
  items: CartItem[]
  addToCart: (item: Omit<CartItem, "quantity">) => void
  removeFromCart: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
  isOpen: boolean
  setIsOpen: (open: boolean) => void
}

const CartContext = createContext<CartContextType>({
  items: [],
  addToCart: () => {},
  removeFromCart: () => {},
  updateQuantity: () => {},
  clearCart: () => {},
  getTotalPrice: () => 0,
  getTotalItems: () => 0,
  isOpen: false,
  setIsOpen: () => {},
})

export const useCart = () => useContext(CartContext)

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])
  const [isOpen, setIsOpen] = useState(false)

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem("ivonix-cart")
    if (savedCart) {
      try {
        setItems(JSON.parse(savedCart))
      } catch (error) {
        console.error("Error loading cart from localStorage:", error)
      }
    }
  }, [])

  // Save cart to localStorage whenever items change
  useEffect(() => {
    localStorage.setItem("ivonix-cart", JSON.stringify(items))
  }, [items])

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id)

      if (existingItem) {
        toast.success(`Updated ${newItem.name} quantity in cart`)
        return prevItems.map((item) => (item.id === newItem.id ? { ...item, quantity: item.quantity + 1 } : item))
      } else {
        toast.success(`Added ${newItem.name} to cart`)
        return [...prevItems, { ...newItem, quantity: 1 }]
      }
    })
  }

  const removeFromCart = (id: string) => {
    setItems((prevItems) => {
      const item = prevItems.find((item) => item.id === id)
      if (item) {
        toast.success(`Removed ${item.name} from cart`)
      }
      return prevItems.filter((item) => item.id !== id)
    })
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id)
      return
    }

    setItems((prevItems) => prevItems.map((item) => (item.id === id ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setItems([])
    toast.success("Cart cleared")
  }

  const getTotalPrice = () => {
    return items.reduce((total, item) => total + item.price * item.quantity, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getTotalPrice,
        getTotalItems,
        isOpen,
        setIsOpen,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}
