"use client"

import { Star, ShoppingCart, Heart, ArrowLeft, Home, ChevronRight } from "lucide-react"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"
import { SiteLayout } from "@/components/site-layout"
import { ProductImage } from "@/components/dynamic-image"
import { useProductImages } from "@/hooks/use-images"
import Link from "next/link"

export default function ProductPage({ params }: { params: { slug: string } }) {
  const { shouldShowPrices, shouldShowAddToCart } = useShoppingFeatures()
  
  // Extract product ID from slug (you can implement your own logic)
  const productId = params.slug.includes('tanque') ? 1 : 
                   params.slug.includes('soldadora') ? 2 : 
                   params.slug.includes('herramientas') ? 3 : 1
  
  // Get product images from API
  const { images: productImages, loading: imagesLoading } = useProductImages(productId, { 
    count: 3, 
    size: '400' 
  })
  
  // Mock product data - in real app this would come from API/database
  const product = {
    name: "Tanque de Oxígeno Industrial",
    price: "$1,250.00",
    originalPrice: "$1,400.00",
    rating: 4.5,
    reviews: 23,
    description:
      "Tanque de oxígeno de alta calidad para uso industrial y médico. Fabricado con materiales resistentes y certificado para uso profesional.",
    features: [
      "Capacidad: 50 litros",
      "Presión máxima: 200 bar",
      "Material: Acero al carbono",
      "Certificación: ISO 9001",
      "Garantía: 2 años",
    ],
    inStock: true,
    category: "Gases Industriales",
  }

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
            <span className="text-gray-500">{product.category}</span>
            <ChevronRight className="w-4 h-4 text-gray-400" />
            <span className="text-blue-800 font-medium">{product.name}</span>
          </div>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
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
          <div className="aspect-square bg-gray-100 rounded-lg mb-4 flex items-center justify-center">
            {imagesLoading ? (
              <div className="flex items-center justify-center">
                <div className="w-8 h-8 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
              </div>
            ) : Array.isArray(productImages) && productImages.length > 0 ? (
              <ProductImage
                productId={productId}
                width={400}
                height={400}
                alt={product.name}
                className="object-contain"
              />
            ) : (
              <ProductImage
                productId={productId}
                width={400}
                height={400}
                alt={product.name}
                className="object-contain"
                fallback="/placeholder.svg"
              />
            )}
          </div>
          <div className="grid grid-cols-3 gap-4">
            {imagesLoading ? (
              // Loading skeletons
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-200 rounded-lg animate-pulse"
                />
              ))
            ) : Array.isArray(productImages) && productImages.length > 0 ? (
              // Render actual images from API
              productImages.slice(0, 3).map((image, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 overflow-hidden"
                >
                  <ProductImage
                    productId={productId}
                    variant={`alt-${index}`}
                    width={100}
                    height={100}
                    alt={`${product.name} ${index + 1}`}
                    className="object-contain"
                  />
                </div>
              ))
            ) : (
              // Fallback - generate different variants
              Array.from({ length: 3 }).map((_, index) => (
                <div
                  key={index}
                  className="aspect-square bg-gray-100 rounded-lg flex items-center justify-center cursor-pointer hover:ring-2 hover:ring-blue-500 overflow-hidden"
                >
                  <ProductImage
                    productId={productId}
                    variant={`alt-${index}`}
                    width={100}
                    height={100}
                    alt={`${product.name} ${index + 1}`}
                    className="object-contain"
                    fallback="/placeholder.svg"
                  />
                </div>
              ))
            )}
          </div>
        </div>

        {/* Product Info */}
        <div>
          <div className="text-sm text-blue-800 mb-2">{product.category}</div>
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>

          {/* Rating */}
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`w-5 h-5 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                />
              ))}
            </div>
            <span className="ml-2 text-gray-600">({product.reviews} reseñas)</span>
          </div>

          {/* Price */}
          {shouldShowPrices && (
            <div className="mb-6">
              <span className="text-3xl font-bold text-gray-900">{product.price}</span>
              {product.originalPrice && (
                <span className="ml-2 text-lg text-gray-500 line-through">{product.originalPrice}</span>
              )}
            </div>
          )}

          {/* Description */}
          <p className="text-gray-600 mb-6">{product.description}</p>

          {/* Features */}
          <div className="mb-6">
            <h3 className="font-bold mb-3">Características:</h3>
            <ul className="space-y-2">
              {product.features.map((feature, index) => (
                <li key={index} className="flex items-center">
                  <span className="w-2 h-2 bg-blue-800 rounded-full mr-3"></span>
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Actions */}
          {/* <div className="flex space-x-4 mb-6">
            {shouldShowAddToCart && (
              <button className="flex-1 bg-blue-800 text-white py-3 px-6 rounded-md hover:bg-blue-900 transition-colors flex items-center justify-center">
                <ShoppingCart className="w-5 h-5 mr-2" />
                Agregar al Carrito
              </button>
            )}
            <button className="p-3 border border-gray-300 rounded-md hover:bg-gray-50 transition-colors">
              <Heart className="w-5 h-5" />
            </button>
          </div> */}

          {/* Stock Status */}
          <div className="text-sm">
            {product.inStock ? (
              <span className="text-green-600">✓ En stock - Envío inmediato</span>
            ) : (
              <span className="text-red-600">✗ Agotado</span>
            )}
          </div>          </div>
        </div>
      </main>
    </SiteLayout>
  )
}
