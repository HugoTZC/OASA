"use client"

import { MessageCircle } from "lucide-react"
import { useRef, useState, type MouseEvent, type PointerEvent } from "react"
import { mexicanWhatsAppUrl, readContactNumber } from "@/lib/contact"

export function WhatsAppButton() {
  const [touchExpanded, setTouchExpanded] = useState(false)
  const touchCanceled = useRef(false)
  const ignoreClickUntil = useRef(0)

  const openWhatsApp = () => {
    window.open("https://wa.me/526561234567", "_blank")
  }

  const handlePointerDown = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") {
      touchCanceled.current = false
      setTouchExpanded(true)
      event.currentTarget.setPointerCapture(event.pointerId)
    }
  }

  const handlePointerMove = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch" && touchExpanded) {
      const bounds = event.currentTarget.getBoundingClientRect()
      const inside =
        event.clientX >= bounds.left &&
        event.clientX <= bounds.right &&
        event.clientY >= bounds.top &&
        event.clientY <= bounds.bottom

      if (!inside) {
        touchCanceled.current = true
        setTouchExpanded(false)
      }
    }
  }

  const handlePointerUp = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") {
      if (!touchCanceled.current) {
        openWhatsApp()
      }
      setTouchExpanded(false)
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handlePointerCancel = (event: PointerEvent<HTMLButtonElement>) => {
    if (event.pointerType === "touch") {
      touchCanceled.current = true
      setTouchExpanded(false)
      event.currentTarget.releasePointerCapture(event.pointerId)
    }
  }

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    if (event.detail > 0) {
      openWhatsApp()
    }
  }

  return (
    <button
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`group fixed bottom-6 right-6 z-50 h-14 overflow-visible rounded-full bg-green-500 text-white shadow-lg transition-all duration-300 ease-out md:w-14 md:hover:w-44 md:hover:bg-green-600 ${
        touchExpanded ? "w-44 bg-green-600" : "w-14"
      }`}
      aria-label="Contactar por WhatsApp"
      aria-expanded={touchExpanded}
    >
      <span className="absolute right-4 top-1/2 -translate-y-1/2">
        <MessageCircle className="h-6 w-6" />
      </span>

      <span className={`pointer-events-none absolute right-14 top-1/2 -translate-y-1/2 whitespace-nowrap text-sm font-medium transition-opacity duration-200 md:opacity-0 md:group-hover:opacity-100 ${
        touchExpanded ? "opacity-100" : "opacity-0"
      }`}>
        ¡Escríbenos!
      </span>

      <span className={`pointer-events-none absolute right-3 top-0 h-2.5 w-2.5 rounded-full bg-red-500 md:opacity-0 md:group-hover:animate-ping md:group-hover:opacity-100 ${
        touchExpanded ? "animate-ping opacity-100" : "opacity-0"
      }`} />
      <span className={`pointer-events-none absolute right-7 -top-1 h-2 w-2 rounded-full bg-red-500 md:opacity-0 md:group-hover:animate-ping md:group-hover:opacity-100 [animation-delay:200ms] ${
        touchExpanded ? "animate-ping opacity-100" : "opacity-0"
      }`} />
      <span className={`pointer-events-none absolute right-11 top-1 h-1.5 w-1.5 rounded-full bg-red-500 md:opacity-0 md:group-hover:animate-ping md:group-hover:opacity-100 [animation-delay:400ms] ${
        touchExpanded ? "animate-ping opacity-100" : "opacity-0"
      }`} />
    </button>
  )
}
