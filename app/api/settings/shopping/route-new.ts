import { NextResponse } from "next/server"
import { FeatureManager } from "@/lib/feature-manager"

// API to get shopping settings (now using feature system)
export async function GET() {
  try {
    const featureManager = FeatureManager.getInstance('oasa-default')
    const shoppingFeatures = await featureManager.getShoppingFeatures()
    
    return NextResponse.json({
      enable_shopping: shoppingFeatures.enableShopping.toString(),
      enable_pricing: shoppingFeatures.enablePricing.toString(),
      enable_add_to_cart: shoppingFeatures.enableAddToCart.toString(),
      enable_checkout: shoppingFeatures.enableCheckout.toString(),
      shopping_mode: shoppingFeatures.shoppingMode
    })
  } catch (error) {
    console.error('Failed to fetch shopping settings:', error)
    // Fallback to default settings if feature system fails
    const fallbackSettings = {
      enable_shopping: 'true',
      enable_pricing: 'true', 
      enable_add_to_cart: 'true',
      enable_checkout: 'true',
      shopping_mode: 'full'
    }
    return NextResponse.json(fallbackSettings)
  }
}

// API to update shopping settings (admin only) - now updates features
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const featureManager = FeatureManager.getInstance('oasa-default')
    
    const featureUpdates = [
      { key: 'shopping_cart', enabled: body.enable_shopping },
      { key: 'product_pricing', enabled: body.enable_pricing },
      { key: 'add_to_cart', enabled: body.enable_add_to_cart },
      { key: 'checkout_process', enabled: body.enable_checkout }
    ]
    
    // Update each feature
    for (const update of featureUpdates) {
      if (typeof update.enabled === 'boolean') {
        await featureManager.updateClientFeatureAccess(update.key, update.enabled)
      }
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Shopping settings updated successfully' 
    })
  } catch (error) {
    console.error('Failed to update shopping settings:', error)
    return NextResponse.json(
      { error: 'Failed to update shopping settings' },
      { status: 500 }
    )
  }
}
