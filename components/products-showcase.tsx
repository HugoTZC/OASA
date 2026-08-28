"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ImageSkeleton } from "./image-skeleton"
import { ProductCard } from "./product-card"

const BACKEND_URL = '/api/backend'

interface Product {
  id: number
  name: string
  category: string
  imagepath: string
  isFeatured: boolean
  hierarchy: number
}

export function ProductsShowcase() {
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/products?limit=8`)
      const data = await response.json()
      if (data.products) {
        const featured = data.products.filter((p: Product) => p.isFeatured === true).slice(0, 4)
        setProducts(featured)
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
            <ProductCard
              key={product.id}
              product={product}
              viewMode="grid"
            />
          ))}
        </div>
      </div>
    </section>
  )
}
