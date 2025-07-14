"use client"

import { useState, useEffect } from 'react'
import { siteSettingsService } from '@/lib/site-settings'

export function useSiteSettings() {
  const [settings, setSettings] = useState<any>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadSettings()
  }, [])

  const loadSettings = async () => {
    try {
      setLoading(true)
      setError(null)
      const response = await siteSettingsService.getSiteSettings()
      if (response.success && response.settings) {
        setSettings(response.settings)
      } else {
        setError(response.error || 'Failed to load settings')
      }
    } catch (err) {
      setError('Failed to load settings')
      console.error('Error loading settings:', err)
    } finally {
      setLoading(false)
    }
  }

  const updateSettings = async (newSettings: any) => {
    try {
      setError(null)
      const response = await siteSettingsService.updateSiteSettings(newSettings)
      if (response.success && response.settings) {
        setSettings(response.settings)
        return true
      } else {
        setError(response.error || 'Failed to update settings')
        return false
      }
    } catch (err) {
      setError('Failed to update settings')
      console.error('Error updating settings:', err)
      return false
    }
  }

  const updateSetting = async (key: string, value: any) => {
    try {
      setError(null)
      const response = await siteSettingsService.updateSetting(key, value)
      if (response.success && response.settings) {
        setSettings(response.settings)
        return true
      } else {
        setError(response.error || 'Failed to update setting')
        return false
      }
    } catch (err) {
      setError('Failed to update setting')
      console.error('Error updating setting:', err)
      return false
    }
  }

  const getSetting = (key: string, defaultValue: any = null) => {
    return settings[key] ?? defaultValue
  }

  return {
    settings,
    loading,
    error,
    loadSettings,
    updateSettings,
    updateSetting,
    getSetting
  }
}
