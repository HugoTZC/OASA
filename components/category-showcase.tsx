"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"
import { CategoryImage } from "./dynamic-image"
import type { CategoryShowcase as CategoryShowcaseType } from "@/types/admin"

export function CategoryShowcase() {
  const [categories, setCategories] = useState<CategoryShowcaseType[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchCategories()
  }, [])

  const fetchCategories = async () => {
    try {
      const response = await fetch("/api/admin/category-showcase")
      const data = await response.json()
      if (data.success) {
        setCategories(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch categories:", error)
      // Fallback to static data if API fails
      setCategories([
        {
          id: "1",
          name: "Gases Industriales",
          description: "Oxígeno, argón, acetileno y más gases para uso industrial",
          productCount: "500+ productos",
          image: "/placeholder.svg?height=200&width=300",
          href: "/productos?categoria=Gases Industriales",
          order: 1,
          isActive: true,
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "2",
          name: "Equipos de Soldadura",
          description: "Soldadoras, electrodos y accesorios profesionales",
          productCount: "300+ productos",
          image: "/placeholder.svg?height=200&width=300",
          href: "/productos?categoria=Equipos de Soldadura",
          order: 2,
          isActive: true,
          createdAt: "",
          updatedAt: "",
        },
        {
          id: "3",
          name: "Herramientas",
          description: "Herramientas manuales y eléctricas de calidad",
          productCount: "800+ productos",
          image: "/placeholder.svg?height=200&width=300",
          href: "/productos?categoria=Herramientas",
          order: 3,
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
    return null // Don't render section if no categories
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
                  <CategoryImage
                    category={category.name.toLowerCase().replace(/\s+/g, '-')}
                    width={300}
                    height={200}
                    alt={category.name}
                    className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
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
