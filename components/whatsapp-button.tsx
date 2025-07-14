"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/526561234567", "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 text-white p-4 rounded-full shadow-lg transition-colors duration-200 z-50"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="absolute -top-2 -left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full whitespace-nowrap">
        ¡Escríbenos!
      </span>
    </button>
  )
}
