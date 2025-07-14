"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, ShoppingCart, DollarSign, Plus, CreditCard } from "lucide-react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

interface ShoppingSettings {
  enable_shopping: boolean
  enable_pricing: boolean
  enable_add_to_cart: boolean
  enable_checkout: boolean
  shopping_mode: 'full' | 'catalog' | 'disabled'
}

export default function ShoppingSettingsPage() {
  const [settings, setSettings] = useState<ShoppingSettings>({
    enable_shopping: true,
    enable_pricing: true,
    enable_add_to_cart: true,
    enable_checkout: true,
    shopping_mode: 'full'
  })
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/shopping`)
      if (response.ok) {
        const data = await response.json()
        setSettings({
          enable_shopping: data.enable_shopping === 'true' || data.enable_shopping === true,
          enable_pricing: data.enable_pricing === 'true' || data.enable_pricing === true,
          enable_add_to_cart: data.enable_add_to_cart === 'true' || data.enable_add_to_cart === true,
          enable_checkout: data.enable_checkout === 'true' || data.enable_checkout === true,
          shopping_mode: data.shopping_mode || 'full'
        })
      }
    } catch (error) {
      console.error('Failed to load settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const saveSettings = async () => {
    setSaving(true)
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/shopping`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })

      if (response.ok) {
        alert('Settings saved successfully!')
      } else {
        alert('Failed to save settings')
      }
    } catch (error) {
      console.error('Failed to save settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  const handleSettingChange = (key: keyof ShoppingSettings, value: boolean | string) => {
    setSettings(prev => ({ ...prev, [key]: value }))
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Settings</h1>
        <p className="text-gray-600 mt-2">Configure e-commerce features for your OASA platform</p>
      </div>

      <div className="grid gap-6">
        {/* Shopping Mode */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="w-5 h-5" />
              Shopping Mode
            </CardTitle>
            <CardDescription>
              Choose how your platform handles e-commerce functionality
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="shopping_mode">Platform Mode</Label>
                <Select
                  value={settings.shopping_mode}
                  onValueChange={(value) => handleSettingChange('shopping_mode', value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select shopping mode" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="full">Full E-commerce</SelectItem>
                    <SelectItem value="catalog">Product Catalog Only</SelectItem>
                    <SelectItem value="disabled">Information Only</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-sm text-gray-500 mt-1">
                  {settings.shopping_mode === 'full' && 'Complete shopping experience with cart, pricing, and checkout'}
                  {settings.shopping_mode === 'catalog' && 'Show products and prices, but no shopping cart'}
                  {settings.shopping_mode === 'disabled' && 'Product information only, no prices or shopping features'}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Individual Features */}
        <Card>
          <CardHeader>
            <CardTitle>E-commerce Features</CardTitle>
            <CardDescription>
              Fine-tune individual shopping features
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Enable Shopping */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <ShoppingCart className="w-4 h-4" />
                    <Label htmlFor="enable_shopping">Enable Shopping Cart</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Allow users to add products to cart and proceed to checkout
                  </p>
                </div>
                <Switch
                  id="enable_shopping"
                  checked={settings.enable_shopping}
                  onCheckedChange={(checked) => handleSettingChange('enable_shopping', checked)}
                />
              </div>

              {/* Enable Pricing */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <DollarSign className="w-4 h-4" />
                    <Label htmlFor="enable_pricing">Show Product Prices</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Display prices on product listings and detail pages
                  </p>
                </div>
                <Switch
                  id="enable_pricing"
                  checked={settings.enable_pricing}
                  onCheckedChange={(checked) => handleSettingChange('enable_pricing', checked)}
                />
              </div>

              {/* Enable Add to Cart */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <Plus className="w-4 h-4" />
                    <Label htmlFor="enable_add_to_cart">Add to Cart Buttons</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Show "Add to Cart" buttons on product pages
                  </p>
                </div>
                <Switch
                  id="enable_add_to_cart"
                  checked={settings.enable_add_to_cart}
                  onCheckedChange={(checked) => handleSettingChange('enable_add_to_cart', checked)}
                />
              </div>

              {/* Enable Checkout */}
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-4 h-4" />
                    <Label htmlFor="enable_checkout">Checkout Process</Label>
                  </div>
                  <p className="text-sm text-gray-500">
                    Enable full checkout and payment processing
                  </p>
                </div>
                <Switch
                  id="enable_checkout"
                  checked={settings.enable_checkout}
                  onCheckedChange={(checked) => handleSettingChange('enable_checkout', checked)}
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings} disabled={saving}>
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}
