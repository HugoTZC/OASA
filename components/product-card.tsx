"use client"

import Link from "next/link"
import { Star } from "lucide-react"
import { ProductImage } from "@/components/dynamic-image"

export interface ProductCardProduct {
  id: number
  name: string
  sku?: string
  description?: string
  imagepath?: string | null
  hierarchy: number
}

interface ProductCardProps {
  product: ProductCardProduct
  viewMode: "grid" | "list"
  index?: number
}

export function ProductCard({ product, viewMode }: ProductCardProps) {

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
        <div className="flex">
          <div className="w-48 h-48 relative flex-shrink-0 bg-white">
            {/* Featured product star for list view */}
            {product.hierarchy === 1 && (
              <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-yellow-500 z-10 drop-shadow-sm" />
            )}
            <Link href={`/productos/${product.id}`}>
              <ProductImage
                src={product.imagepath}
                width={200}
                height={200}
                alt={product.name}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
              />
            </Link>
          </div>
          <div className="flex-1 p-6">
            <div className="flex justify-between items-start">
              <div className="flex-1">
                <span className="text-sm text-blue-800 font-medium">{product.sku || "SKU no disponible"}</span>
                <h3 className="font-semibold text-xl text-gray-900 mt-1 group-hover:text-blue-800">
                  <Link href={`/productos/${product.id}`}>{product.name}</Link>
                </h3>
                
                {/* Rating section commented out per client request */}
                {/* <div className="flex items-center mt-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                      />
                    ))}
                  </div>
                  <span className="ml-1 text-sm text-gray-600">({product.reviewCount})</span>
                </div> */}
                
                {product.description && (
                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">{product.description}</p>
                )}
              </div>
              
              <div className="text-right ml-4">
                {/* Price section commented out per client request */}
                {/* {shouldShowPrices && (
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="ml-2 text-lg text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                )} */}
                
                {/* Shopping features commented out per client request */}
                {/* {shouldShowAddToCart && (
                  <button
                    disabled={!product.inStock}
                    className="bg-blue-800 text-white py-2 px-6 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center gap-2"
                  >
                    <ShoppingCart className="w-4 h-4" />
                    {product.inStock ? "Agregar al Carrito" : "Agotado"}
                  </button>
                )} */}
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="h-full bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group flex flex-col">
      {/* Product Badges - commented out per client request */}
      <div className="relative">
        {/* Featured product star */}
        {product.hierarchy === 1 && (
          <Star className="absolute top-2 right-2 w-5 h-5 text-yellow-500 fill-yellow-500 z-10 drop-shadow-sm" />
        )}
        {/* {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Nuevo
          </span>
        )}
        {product.isOnSale && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Oferta
          </span>
        )} */}
        {/* {!product.inStock && (
          <span className="absolute top-2 left-2 bg-gray-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Agotado
          </span>
        )} */}
        
        <Link href={`/productos/${product.id}`}>
            <div className="aspect-square bg-white flex items-center justify-center overflow-hidden">
              <ProductImage
                src={product.imagepath}
                width={300}
                height={300}
                alt={product.name}
                className="object-contain w-full h-full group-hover:scale-105 transition-transform duration-200"
              />
            </div>
        </Link>
      </div>
      
      <div className="p-3 md:p-4 min-h-[92px] flex-1">
        <span className="text-xs text-blue-800 font-medium">{product.sku || "SKU no disponible"}</span>
        <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-800 text-sm md:text-base line-clamp-2">
          <Link href={`/productos/${product.id}`}>{product.name}</Link>
        </h3>

        {/* Rating section commented out per client request */}
        {/* <div className="flex items-center mt-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-600">({product.reviewCount})</span>
        </div> */}

        <div className="mb-3">
          {/* Price section commented out per client request */}
          {/* {shouldShowPrices && (
            <>
              <span className="text-base md:text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </>
          )} */}
        </div>

        {/* Shopping features commented out per client request */}
        {/* {shouldShowAddToCart && (
          <button
            disabled={!product.inStock}
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Agregar al Carrito" : "Agotado"}
          </button>
        )} */}
      </div>
    </div>
  )
}

