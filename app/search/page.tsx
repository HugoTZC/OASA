"use client"

import { useState } from "react"
import { Search } from "lucide-react"
import { SiteLayout } from "@/components/site-layout"

export default function SearchPage() {
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <SiteLayout>
      <div className="container mx-auto px-4 py-8">
      <div className="text-center py-16">
        <h1 className="text-3xl font-bold mb-4">El producto que estas buscando aun no esta en web.</h1>
        <p className="text-gray-600 mb-8">Por favor contactanos al 686 518 4283 para mas información.</p>

        <div className="max-w-md mx-auto mb-8">
          <div className="relative">
            <input
              type="text"
              placeholder="Buscando en tienda..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button className="absolute right-0 top-0 h-full px-4 bg-blue-800 text-white rounded-r-md hover:bg-blue-900">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        <a href="/" className="text-blue-800 hover:underline font-medium">
          Haz clic aquí para seguir comprando
        </a>
      </div>
      </div>
    </SiteLayout>
  )
}
