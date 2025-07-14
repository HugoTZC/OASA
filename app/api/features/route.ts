import { NextResponse } from "next/server"
import { FeatureManager } from "@/lib/feature-manager"

// API to get all feature access for the client
export async function GET() {
  try {
    const featureManager = FeatureManager.getInstance('oasa-default')
    const features = await featureManager.getFeatureAccess()
    
    return NextResponse.json({
      success: true,
      features
    })
  } catch (error) {
    console.error('Failed to fetch feature access:', error)
    return NextResponse.json(
      { error: 'Failed to fetch feature access' },
      { status: 500 }
    )
  }
}

// API to update feature access (admin only)
export async function PUT(request: Request) {
  try {
    const { featureKey, enabled, limit } = await request.json()
    
    if (!featureKey || typeof enabled !== 'boolean') {
      return NextResponse.json(
        { error: 'Invalid request data' },
        { status: 400 }
      )
    }
    
    const featureManager = FeatureManager.getInstance('oasa-default')
    const success = await featureManager.updateClientFeatureAccess(featureKey, enabled, limit)
    
    if (!success) {
      return NextResponse.json(
        { error: 'Feature not found' },
        { status: 404 }
      )
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Feature access updated successfully' 
    })
  } catch (error) {
    console.error('Failed to update feature access:', error)
    return NextResponse.json(
      { error: 'Failed to update feature access' },
      { status: 500 }
    )
  }
}
