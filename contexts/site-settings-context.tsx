"use client"

import React, { createContext, useContext, useEffect, useState } from 'react'
import { useSiteSettings } from '@/hooks/use-site-settings'

interface SiteSettingsContextType {
  settings: any
  loading: boolean
  error: string | null
  updateSettings: (newSettings: any) => Promise<boolean>
  updateSetting: (key: string, value: any) => Promise<boolean>
  getSetting: (key: string, defaultValue?: any) => any
  themeColors: {
    primary: string
    secondary: string
    accent: string
    text: string
    background: string
  }
}

const SiteSettingsContext = createContext<SiteSettingsContextType | undefined>(undefined)

export function SiteSettingsProvider({ children }: { children: React.ReactNode }) {
  const {
    settings,
    loading,
    error,
    updateSettings,
    updateSetting,
    getSetting
  } = useSiteSettings()

  const [themeColors, setThemeColors] = useState({
    primary: '#1e40af',
    secondary: '#3b82f6',
    accent: '#fbbf24',
    text: '#111827',
    background: '#ffffff'
  })

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setThemeColors({
        primary: settings.primary_color || '#1e40af',
        secondary: settings.secondary_color || '#3b82f6',
        accent: settings.accent_color || '#fbbf24',
        text: settings.text_color || '#111827',
        background: settings.background_color || '#ffffff'
      })

      // Apply CSS custom properties for global theme usage
      if (typeof document !== 'undefined') {
        const root = document.documentElement
        root.style.setProperty('--color-primary', settings.primary_color || '#1e40af')
        root.style.setProperty('--color-secondary', settings.secondary_color || '#3b82f6')
        root.style.setProperty('--color-accent', settings.accent_color || '#fbbf24')
        root.style.setProperty('--color-text', settings.text_color || '#111827')
        root.style.setProperty('--color-background', settings.background_color || '#ffffff')
      }
    }
  }, [settings])

  const value = {
    settings,
    loading,
    error,
    updateSettings,
    updateSetting,
    getSetting,
    themeColors
  }

  return (
    <SiteSettingsContext.Provider value={value}>
      {children}
    </SiteSettingsContext.Provider>
  )
}

export function useSiteSettingsContext() {
  const context = useContext(SiteSettingsContext)
  if (context === undefined) {
    throw new Error('useSiteSettingsContext must be used within a SiteSettingsProvider')
  }
  return context
}
