"use client"

import Link from "next/link"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"
import { ShoppingCart } from "lucide-react"

export default function CartPage() {
  const { isShoppingEnabled, shouldShowCart, getShoppingModeText } = useShoppingFeatures()

  if (!isShoppingEnabled || !shouldShowCart) {
    return (
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Carrito de Compras No Disponible</h1>
          <p className="text-lg text-gray-600 mb-6">
            El carrito de compras está deshabilitado actualmente. El sitio está funcionando en modo "{getShoppingModeText()}".
          </p>
          <Link 
            href="/productos"
            className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors inline-block"
          >
            Ver Catálogo de Productos
          </Link>
        </div>
      </main>
    )
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <ShoppingCart className="w-16 h-16 mx-auto text-gray-400 mb-4" />
        <p className="text-xl text-gray-600 mb-4">Tu carrito está vacío</p>
        <Link 
          href="/productos"
          className="bg-blue-800 text-white px-6 py-3 rounded-md hover:bg-blue-900 transition-colors inline-block"
        >
          Continuar Comprando
        </Link>
      </div>
    </main>
  )
}
