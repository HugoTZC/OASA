import { NextResponse } from "next/server"
import { Pool } from 'pg'

const pool = new Pool({
  user: 'hugotzc',
  host: 'localhost',
  database: 'OASA',
  password: 'dbaaccess',
  port: 5432,
})

// API to get shopping settings
export async function GET() {
  try {
    const client = await pool.connect()
    
    try {
      const result = await client.query(
        'SELECT setting_key, setting_value FROM dbo.site_settings WHERE setting_key IN ($1, $2, $3, $4, $5)',
        ['enable_shopping', 'enable_pricing', 'enable_add_to_cart', 'enable_checkout', 'shopping_mode']
      )
      
      const settings: Record<string, string> = {}
      result.rows.forEach(row => {
        settings[row.setting_key] = row.setting_value
      })
      
      return NextResponse.json(settings)
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Failed to fetch shopping settings:', error)
    // Fallback to default settings if database fails
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

// API to update shopping settings (admin only)
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const client = await pool.connect()
    
    try {
      // Update each setting
      const settingsToUpdate = [
        'enable_shopping', 
        'enable_pricing', 
        'enable_add_to_cart', 
        'enable_checkout', 
        'shopping_mode'
      ]
      
      for (const settingName of settingsToUpdate) {
        if (settingName in body) {
          const value = typeof body[settingName] === 'boolean' 
            ? body[settingName].toString() 
            : body[settingName]
            
          await client.query(
            'UPDATE dbo.site_settings SET setting_value = $1, updated_at = NOW() WHERE setting_key = $2',
            [value, settingName]
          )
        }
      }
      
      return NextResponse.json({ 
        success: true, 
        message: 'Shopping settings updated successfully' 
      })
    } finally {
      client.release()
    }
  } catch (error) {
    console.error('Failed to update shopping settings:', error)
    return NextResponse.json(
      { error: 'Failed to update shopping settings' },
      { status: 500 }
    )
  }
}
