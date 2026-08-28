"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/526561234567", "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-full bg-green-500 px-4 py-3 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6 shrink-0" />
      <span className="whitespace-nowrap text-sm font-medium leading-none">
        ¡Escríbenos!
      </span>
    </button>
  )
}
