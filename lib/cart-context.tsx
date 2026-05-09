"use client"

import { createContext, useContext, useState, ReactNode } from "react"

export type Variant = "original" | "keju"
export type Topping = "keju" | "telor"

export interface CartItem {
  id: string
  name: string
  variant: Variant
  price: number
  quantity: number
  toppings: Topping[]
  image: string
}

interface CartContextType {
  items: CartItem[]
  addItem: (item: CartItem) => void
  removeItem: (id: string) => void
  updateQuantity: (id: string, quantity: number) => void
  clearCart: () => void
  getTotalPrice: () => number
  getTotalItems: () => number
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([])

  const addItem = (newItem: CartItem) => {
    setItems(prev => {
      const existingIndex = prev.findIndex(
        item => item.id === newItem.id && 
        item.variant === newItem.variant &&
        JSON.stringify(item.toppings) === JSON.stringify(newItem.toppings)
      )
      if (existingIndex > -1) {
        const updated = [...prev]
        updated[existingIndex].quantity += newItem.quantity
        return updated
      }
      return [...prev, { ...newItem, id: `${newItem.id}-${Date.now()}` }]
    })
  }

  const removeItem = (id: string) => {
    setItems(prev => prev.filter(item => item.id !== id))
  }

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeItem(id)
      return
    }
    setItems(prev => prev.map(item => 
      item.id === id ? { ...item, quantity } : item
    ))
  }

  const clearCart = () => setItems([])

  const getTotalPrice = () => {
    return items.reduce((total, item) => {
      const toppingPrice = item.toppings.reduce((sum, t) => {
        return sum + (t === "keju" ? 2000 : 3000)
      }, 0)
      return total + (item.price + toppingPrice) * item.quantity
    }, 0)
  }

  const getTotalItems = () => {
    return items.reduce((total, item) => total + item.quantity, 0)
  }

  return (
    <CartContext.Provider value={{
      items,
      addItem,
      removeItem,
      updateQuantity,
      clearCart,
      getTotalPrice,
      getTotalItems
    }}>
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}
