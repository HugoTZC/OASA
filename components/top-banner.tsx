"use client"

import { Mail, X } from "lucide-react"
import { useState } from "react"
import { useSiteSettingsContext } from "@/contexts/site-settings-context"

export function TopBanner() {
  const [isVisible, setIsVisible] = useState(true)
  const { getSetting, themeColors } = useSiteSettingsContext()

  const bannerEnabled = getSetting('banner_enabled', true)
  const bannerSlogan = getSetting('banner_slogan', 'La tienda de los expertos')
  const bannerContact = getSetting('banner_contact', '656-123-4567')

  if (!isVisible || !bannerEnabled) return null

  return (
    <div 
      className="text-white py-1 sm:py-2 px-2 sm:px-4 relative"
      style={{ backgroundColor: themeColors.primary }}
    >
      <div className="container mx-auto flex flex-col sm:flex-row justify-between items-center text-xs sm:text-sm min-w-0">
        <span className="text-center sm:text-left mb-1 sm:mb-0 px-1 leading-tight">
          {bannerSlogan}. contáctanos al: {bannerContact}
        </span>
        <button className="flex items-center gap-1 sm:gap-2 hover:underline text-xs sm:text-sm">
          <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Suscríbete</span>
          <span className="sm:hidden">Email</span>
        </button>
        <button onClick={() => setIsVisible(false)} className="absolute top-0.5 right-1 sm:hidden">
          <X className="w-3 h-3" />
        </button>
      </div>
    </div>
  )
}
