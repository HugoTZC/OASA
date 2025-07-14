/**
 * Site Settings Service
 * Frontend service to manage site-wide settings
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export interface SiteSettingsResponse {
  success: boolean
  settings?: any
  error?: string
}

class SiteSettingsService {
  /**
   * Get all site settings
   */
  async getSiteSettings(): Promise<SiteSettingsResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/site`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error fetching site settings:', error)
      return {
        success: false,
        error: 'Failed to fetch site settings'
      }
    }
  }

  /**
   * Update site settings
   */
  async updateSiteSettings(settings: any): Promise<SiteSettingsResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/site`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(settings),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error('Error updating site settings:', error)
      return {
        success: false,
        error: 'Failed to update site settings'
      }
    }
  }

  /**
   * Get specific setting by key
   */
  async getSetting(key: string): Promise<any> {
    try {
      const response = await this.getSiteSettings()
      if (response.success && response.settings) {
        return response.settings[key]
      }
      return null
    } catch (error) {
      console.error(`Error fetching setting ${key}:`, error)
      return null
    }
  }

  /**
   * Update specific setting by key
   */
  async updateSetting(key: string, value: any): Promise<SiteSettingsResponse> {
    try {
      const response = await fetch(`${BACKEND_URL}/api/settings/site/${key}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ value }),
      })
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      return await response.json()
    } catch (error) {
      console.error(`Error updating setting ${key}:`, error)
      return {
        success: false,
        error: `Failed to update setting ${key}`
      }
    }
  }
}

export const siteSettingsService = new SiteSettingsService()
