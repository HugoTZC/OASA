"use client"

import { useState, useEffect } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, ChevronDown, X } from "lucide-react"
import { CategoryBreadcrumb } from "@/components/category-breadcrumb"
import { ProductImage } from "@/components/dynamic-image"
import { ImageSkeleton } from "@/components/image-skeleton"
import { SiteLayout } from "@/components/site-layout"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"

// Mock product data
const products = [
  {
    id: 1,
    name: "Tanque de Oxígeno Industrial 50L",
    category: "Gases Industriales",
    price: 1250.0,
    originalPrice: 1400.0,
    rating: 4.5,
    reviews: 23,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 2,
    name: "Soldadora MIG/MAG 200A",
    category: "Equipos de Soldadura",
    price: 8500.0,
    originalPrice: null,
    rating: 4.8,
    reviews: 45,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: 3,
    name: "Kit Herramientas Mecánico 150 Pzs",
    category: "Herramientas",
    price: 2100.0,
    originalPrice: 2400.0,
    rating: 4.3,
    reviews: 67,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    isNew: false,
    isSale: true,
  },
  {
    id: 4,
    name: "Filtro de Aceite Universal",
    category: "Autopartes",
    price: 180.0,
    originalPrice: null,
    rating: 4.1,
    reviews: 89,
    image: "/placeholder.svg?height=300&width=300",
    inStock: false,
    isNew: false,
    isSale: false,
  },
  {
    id: 5,
    name: "Regulador de Presión Argón",
    category: "Gases Industriales",
    price: 950.0,
    originalPrice: null,
    rating: 4.6,
    reviews: 34,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    isNew: true,
    isSale: false,
  },
  {
    id: 6,
    name: "Compresor de Aire 100L",
    category: "Equipos Neumáticos",
    price: 12500.0,
    originalPrice: 14000.0,
    rating: 4.7,
    reviews: 28,
    image: "/placeholder.svg?height=300&width=300",
    inStock: true,
    isNew: false,
    isSale: true,
  },
]

const categoriesData = [
  {
    name: "Gases Industriales",
    description: "Oxígeno, acetileno, argón y más gases para uso industrial",
    image: "/placeholder.svg?height=200&width=300",
    products: ["Oxígeno", "Acetileno", "Argón", "CO2", "Nitrógeno"],
  },
  {
    name: "Autopartes",
    description: "Repuestos y accesorios para todo tipo de vehículos",
    image: "/placeholder.svg?height=200&width=300",
    products: ["Frenos", "Suspensión", "Motor", "Transmisión", "Eléctrico"],
  },
  {
    name: "Herramientas",
    description: "Herramientas profesionales para todos los oficios",
    image: "/placeholder.svg?height=200&width=300",
    products: ["Manuales", "Eléctricas", "Neumáticas", "Medición", "Corte"],
  },
  {
    name: "Equipos de Soldadura",
    description: "Equipos y consumibles para soldadura profesional",
    image: "/placeholder.svg?height=200&width=300",
    products: ["Soldadoras", "Electrodos", "Alambres", "Caretas", "Accesorios"],
  },
]

const sortOptions = [
  { value: "featured", label: "Destacados" },
  { value: "price-low", label: "Precio: Menor a Mayor" },
  { value: "price-high", label: "Precio: Mayor a Menor" },
  { value: "name", label: "Nombre A-Z" },
  { value: "rating", label: "Mejor Calificados" },
  { value: "newest", label: "Más Recientes" },
]

