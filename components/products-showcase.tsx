"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Star } from "lucide-react"
import { ProductImage } from "./dynamic-image"
import { ImageSkeleton } from "./image-skeleton"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"
import type { FeaturedProduct } from "@/types/admin"

export function ProductsShowcase() {
  const [products, setProducts] = useState<FeaturedProduct[]>([])
  const [loading, setLoading] = useState(true)
  const { shouldShowPrices } = useShoppingFeatures()

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    try {
      const response = await fetch("/api/admin/featured-products")
      const data = await response.json()
      if (data.success) {
        setProducts(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch products:", error)
      // Fallback to static data if API fails
      setProducts([
        {
          id: "1",
          name: "Tanque de Oxígeno",
          category: "Gases",
          price: 1250.0,
          image: "/placeholder.svg?height=200&width=200",
          href: "/productos/tanque-oxigeno",
          order: 1,
          isActive: true,
          createdAt: "",
          updatedAt: "",
        },
      ])
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
          {products.map((product, index) => (
            <Link key={product.id} href={product.href} className="group">
              <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200">
                <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden relative">
                  {/* Featured product star */}
                  <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-yellow-500 z-10 drop-shadow-sm" />
                  <ProductImage
                    productId={product.id}
                    width={200}
                    height={200}
                    alt={product.name}
                    className="object-contain group-hover:scale-105 transition-transform duration-200"
                    priority={index < 2}
                    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 25vw, 20vw"
                  />
                </div>
                <div className="p-4">
                  <span className="text-xs text-blue-800 font-medium">{product.category}</span>
                  <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-800 line-clamp-2">
                    {product.name}
                  </h3>
                  {/* Price section commented out per client request */}
                  {/* {shouldShowPrices && (
                    <div className="mt-2">
                      <span className="text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
                      {product.originalPrice && (
                        <span className="ml-2 text-sm text-gray-500 line-through">
                          ${product.originalPrice.toLocaleString()}
                        </span>
                      )}
                    </div>
                  )} */}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}
