"use client"

import type React from "react"

import { useState } from "react"
import { Mail } from "lucide-react"

export function NewsletterSection() {
  const [email, setEmail] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle newsletter subscription
    console.log("Newsletter subscription:", email)
    setEmail("")
  }

  return (
    <section className="py-16 bg-blue-800 text-white">
      <div className="container mx-auto px-4 text-center">
        <Mail className="w-12 h-12 mx-auto mb-4" />
        <h2 className="text-3xl font-bold mb-4">Mantente Informado</h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Suscríbete a nuestro boletín y recibe las últimas ofertas y novedades directamente en tu correo.
        </p>

        <form onSubmit={handleSubmit} className="max-w-md mx-auto flex gap-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Tu correo electrónico"
            className="flex-1 px-4 py-3 rounded-md text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
            required
          />
          <button
            type="submit"
            className="bg-yellow-400 text-black px-6 py-3 rounded-md font-bold hover:bg-yellow-300 transition-colors"
          >
            Suscribirse
          </button>
        </form>
      </div>
    </section>
  )
}