export default function ProductosPage() {
  const searchParams = useSearchParams()
  const categoryParam = searchParams.get("categoria")
  const { shouldShowPrices } = useShoppingFeatures()

  const [selectedCategory, setSelectedCategory] = useState("Todos los Productos")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)
  const [priceRange, setPriceRange] = useState([0, 20000])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  // Set initial category from URL parameter
  useEffect(() => {
    if (categoryParam && categoriesData.some((cat) => cat.name === categoryParam)) {
      setSelectedCategory(categoryParam)
    }
    setIsLoading(false)
  }, [categoryParam])

  const filteredProducts = products.filter((product) => {
    const matchesCategory = selectedCategory === "Todos los Productos" || product.category === selectedCategory
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesPrice = shouldShowPrices ? product.price >= priceRange[0] && product.price <= priceRange[1] : true
    return matchesCategory && matchesSearch && matchesPrice
  })

  const categories = categoriesData.map((cat) => cat.name)

  return (
    <SiteLayout>
      <main className="bg-gray-50 min-h-screen">
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
                  onChange={(e) => setSearchQuery(e.target.value)}
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
                <div className="bg-white w-80 h-full overflow-y-auto">
                  <div className="p-4 border-b border-gray-200 flex justify-between items-center">
                    <h3 className="font-bold text-lg">Filtros</h3>
                    <button onClick={() => setShowFilters(false)}>
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                  <div className="p-4">
                    {/* Categories */}
                    <div className="mb-6">
                      <h4 className="font-semibold mb-3">Categorías</h4>
                      <div className="space-y-2">
                        {categories.map((category) => (
                          <button
                            key={category}
                            onClick={() => {
                              setSelectedCategory(category)
                              setShowFilters(false)
                            }}
                            className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
                              selectedCategory === category ? "bg-blue-800 text-white" : "hover:bg-gray-100"
                            }`}
                          >
                            {category}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Price Range */}
                    {shouldShowPrices && (
                      <div className="mb-6">
                        <h4 className="font-semibold mb-3">Rango de Precio</h4>
                        <div className="space-y-3">
                          <div className="flex items-center gap-2">
                            <input
                              type="number"
                              placeholder="Min"
                              value={priceRange[0]}
                              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                            <span>-</span>
                            <input
                              type="number"
                              placeholder="Max"
                              value={priceRange[1]}
                              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Desktop Sidebar Filters */}
            <aside className="hidden lg:block lg:w-64 flex-shrink-0">
              <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
                <h3 className="font-bold text-lg mb-4">Filtros</h3>

                {/* Categories */}
                <div className="mb-6">
                  <h4 className="font-semibold mb-3">Categorías</h4>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
                          selectedCategory === category ? "bg-blue-800 text-white" : "hover:bg-gray-100"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Price Range */}
                {shouldShowPrices && (
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
                )}
              </div>
            </aside>

            {/* Main Content */}
            <div className="flex-1">
              {/* Toolbar */}
              <div className="bg-white rounded-lg shadow-md p-4 mb-6">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-sm md:text-base">
                      {filteredProducts.length} productos encontrados
                    </span>
                    <button
                      onClick={() => setShowFilters(!showFilters)}
                      className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
                    >
                      <Filter className="w-4 h-4" />
                      Filtros
                    </button>
                  </div>

                  <div className="flex items-center gap-4 w-full sm:w-auto">
                    {/* Sort Dropdown */}
                    <div className="relative flex-1 sm:flex-none">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
                      >
                        {sortOptions.map((option) => (
                          <option key={option.value} value={option.value}>
                            {option.label}
                          </option>
                        ))}
                      </select>
                      <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
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

              {/* Products Grid */}
              <div
                className={`grid gap-4 md:gap-6 ${
                  viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
                }`}
              >
                {filteredProducts.map((product, index) => (
                  <ProductCard key={product.id} product={product} viewMode={viewMode} index={index} />
                ))}
              </div>

              {/* Pagination */}
              <div className="flex justify-center mt-8 md:mt-12">
                <div className="flex items-center space-x-2">
                  <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm">
                    Anterior
                  </button>
                  <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-800 text-white rounded-md text-sm">1</button>
                  <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    2
                  </button>
                  <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    3
                  </button>
                  <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
                    Siguiente
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </SiteLayout>
  )
}

function ProductCard({ product, viewMode, index }: { product: any; viewMode: "grid" | "list"; index: number }) {
  const [isFavorite, setIsFavorite] = useState(false)
  const { shouldShowPrices, shouldShowAddToCart, isShoppingEnabled } = useShoppingFeatures()

  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
        <div className="flex flex-col sm:flex-row">
          <div className="w-full sm:w-48 h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
            {product.isNew && (
              <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Nuevo
              </span>
            )}
            {product.isSale && (
              <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
                Oferta
              </span>
            )}
            <ProductImage
              productId={product.id}
              width={200}
              height={200}
              alt={product.name}
              className="object-contain"
              priority={index < 4}
              sizes="(max-width: 640px) 100vw, 200px"
            />
          </div>
          <div className="flex-1 p-4 md:p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
              <div className="flex-1">
                <span className="text-sm text-blue-800 font-medium">{product.category}</span>
                <h3 className="font-semibold text-base md:text-lg text-gray-900 hover:text-blue-800">
                  <Link href={`/productos/${product.id}`}>{product.name}</Link>
                </h3>
              </div>
              <button
                onClick={() => setIsFavorite(!isFavorite)}
                className={`p-2 rounded-full mt-2 sm:mt-0 ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
              >
                <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
              </button>
            </div>

            <div className="flex items-center mb-3">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              {shouldShowPrices && (
                <div>
                  <span className="text-xl md:text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <span className="ml-2 text-base md:text-lg text-gray-500 line-through">
                      ${product.originalPrice.toLocaleString()}
                    </span>
                  )}
                </div>
              )}
              {shouldShowAddToCart && (
                <button
                  disabled={!product.inStock}
                  className="w-full sm:w-auto bg-blue-800 text-white px-4 md:px-6 py-2 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
                >
                  <ShoppingCart className="w-4 h-4" />
                  {product.inStock ? "Agregar" : "Agotado"}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
      <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
        {product.isNew && (
          <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Nuevo
          </span>
        )}
        {product.isSale && (
          <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
            Oferta
          </span>
        )}
        <button
          onClick={() => setIsFavorite(!isFavorite)}
          className={`absolute ${product.isSale ? "top-10" : "top-2"} right-2 p-2 rounded-full bg-white shadow-md ${
            isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
          } z-10`}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
        </button>
        <Link href={`/productos/${product.id}`}>
          <ProductImage
            productId={product.id}
            width={300}
            height={300}
            alt={product.name}
            className="object-contain group-hover:scale-105 transition-transform duration-200"
            priority={index < 8}
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        </Link>
      </div>
      <div className="p-3 md:p-4">
        <span className="text-xs text-blue-800 font-medium">{product.category}</span>
        <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-800 text-sm md:text-base line-clamp-2">
          <Link href={`/productos/${product.id}`}>{product.name}</Link>
        </h3>

        <div className="flex items-center mt-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
              />
            ))}
          </div>
          <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
        </div>

        <div className="mb-3">
          {shouldShowPrices && (
            <>
              <span className="text-base md:text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
              )}
            </>
          )}
        </div>

        {shouldShowAddToCart && (
          <button
            disabled={!product.inStock}
            className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
          >
            <ShoppingCart className="w-4 h-4" />
            {product.inStock ? "Agregar al Carrito" : "Agotado"}
          </button>
        )}
      </div>
    </div>
  )
}

function ProductsPageSkeleton() {
  return (
    <main className="bg-gray-50 min-h-screen">
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
    </main>
  )
}
