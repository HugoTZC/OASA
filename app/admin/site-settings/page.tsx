"use client"

import React, { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Save, Settings, Palette, MessageSquare, Building } from "lucide-react"
import { useSiteSettings } from "@/hooks/use-site-settings"
import { DEFAULT_THEMES, type ColorTheme } from "@/types/settings"

export default function SiteSettingsPage() {
  const { settings, loading, error, updateSettings } = useSiteSettings()
  const [formData, setFormData] = useState({
    // Banner settings
    banner_slogan: '',
    banner_contact: '',
    banner_enabled: true,
    
    // Theme settings
    primary_color: '#1e40af',
    secondary_color: '#3b82f6',
    accent_color: '#fbbf24',
    text_color: '#111827',
    background_color: '#ffffff',
    
    // Company information
    company_name: '',
    company_email: '',
    company_phone: '',
    company_address: '',
    
    // Social media
    facebook_url: '',
    twitter_url: '',
    instagram_url: '',
    linkedin_url: ''
  })
  const [saving, setSaving] = useState(false)
  const [selectedTheme, setSelectedTheme] = useState<string>('blue')

  useEffect(() => {
    if (settings && Object.keys(settings).length > 0) {
      setFormData(prev => ({
        ...prev,
        ...settings
      }))
      
      // Find matching theme
      const matchingTheme = DEFAULT_THEMES.find(theme => 
        theme.primary === settings.primary_color
      )
      if (matchingTheme) {
        setSelectedTheme(matchingTheme.name)
      } else {
        setSelectedTheme('custom')
      }
    }
  }, [settings])

  const handleInputChange = (key: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }))
  }

  const handleThemeChange = (theme: ColorTheme) => {
    setSelectedTheme(theme.name)
    setFormData(prev => ({
      ...prev,
      primary_color: theme.primary,
      secondary_color: theme.secondary,
      accent_color: theme.accent,
      text_color: theme.text,
      background_color: theme.background
    }))
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const success = await updateSettings(formData)
      if (success) {
        alert('Settings saved successfully!')
      } else {
        alert('Failed to save settings')
      }
    } catch (error) {
      console.error('Error saving settings:', error)
      alert('Failed to save settings')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-lg">Loading site settings...</div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Site Settings</h1>
        <p className="text-gray-600 mt-2">Configure site-wide settings, themes, and company information</p>
      </div>

      <div className="grid gap-6">
        {/* Banner Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5" />
              Top Banner Settings
            </CardTitle>
            <CardDescription>
              Configure the top banner message and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label htmlFor="banner_enabled">Enable Banner</Label>
                  <div className="text-sm text-gray-500">
                    Show/hide the top banner across the site
                  </div>
                </div>
                <Switch
                  id="banner_enabled"
                  checked={formData.banner_enabled}
                  onCheckedChange={(checked) => handleInputChange('banner_enabled', checked)}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="banner_slogan">Slogan</Label>
                  <Input
                    id="banner_slogan"
                    value={formData.banner_slogan}
                    onChange={(e) => handleInputChange('banner_slogan', e.target.value)}
                    placeholder="La tienda de los expertos"
                  />
                </div>

                <div>
                  <Label htmlFor="banner_contact">Contact Number</Label>
                  <Input
                    id="banner_contact"
                    value={formData.banner_contact}
                    onChange={(e) => handleInputChange('banner_contact', e.target.value)}
                    placeholder="656-123-4567"
                  />
                </div>
              </div>

              {/* Preview */}
              {formData.banner_enabled && (
                <div className="mt-4">
                  <Label>Preview:</Label>
                  <div 
                    className="mt-2 p-3 text-white text-sm rounded border"
                    style={{ backgroundColor: formData.primary_color }}
                  >
                    {formData.banner_slogan}. contáctanos al: {formData.banner_contact}
                  </div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Theme Settings */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Palette className="w-5 h-5" />
              Theme & Colors
            </CardTitle>
            <CardDescription>
              Configure the site's color scheme and visual appearance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {/* Predefined Themes */}
              <div>
                <Label className="text-base font-medium">Predefined Themes</Label>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-3 mt-3">
                  {DEFAULT_THEMES.map((theme) => (
                    <button
                      key={theme.name}
                      onClick={() => handleThemeChange(theme)}
                      className={`p-3 rounded-lg border-2 transition-all ${
                        selectedTheme === theme.name
                          ? 'border-blue-500 ring-2 ring-blue-200'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <div className="flex items-center space-x-2 mb-2">
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.primary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.secondary }}
                        />
                        <div
                          className="w-4 h-4 rounded-full"
                          style={{ backgroundColor: theme.accent }}
                        />
                      </div>
                      <div className="text-xs font-medium">{theme.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Colors */}
              <div>
                <Label className="text-base font-medium">Custom Colors</Label>
                <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-3">
                  <div>
                    <Label htmlFor="primary_color" className="text-sm">Primary</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="primary_color"
                        value={formData.primary_color}
                        onChange={(e) => {
                          handleInputChange('primary_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="w-10 h-10 rounded border"
                      />
                      <Input
                        value={formData.primary_color}
                        onChange={(e) => {
                          handleInputChange('primary_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="secondary_color" className="text-sm">Secondary</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="secondary_color"
                        value={formData.secondary_color}
                        onChange={(e) => {
                          handleInputChange('secondary_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="w-10 h-10 rounded border"
                      />
                      <Input
                        value={formData.secondary_color}
                        onChange={(e) => {
                          handleInputChange('secondary_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="accent_color" className="text-sm">Accent</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="accent_color"
                        value={formData.accent_color}
                        onChange={(e) => {
                          handleInputChange('accent_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="w-10 h-10 rounded border"
                      />
                      <Input
                        value={formData.accent_color}
                        onChange={(e) => {
                          handleInputChange('accent_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="text_color" className="text-sm">Text</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="text_color"
                        value={formData.text_color}
                        onChange={(e) => {
                          handleInputChange('text_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="w-10 h-10 rounded border"
                      />
                      <Input
                        value={formData.text_color}
                        onChange={(e) => {
                          handleInputChange('text_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="background_color" className="text-sm">Background</Label>
                    <div className="flex items-center space-x-2">
                      <input
                        type="color"
                        id="background_color"
                        value={formData.background_color}
                        onChange={(e) => {
                          handleInputChange('background_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="w-10 h-10 rounded border"
                      />
                      <Input
                        value={formData.background_color}
                        onChange={(e) => {
                          handleInputChange('background_color', e.target.value)
                          setSelectedTheme('custom')
                        }}
                        className="text-xs"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Color Preview */}
              <div>
                <Label className="text-base font-medium">Preview</Label>
                <div 
                  className="mt-3 p-4 rounded-lg border"
                  style={{ 
                    backgroundColor: formData.background_color,
                    color: formData.text_color,
                    borderColor: formData.secondary_color
                  }}
                >
                  <div 
                    className="inline-block px-4 py-2 rounded text-white mb-2"
                    style={{ backgroundColor: formData.primary_color }}
                  >
                    Primary Button
                  </div>
                  <div 
                    className="inline-block px-4 py-2 rounded text-white ml-2 mb-2"
                    style={{ backgroundColor: formData.secondary_color }}
                  >
                    Secondary Button
                  </div>
                  <div 
                    className="inline-block px-4 py-2 rounded ml-2 mb-2"
                    style={{ 
                      backgroundColor: formData.accent_color,
                      color: formData.text_color
                    }}
                  >
                    Accent Element
                  </div>
                  <p style={{ color: formData.text_color }}>
                    This is sample text with your chosen color scheme.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Company Information */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Building className="w-5 h-5" />
              Company Information
            </CardTitle>
            <CardDescription>
              Update company details and contact information
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="company_name">Company Name</Label>
                <Input
                  id="company_name"
                  value={formData.company_name}
                  onChange={(e) => handleInputChange('company_name', e.target.value)}
                  placeholder="OASA Industrial"
                />
              </div>

              <div>
                <Label htmlFor="company_email">Email</Label>
                <Input
                  id="company_email"
                  type="email"
                  value={formData.company_email}
                  onChange={(e) => handleInputChange('company_email', e.target.value)}
                  placeholder="contacto@oasa.com"
                />
              </div>

              <div>
                <Label htmlFor="company_phone">Phone</Label>
                <Input
                  id="company_phone"
                  value={formData.company_phone}
                  onChange={(e) => handleInputChange('company_phone', e.target.value)}
                  placeholder="656-123-4567"
                />
              </div>

              <div>
                <Label htmlFor="company_address">Address</Label>
                <Textarea
                  id="company_address"
                  value={formData.company_address}
                  onChange={(e) => handleInputChange('company_address', e.target.value)}
                  placeholder="Av. Industrial 123, Ciudad Industrial"
                  className="min-h-[80px]"
                />
              </div>

              <div>
                <Label htmlFor="facebook_url">Facebook URL</Label>
                <Input
                  id="facebook_url"
                  value={formData.facebook_url}
                  onChange={(e) => handleInputChange('facebook_url', e.target.value)}
                  placeholder="https://facebook.com/oasa"
                />
              </div>

              <div>
                <Label htmlFor="instagram_url">Instagram URL</Label>
                <Input
                  id="instagram_url"
                  value={formData.instagram_url}
                  onChange={(e) => handleInputChange('instagram_url', e.target.value)}
                  placeholder="https://instagram.com/oasa"
                />
              </div>

              <div>
                <Label htmlFor="twitter_url">Twitter URL</Label>
                <Input
                  id="twitter_url"
                  value={formData.twitter_url}
                  onChange={(e) => handleInputChange('twitter_url', e.target.value)}
                  placeholder="https://twitter.com/oasa"
                />
              </div>

              <div>
                <Label htmlFor="linkedin_url">LinkedIn URL</Label>
                <Input
                  id="linkedin_url"
                  value={formData.linkedin_url}
                  onChange={(e) => handleInputChange('linkedin_url', e.target.value)}
                  placeholder="https://linkedin.com/company/oasa"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={handleSave} disabled={saving} size="lg">
            <Save className="w-4 h-4 mr-2" />
            {saving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </div>
  )
}
