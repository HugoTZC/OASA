"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Save, Settings, Users, Crown, Package } from "lucide-react"

interface SubscriptionPlan {
  id: number
  plan_name: string
  description: string
  monthly_price: string
  max_products: number
  max_users: number
  is_active: boolean
}

interface Feature {
  id: number
  feature_key: string
  feature_name: string
  description: string
  category: string
  is_core_feature: boolean
}

interface PlanFeature {
  plan_id: number
  feature_id: number
  is_enabled: boolean
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export default function SubscriptionManagementPage() {
  const [plans, setPlans] = useState<SubscriptionPlan[]>([])
  const [features, setFeatures] = useState<Feature[]>([])
  const [planFeatures, setPlanFeatures] = useState<PlanFeature[]>([])
  const [currentSubscription, setCurrentSubscription] = useState<any>(null)
  const [shoppingFeatures, setShoppingFeatures] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    loadData()
  }, [])

  const loadData = async () => {
    try {
      setLoading(true)
      
      // COMMENTED OUT - Load subscription plans
      // const plansResponse = await fetch(`${BACKEND_URL}/api/subscriptions/plans`)
      // if (plansResponse.ok) {
      //   const plansData = await plansResponse.json()
      //   setPlans(plansData.data)
      // }

      // COMMENTED OUT - Load current subscription
      // const currentSubResponse = await fetch(`${BACKEND_URL}/api/subscriptions/current`)
      // if (currentSubResponse.ok) {
      //   const currentSubData = await currentSubResponse.json()
      //   setCurrentSubscription(currentSubData.data)
      // }

      // Load shopping features
      const shoppingResponse = await fetch(`${BACKEND_URL}/api/settings/shopping`)
      if (shoppingResponse.ok) {
        const shoppingData = await shoppingResponse.json()
        setShoppingFeatures({
          enable_shopping: shoppingData.enable_shopping === 'true' || shoppingData.enable_shopping === true,
          enable_pricing: shoppingData.enable_pricing === 'true' || shoppingData.enable_pricing === true,
          enable_add_to_cart: shoppingData.enable_add_to_cart === 'true' || shoppingData.enable_add_to_cart === true,
          enable_checkout: shoppingData.enable_checkout === 'true' || shoppingData.enable_checkout === true,
          shopping_mode: shoppingData.shopping_mode || 'full'
        })
      }

    } catch (error) {
      console.error('Failed to load shopping settings:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleShoppingFeatureToggle = async (featureKey: string, enabled: boolean) => {
    try {
      const newFeatures = {
        ...shoppingFeatures,
        [featureKey]: enabled
      }
      
      setShoppingFeatures(newFeatures)

      // Update on backend
      const response = await fetch(`${BACKEND_URL}/api/settings/shopping`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newFeatures),
      })

      if (!response.ok) {
        // Revert on error
        setShoppingFeatures(shoppingFeatures)
        alert('Failed to update feature')
      }
    } catch (error) {
      console.error('Failed to update shopping feature:', error)
      // Revert on error
      setShoppingFeatures(shoppingFeatures)
      alert('Failed to update feature')
    }
  }

  const getShoppingModeColor = (mode: string) => {
    switch (mode) {
      case 'full': return 'bg-green-500'
      case 'catalog': return 'bg-yellow-500'
      case 'disabled': return 'bg-red-500'
      default: return 'bg-gray-500'
    }
  }

  const getShoppingModeText = (mode: string) => {
    switch (mode) {
      case 'full': return 'Full E-commerce'
      case 'catalog': return 'Catalog Only'
      case 'disabled': return 'Information Only'
      default: return 'Unknown'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading shopping settings...</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">E-commerce Feature Management</h1>
        <p className="text-gray-600 mt-2">Manage shopping features for your OASA platform</p>
      </div>

      {/* COMMENTED OUT - Current Subscription Status */}
      {/*
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Crown className="w-5 h-5" />
            Current Subscription
          </CardTitle>
          <CardDescription>
            Your current plan and subscription details
          </CardDescription>
        </CardHeader>
        <CardContent>
          {currentSubscription ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-sm font-medium text-gray-500">Plan</Label>
                <div className="text-xl font-bold">{currentSubscription.plan_name}</div>
                <div className="text-sm text-gray-600">{currentSubscription.plan_description}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Monthly Price</Label>
                <div className="text-xl font-bold">${currentSubscription.monthly_price}</div>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-500">Status</Label>
                <div className="flex items-center gap-2">
                  <Badge variant="default" className="bg-green-500">Active</Badge>
                  <span className="text-sm text-gray-600">
                    Since {new Date(currentSubscription.started_at).toLocaleDateString()}
                  </span>
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500">No active subscription found</div>
            </div>
          )}
        </CardContent>
      </Card>
      */}

      {/* Shopping Features Quick Toggle */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Package className="w-5 h-5" />
            E-commerce Features
          </CardTitle>
          <CardDescription>
            Quickly enable or disable shopping functionality
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Shopping Mode Indicator */}
            <div className="flex items-center gap-4">
              <Label>Current Mode:</Label>
              <Badge className={`${getShoppingModeColor(shoppingFeatures.shopping_mode)} text-white`}>
                {getShoppingModeText(shoppingFeatures.shopping_mode)}
              </Badge>
            </div>

            {/* Feature Toggles */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_shopping">Shopping Cart</Label>
                  <div className="text-sm text-gray-500">
                    Enable shopping cart functionality
                  </div>
                </div>
                <Switch
                  id="enable_shopping"
                  checked={shoppingFeatures.enable_shopping || false}
                  onCheckedChange={(checked) => handleShoppingFeatureToggle('enable_shopping', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_pricing">Product Pricing</Label>
                  <div className="text-sm text-gray-500">
                    Display product prices
                  </div>
                </div>
                <Switch
                  id="enable_pricing"
                  checked={shoppingFeatures.enable_pricing || false}
                  onCheckedChange={(checked) => handleShoppingFeatureToggle('enable_pricing', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_add_to_cart">Add to Cart</Label>
                  <div className="text-sm text-gray-500">
                    Show "Add to Cart" buttons
                  </div>
                </div>
                <Switch
                  id="enable_add_to_cart"
                  checked={shoppingFeatures.enable_add_to_cart || false}
                  onCheckedChange={(checked) => handleShoppingFeatureToggle('enable_add_to_cart', checked)}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="enable_checkout">Checkout Process</Label>
                  <div className="text-sm text-gray-500">
                    Enable checkout and payments
                  </div>
                </div>
                <Switch
                  id="enable_checkout"
                  checked={shoppingFeatures.enable_checkout || false}
                  onCheckedChange={(checked) => handleShoppingFeatureToggle('enable_checkout', checked)}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* COMMENTED OUT - Available Plans */}
      {/*
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            Available Plans
          </CardTitle>
          <CardDescription>
            View all available subscription plans and their features
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {plans.map((plan) => (
              <div 
                key={plan.id} 
                className={`border rounded-lg p-4 ${
                  currentSubscription?.plan_name === plan.plan_name 
                    ? 'border-blue-500 bg-blue-50' 
                    : 'border-gray-200'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <h3 className="font-semibold">{plan.plan_name}</h3>
                  {currentSubscription?.plan_name === plan.plan_name && (
                    <Badge variant="default" className="bg-blue-500">Current</Badge>
                  )}
                </div>
                <div className="text-2xl font-bold text-green-600 mb-2">
                  ${plan.monthly_price}
                  <span className="text-sm text-gray-500">/month</span>
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  {plan.description}
                </div>
                <div className="space-y-1 text-xs text-gray-500">
                  <div>Max Products: {plan.max_products === -1 ? 'Unlimited' : plan.max_products}</div>
                  <div>Max Users: {plan.max_users === -1 ? 'Unlimited' : plan.max_users}</div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
      */}
    </div>
  )
}
