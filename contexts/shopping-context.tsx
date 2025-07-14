"use client"

import React, { createContext, useContext, useState, useEffect } from 'react'

interface ShoppingSettings {
  enableShopping: boolean
  enablePricing: boolean
  enableAddToCart: boolean
  enableCheckout: boolean
  shoppingMode: 'full' | 'catalog' | 'disabled'
}

interface ShoppingContextType {
  settings: ShoppingSettings
  loading: boolean
  refreshSettings: () => Promise<void>
}

const ShoppingContext = createContext<ShoppingContextType | undefined>(undefined)

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export function ShoppingProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState<ShoppingSettings>({
    enableShopping: true,
    enablePricing: true,
    enableAddToCart: true,
    enableCheckout: true,
    shoppingMode: 'full'
  })
  const [loading, setLoading] = useState(true)

  const refreshSettings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/shopping`)
      if (response.ok) {
        const data = await response.json()
        setSettings({
          enableShopping: data.enable_shopping === 'true' || data.enable_shopping === true,
          enablePricing: data.enable_pricing === 'true' || data.enable_pricing === true,
          enableAddToCart: data.enable_add_to_cart === 'true' || data.enable_add_to_cart === true,
          enableCheckout: data.enable_checkout === 'true' || data.enable_checkout === true,
          shoppingMode: data.shopping_mode || 'full'
        })
      }
    } catch (error) {
      console.error('Failed to fetch shopping settings:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    refreshSettings()
  }, [])

  return (
    <ShoppingContext.Provider value={{ settings, loading, refreshSettings }}>
      {children}
    </ShoppingContext.Provider>
  )
}

export function useShopping() {
  const context = useContext(ShoppingContext)
  if (context === undefined) {
    throw new Error('useShopping must be used within a ShoppingProvider')
  }
  return context
}
