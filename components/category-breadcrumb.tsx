"use client"

import Link from "next/link"
import { ChevronRight, Home } from "lucide-react"

interface CategoryBreadcrumbProps {
  category: string
}

export function CategoryBreadcrumb({ category }: CategoryBreadcrumbProps) {
  return (
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
          {category !== "Todos los Productos" && (
            <>
              <ChevronRight className="w-4 h-4 text-gray-400" />
              <span className="text-blue-800 font-medium">{category}</span>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
