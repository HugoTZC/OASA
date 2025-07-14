export interface SiteSettings {
  // Banner settings
  banner_slogan: string
  banner_contact: string
  banner_enabled: boolean
  
  // Theme settings
  primary_color: string
  secondary_color: string
  accent_color: string
  text_color: string
  background_color: string
  
  // Company information
  company_name: string
  company_email: string
  company_phone: string
  company_address: string
  
  // Social media
  facebook_url?: string
  twitter_url?: string
  instagram_url?: string
  linkedin_url?: string
}

export interface ColorTheme {
  name: string
  label: string
  primary: string
  secondary: string
  accent: string
  text: string
  background: string
}

export const DEFAULT_THEMES: ColorTheme[] = [
  {
    name: 'blue',
    label: 'Blue (Default)',
    primary: '#1e40af', // blue-800
    secondary: '#3b82f6', // blue-500
    accent: '#fbbf24', // yellow-400
    text: '#111827', // gray-900
    background: '#ffffff'
  },
  {
    name: 'green',
    label: 'Green',
    primary: '#166534', // green-800
    secondary: '#22c55e', // green-500
    accent: '#f59e0b', // amber-500
    text: '#111827',
    background: '#ffffff'
  },
  {
    name: 'purple',
    label: 'Purple',
    primary: '#6b21a8', // purple-800
    secondary: '#a855f7', // purple-500
    accent: '#f59e0b', // amber-500
    text: '#111827',
    background: '#ffffff'
  },
  {
    name: 'red',
    label: 'Red',
    primary: '#991b1b', // red-800
    secondary: '#ef4444', // red-500
    accent: '#fbbf24', // yellow-400
    text: '#111827',
    background: '#ffffff'
  },
  {
    name: 'dark',
    label: 'Dark Mode',
    primary: '#1f2937', // gray-800
    secondary: '#4b5563', // gray-600
    accent: '#f59e0b', // amber-500
    text: '#f9fafb', // gray-50
    background: '#111827' // gray-900
  }
]
