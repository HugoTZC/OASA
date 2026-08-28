"use client"

import { MessageCircle } from "lucide-react"

export function WhatsAppButton() {
  const handleWhatsAppClick = () => {
    window.open("https://wa.me/526561234567", "_blank")
  }

  return (
    <button
      onClick={handleWhatsAppClick}
      className="group fixed bottom-6 right-6 z-50 h-14 w-14 overflow-visible rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 ease-out hover:w-44 hover:bg-green-600"
      aria-label="Contactar por WhatsApp"
    >
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        <MessageCircle className="h-6 w-6" />
      </span>

      <span className="pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium opacity-0 transition-opacity duration-200 group-hover:opacity-100">
        ¡Escríbenos!
      </span>

      <span className="pointer-events-none absolute right-3 top-0 h-2.5 w-2.5 rounded-full bg-red-500 opacity-0 group-hover:animate-ping group-hover:opacity-100" />
      <span className="pointer-events-none absolute right-7 -top-1 h-2 w-2 rounded-full bg-red-500 opacity-0 group-hover:animate-ping group-hover:opacity-100 [animation-delay:200ms]" />
      <span className="pointer-events-none absolute right-11 top-1 h-1.5 w-1.5 rounded-full bg-red-500 opacity-0 group-hover:animate-ping group-hover:opacity-100 [animation-delay:400ms]" />
    </button>
  )
}
