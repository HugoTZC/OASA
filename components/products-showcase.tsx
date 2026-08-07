"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { ProductImage } from "./dynamic-image"
import { ImageSkeleton } from "./image-skeleton"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"

interface FeaturedProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5000'

export function ProductsShowcase() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { shouldShowPrices } = useShoppingFeatures()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/admin/featured-products`)
      const data = await response.json()
      if (data.success && data.data) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch featured products:", error)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return (
      <section className="py-8 md:py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <div className="h-8 bg-gray-200 rounded w-48 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[...Array(4)].map((_, index) => (
              <div key={index} className="bg-white border border-gray-200 rounded-lg overflow-hidden">
                <ImageSkeleton className="aspect-square" />
                <div className="p-4 space-y-3">
                  <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                  <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (products.length === 0) {
    return null
  }

  return (
    <section className="py-8 md:py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Productos Destacados</h2>
          <Link href="/productos" className="text-blue-800 hover:underline font-medium">
            Ver Todos
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <Link key={product.id} href={`/productos/${product.id}`} className="group">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-square bg-white flex items-center justify-center overflow-hidden relative">
                  <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-yellow-500 z-10 drop-shadow-sm" />
                  <ProductImage
                    src={product.image}
                    width={200}
                    height={200}
                    alt={product.name}
                    className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-800 font-medium">{product.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-800 line-clamp-2">
                    {product.name}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
