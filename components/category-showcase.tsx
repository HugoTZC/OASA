"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CategoryImage } from "./dynamic-image"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5000'

interface CategoryWithImage {
  id: string
  name: string
  description: string
  productCount: string
  href: string
  imageUrl: string | null
}

export function CategoryShowcase() {
  const [categories, setCategories] = useState<CategoryWithImage[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategoriesWithImages()
  }, [])

  const fetchCategoriesWithImages = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/api/categories`)
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.success && Array.isArray(data.categories)) {
        const categoriesWithImages = await Promise.all(
          data.categories.slice(0, 3).map(async (cat: { name: string; productCount: number }) => {
            const imageUrl = await fetchFirstProductImage(cat.name)
            return {
              id: cat.name,
              name: cat.name,
              description: "",
              productCount: `${cat.productCount} productos`,
              href: `/productos?categoria=${encodeURIComponent(cat.name)}`,
              imageUrl,
            }
          })
        )
        setCategories(categoriesWithImages)
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      setCategories([
        {
          id: "1",
          name: "Gases Industriales",
          description: "Oxígeno, argón, acetileno y más gases para uso industrial",
          productCount: "45 productos",
          href: "/productos?categoria=Gases Industriales",
          imageUrl: null,
        },
        {
          id: "2",
          name: "Equipos de Soldadura",
          description: "Soldadoras, electrodos y accesorios profesionales",
          productCount: "32 productos",
          href: "/productos?categoria=Equipos de Soldadura",
          imageUrl: null,
        },
        {
          id: "3",
          name: "Herramientas",
          description: "Herramientas manuales y eléctricas de calidad",
          productCount: "28 productos",
          href: "/productos?categoria=Herramientas",
          imageUrl: null,
        },
        {
          id: "4",
          name: "Protección Industrial",
          description: "Equipo de protección personal para industriales",
          productCount: "15 productos",
          href: "/productos?categoria=Protección Industrial",
          imageUrl: null,
        },
        {
          id: "5",
          name: "Accesorios",
          description: "Accesorios y complementos para diversas aplicaciones",
          productCount: "12 productos",
          href: "/productos?categoria=Accesorios",
          imageUrl: null,
        },
      ])
    } finally {
      setLoading(false)
    }
  }

  const fetchFirstProductImage = async (categoryName: string): Promise<string | null> => {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/products?category=${encodeURIComponent(categoryName)}&limit=1`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      const data = await response.json()
      if (data.products && data.products.length > 0 && data.products[0].imagepath) {
        const imgPath = data.products[0].imagepath
        return imgPath.startsWith('http') ? imgPath : `${BACKEND_URL}${imgPath}`
      }
      return null
    } catch (error) {
      console.error(`Failed to fetch first product for category ${categoryName}:`, error)
      return null
    }
  }

  if (loading) {
    return (
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="h-8 bg-gray-200 rounded w-64 mx-auto mb-4 animate-pulse"></div>
            <div className="h-6 bg-gray-200 rounded w-96 mx-auto animate-pulse"></div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[...Array(3)].map((_, index) => (
              <div key={index} className="bg-gray-50 rounded-lg overflow-hidden">
                <div className="aspect-video bg-gray-200 animate-pulse"></div>
                <div className="p-6 space-y-3">
                  <div className="h-6 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="flex justify-between items-center">
                    <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-4 animate-pulse"></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (categories.length === 0) {
    return null
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">Categorías Destacadas</h2>
          <p className="text-xl text-gray-600">Explora nuestras principales líneas de productos</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {categories.map((category) => (
            <Link key={category.id} href={category.href} className="group">
              <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300">
                <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                  {category.imageUrl ? (
                    <CategoryImage
                      src={category.imageUrl}
                      fallback="/placeholder.svg"
                      width={400}
                      height={200}
                      alt={category.name}
                      className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-100">
                      <span className="text-gray-400 text-sm">Sin imagen</span>
                    </div>
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2 group-hover:text-blue-800 transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-gray-600 mb-3">{category.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-blue-800 font-medium">{category.productCount}</span>
                    <ArrowRight className="w-5 h-5 text-blue-800 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}