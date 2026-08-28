"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/526561234567", "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="fixed bottom-6 right-6 z-50 rounded-full bg-green-500 p-4 text-white shadow-lg transition-colors duration-200 hover:bg-green-600"
      aria-label="Contactar por WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
      <span className="absolute -left-2 -top-2 rounded-full bg-red-500 px-2 py-1 text-xs font-medium leading-none text-white whitespace-nowrap">
        ¡Escríbenos!
      </span>
    </button>
  )
}
