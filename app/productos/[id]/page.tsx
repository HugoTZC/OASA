"use client"

export const dynamic = 'force-dynamic'

export function generateStaticParams() {
  return []
}

import { use } from "react"
import { useState, useEffect } from "react"
import { Star, ShoppingCart, Heart, ArrowLeft, Home, ChevronRight } from "lucide-react"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"
import { SiteLayout } from "@/components/site-layout"
import { ProductImage } from "@/components/dynamic-image"
import Link from "next/link"
import { productsService } from "@/lib/products"
import { Product } from "@/types/products"

export default function ProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { shouldShowPrices, shouldShowAddToCart } = useShoppingFeatures()
  
  const { id } = use(params)
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await productsService.getProduct(Number(id))
        setProduct(response)
      } catch (error) {
        console.error('Error fetching product:', error)
      } finally {
        setLoading(false)
      }
    }
    fetchProduct()
  }, [id])

  return (
    <SiteLayout>
      {/* Breadcrumb */}
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex items-center space-x-2 text-sm">
            <Link href="/" className="flex items-center text-gray-500 hover:text-blue-800">
              <Home className="w-4 h-4 mr-1" />
              Inicio
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <Link href="/productos" className="text-gray-500 hover:text-blue-800">
              Productos
            </Link>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-gray-500">{product?.category}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-blue-800 font-medium">{product?.name}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        {loading ? (
          <div className="animate-pulse">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div className="aspect-square bg-gray-200 rounded-lg"></div>
              <div className="space-y-4">
                <div className="h-8 bg-gray-200 rounded w-3/4"></div>
                <div className="h-10 bg-gray-200 rounded w-1/2"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ) : product ? (
          <>
            {/* Back button */}
            <div className="mb-6">
              <Link
                href="/productos"
                className="inline-flex items-center text-blue-800 hover:text-blue-900 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Volver a productos
              </Link>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
             {/* Product Images */}
             <div>
              <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center overflow-hidden">
                <ProductImage
                  src={product.imagepath ? `${process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '')}${product.imagepath}` : '/placeholder.svg'}
                  width={400}
                  height={400}
                  alt={product.name}
                  className="object-cover w-full h-full"
                />
              </div>
             </div>

            {/* Product Info */}
            <div>
              <div className="text-sm text-blue-800 mb-2">{product.category}</div>
              <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

              {/* Description */}
              {product.description && (
                <p className="text-gray-600 mb-6">{product.description}</p>
              )}

              {/* Features from metadata if available */}
              {product.metadata && typeof product.metadata === 'object' && product.metadata.features && Array.isArray(product.metadata.features) && (
                <div className="mb-6">
                  <h3 className="font-bold mb-3">Características:</h3>
                  <ul className="space-y-2">
                    {product.metadata.features.map((feature: string, index: number) => (
                      <li key={index} className="flex items-center">
                        <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">Producto no encontrado</p>
            <Link href="/productos" className="text-blue-800 hover:text-blue-900 mt-4 inline-block">
              Ver todos los productos
            </Link>
          </div>
        )}
      </main>
    </SiteLayout>
  )
}
