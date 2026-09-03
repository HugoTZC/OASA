"use client"

import { useState, useEffect, useCallback } from "react"
import { useRouter, usePathname, useSearchParams } from "next/navigation"
import { Search, Filter, Grid, List, ChevronDown, X } from "lucide-react"
import { CategoryBreadcrumb } from "@/components/category-breadcrumb"
import { ImageSkeleton } from "@/components/image-skeleton"
import { SiteLayout } from "@/components/site-layout"

import { useProducts, useCategories } from "@/hooks/use-products"
import { ProductFilters, Product } from "@/types/products"
import { ProductCard } from "@/components/product-card"

interface FilterSidebarProps {
  categories: Array<{ name: string; slug: string; code?: string }>
  selectedCategory: string
  setSelectedCategory: (category: string) => void
  onCategoryChange: (category: string) => void
}

function FilterSidebar({
  categories,
  selectedCategory,
  setSelectedCategory,
  onCategoryChange,
}: FilterSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
      <h3 className="font-bold text-lg mb-4">Filtros</h3>

      {/* Categories */}
      <div className="mb-6">
        <h4 className="font-semibold mb-3">Categorías</h4>
        <div className="space-y-2">
          {categories.map((category) => (
            <button
              key={category.name}
              onClick={() => onCategoryChange(category.code || category.name)}
              className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                (selectedCategory === category.name || selectedCategory === category.code) ? "bg-blue-800 text-white" : "hover:bg-gray-100"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Price Range filter commented out per client request */}
      {/* {shouldShowPrices && (
        <div className="mb-6">
          <h4 className="font-semibold mb-3">Rango de Precio</h4>
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <input
                type="number"
                placeholder="Min"
                value={priceRange[0]}
                onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
              <span>-</span>
              <input
                type="number"
                placeholder="Max"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
              />
            </div>
          </div>
        </div>
      )} */}
    </div>
  )
}

interface ProductCardProps {
  product: Product
  viewMode: "grid" | "list"
  index: number
}


export default function ProductsPage() {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const categoryParam = searchParams.get("categoria")

  const [selectedCategory, setSelectedCategory] = useState("Todos los Productos")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'created_at'>('name')
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
  const [showFilters, setShowFilters] = useState(false)
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [currentPage, setCurrentPage] = useState(1)

  const { categories } = useCategories()

  const createQueryString = useCallback((name: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString())
    if (value === null || value === "Todos los Productos") {
      params.delete(name)
    } else {
      params.set(name, value.toLowerCase().replace(/\s+/g, '-'))
    }
    return params.toString()
  }, [searchParams])

  const handleCategoryChange = (identifier: string) => {
    const category = categories.find((item) =>
      item.code === identifier ||
      item.name === identifier ||
      item.slug === identifier
    )
    const displayName = category?.name || identifier
    const filterCode = category?.code || identifier
    setSelectedCategory(displayName)
    const queryString = createQueryString("categoria", filterCode)
    router.push(`${pathname}${queryString ? `?${queryString}` : ''}`, { scroll: false })
  }

  // Build filters for API
  const selectedCategoryData = categories.find((category) => category.name === selectedCategory)

  const filters: ProductFilters = {
    page: currentPage,
    limit: 12,
    // The API must paginate by hierarchy so featured products are not left
    // on later pages when the user searches or filters by category.
    sortBy: "hierarchy",
    sortOrder: "asc",
    ...(selectedCategory !== "Todos los Productos" && { category: selectedCategoryData?.code || selectedCategory }),
    ...(searchQuery && { search: searchQuery }),
  }

  const { products, loading, error, pagination, refetch } = useProducts(filters)

  const prioritizedProducts = [...products].sort((a, b) => {
    const featuredDifference = Number(Boolean(b.isFeatured || b.hierarchy === 1)) - Number(Boolean(a.isFeatured || a.hierarchy === 1))
    if (featuredDifference !== 0) return featuredDifference

    const hierarchyA = Number.isFinite(a.hierarchy) ? a.hierarchy : Number.MAX_SAFE_INTEGER
    const hierarchyB = Number.isFinite(b.hierarchy) ? b.hierarchy : Number.MAX_SAFE_INTEGER
    if (hierarchyA !== hierarchyB) return hierarchyA - hierarchyB

    if (sortBy === "created_at") {
      return sortOrder === "desc"
        ? b.createdAt.localeCompare(a.createdAt)
        : a.createdAt.localeCompare(b.createdAt)
    }

    return sortOrder === "desc"
      ? b.name.localeCompare(a.name)
      : a.name.localeCompare(b.name)
  })

  useEffect(() => {
    if (categoryParam && categories.length > 0) {
      const category = categories.find(cat =>
        cat.code?.toLowerCase() === categoryParam.toLowerCase() ||
        cat.name.toLowerCase().replace(/\s+/g, '-') === categoryParam.toLowerCase() ||
        cat.name.toLowerCase() === categoryParam.toLowerCase()
      )
      if (category) {
        setSelectedCategory(category.name)
      } else {
        setSelectedCategory("Todos los Productos")
      }
    } else {
      setSelectedCategory("Todos los Productos")
    }
  }, [categoryParam, categories])

  useEffect(() => {
    const urlSearchParam = searchParams.get("search")
    if (urlSearchParam !== null) {
      setSearchQuery(urlSearchParam)
    }
  }, [searchParams])

  // Reset to first page when filters change
  useEffect(() => {
    setCurrentPage(1)
  }, [selectedCategory, searchQuery, sortBy, sortOrder])

  const categoriesData = [
    { name: "Todos los Productos", slug: "todos" },
    ...categories.map(cat => ({
      name: cat.name,
      code: cat.code,
      slug: cat.slug || cat.name.toLowerCase().replace(/\s+/g, '-')
    }))
  ]

  const handleSearch = (query: string) => {
    setSearchQuery(query)
    setCurrentPage(1)
  }

  const handlePageChange = (page: number) => {
    setCurrentPage(page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (loading && products.length === 0) {
    return <ProductsPageSkeleton />
  }

  return (
    <SiteLayout>
      <div className="bg-gray-50 min-h-screen">
        <CategoryBreadcrumb category={selectedCategory} />

        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <h1 className="text-2xl md:text-4xl font-bold mb-4">
                {selectedCategory === "Todos los Productos" ? "Nuestros Productos" : selectedCategory}
              </h1>
              <p className="text-lg md:text-xl mb-6 md:mb-8">
                {selectedCategory === "Todos los Productos"
                  ? "Encuentra todo lo que necesitas para tu negocio"
                  : `Explora nuestra selección de ${selectedCategory.toLowerCase()}`}
              </p>

              {/* Search Bar */}
              <div className="max-w-2xl mx-auto relative">
                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-900 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
                />
                <button className="absolute right-2 top-2 md:top-2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors">
                  <Search className="w-5 h-5 md:w-6 md:h-6" />
                </button>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            {/* Mobile Filters Overlay */}
            {showFilters && (
              <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
                <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-semibold">Filtros</h3>
                    <button onClick={() => setShowFilters(false)} className="p-2">
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                  <FilterSidebar
                    categories={categoriesData}
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                    onCategoryChange={handleCategoryChange}
                  />
                </div>
              </div>
            )}

            {/* Desktop Sidebar */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <FilterSidebar
                categories={categoriesData}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                onCategoryChange={handleCategoryChange}
              />
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Results Header */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600">
                      {pagination ? `${pagination.total} productos encontrados` : 'Cargando...'}
                    </span>
                    {error && (
                      <div className="text-red-600 text-sm">
                        Error: {error}
                        <button 
                          onClick={refetch}
                          className="ml-2 text-blue-600 hover:underline"
                        >
                          Reintentar
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="flex items-center gap-4">
                    {/* Mobile Filter Button */}
                    <button
                      onClick={() => setShowFilters(true)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
                    >
                      <Filter className="w-4 h-4" />
                      Filtros
                    </button>

                    {/* Sort Dropdown */}
                    <div className="relative">
                      <select
                        value={`${sortBy}-${sortOrder}`}
                        onChange={(e) => {
                          const [field, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder]
                          setSortBy(field)
                          setSortOrder(order)
                        }}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="name-asc">Nombre A-Z</option>
                        <option value="name-desc">Nombre Z-A</option>
                        {/* <option value="price-asc">Precio: Menor a Mayor</option>
                        <option value="price-desc">Precio: Mayor a Menor</option> */}
                        {/* Rating sort option commented out per client request */}
                        {/* <option value="rating-desc">Mejor Calificación</option> */}
                        <option value="created_at-desc">Más Recientes</option>
                      </select>
                      <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
                    </div>

                    {/* View Mode Toggle */}
                    <div className="flex border border-gray-300 rounded-md overflow-hidden">
                      <button
                        onClick={() => setViewMode("grid")}
                        className={`p-2 ${viewMode === "grid" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        <Grid className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => setViewMode("list")}
                        className={`p-2 ${viewMode === "list" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
                      >
                        <List className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Loading State */}
              {loading && products.length > 0 && (
                <div className="text-center py-4 text-gray-600">
                  Actualizando productos...
                </div>
              )}

              {/* Products Grid */}
              {products.length > 0 ? (
                <div
                  className={`grid gap-4 md:gap-6 ${
                    viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                  }`}
                >
                  {prioritizedProducts.map((product, index) => (
                    <ProductCard 
                      key={product.id} 
                      product={product} 
                      viewMode={viewMode} 
                      index={index}
                    />
                  ))}
                </div>
              ) : !loading && (
                <div className="text-center py-12">
                  <div className="text-gray-500 text-lg mb-4">
                    No se encontraron productos
                  </div>
                  <p className="text-gray-400">
                    Intenta ajustar los filtros o términos de búsqueda
                  </p>
                </div>
              )}

              {/* Pagination */}
              {pagination && pagination.totalPages > 1 && (
                <div className="flex justify-center mt-8 md:mt-12">
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Anterior
                    </button>
                    
                    {/* Page Numbers */}
                    {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
                      const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, currentPage - 2)) + i
                      if (pageNum > pagination.totalPages) return null
                      
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(pageNum)}
                          className={`px-3 py-2 md:px-4 md:py-2 rounded-md text-sm ${
                            currentPage === pageNum
                              ? "bg-blue-800 text-white"
                              : "border border-gray-300 hover:bg-gray-50"
                          }`}
                        >
                          {pageNum}
                        </button>
                      )
                    })}
                    
                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.totalPages}
                      className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
                    >
                      Siguiente
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}

function ProductsPageSkeleton() {
  return (
    <SiteLayout>
      <div className="bg-gray-50 min-h-screen">
        <div className="bg-white border-b border-gray-200 py-3">
          <div className="container mx-auto px-4">
            <div className="flex items-center space-x-2 text-sm">
              <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
              <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
            </div>
          </div>
        </div>

        <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 md:py-12">
          <div className="container mx-auto px-4">
            <div className="text-center">
              <div className="h-8 bg-blue-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
              <div className="h-6 bg-blue-700 rounded w-96 mx-auto mb-8 animate-pulse"></div>
              <div className="max-w-2xl mx-auto">
                <div className="h-12 bg-white rounded-full animate-pulse"></div>
              </div>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-6 md:py-8">
          <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
                <div className="space-y-2">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
                  ))}
                </div>
              </div>
            </aside>

            <div className="flex-1">
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex justify-between items-center">
                  <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                  <div className="flex gap-4">
                    <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
                    <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <ImageSkeleton className="aspect-square" />
                    <div className="p-3 md:p-4 space-y-3">
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
                      <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </SiteLayout>
  )
}
