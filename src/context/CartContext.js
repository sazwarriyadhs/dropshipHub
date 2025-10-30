import React, { createContext, useState, useContext, useMemo } from 'react'

// 1. Membuat Context
const CartContext = createContext()

// 2. Hook kustom untuk menggunakan CartContext dengan mudah
export const useCart = () => {
  return useContext(CartContext)
}

// 3. Membuat Provider Component
export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([])

  const addToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id)
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item,
        )
      } else {
        return [...prevItems, { ...product, quantity: 1 }]
      }
    })
  }

  const updateQuantity = (productId, quantity) => {
    const numQuantity = Number(quantity)
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: numQuantity > 0 ? numQuantity : 1 } : item,
      ),
    )
  }

  const removeFromCart = (productId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== productId))
  }

  const clearCart = () => {
    setCartItems([])
  }

  const totalPrice = useMemo(() => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
  }, [cartItems])

  // Nilai yang akan disediakan untuk komponen di bawahnya
  const value = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
