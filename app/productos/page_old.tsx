// "use client"

// import { useState, useEffect } from "react"
// import { useSearchParams } from "next/navigation"
// import Link from "next/link"
// import { Search, Filter, Grid, List, Star, ShoppingCart, Heart, ChevronDown, X } from "lucide-react"
// import { CategoryBreadcrumb } from "@/components/category-breadcrumb"
// import { ProductImage } from "@/components/dynamic-image"
// import { ImageSkeleton } from "@/components/image-skeleton"
// import { SiteLayout } from "@/components/site-layout"
// import { useShoppingFeatures } from "@/hooks/use-shopping-features"
// import { useProducts, useCategories } from "@/hooks/use-products"
// import { ProductFilters } from "@/types/products"

// export default function ProductsPage() {
//   const searchParams = useSearchParams()
//   const categoryParam = searchParams.get("categoria")
  
//   const [selectedCategory, setSelectedCategory] = useState("Todos los Productos")
//   const [searchQuery, setSearchQuery] = useState("")
//   const [sortBy, setSortBy] = useState<'name' | 'price' | 'rating' | 'created_at'>('name')
//   const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')
//   const [priceRange, setPriceRange] = useState([0, 10000])
//   const [showFilters, setShowFilters] = useState(false)
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [currentPage, setCurrentPage] = useState(1)
//   const [showOnlyInStock, setShowOnlyInStock] = useState(false)
//   const [showOnlyNew, setShowOnlyNew] = useState(false)
//   const [showOnlySale, setShowOnlySale] = useState(false)

//   const { shouldShowPrices, shouldShowAddToCart } = useShoppingFeatures()
//   const { categories, loading: categoriesLoading } = useCategories()

//   // Build filters for API
//   const filters: ProductFilters = {
//     page: currentPage,
//     limit: 12,
//     sortBy,
//     sortOrder,
//     ...(selectedCategory !== "Todos los Productos" && { category: selectedCategory }),
//     ...(searchQuery && { search: searchQuery }),
//     ...(shouldShowPrices && { minPrice: priceRange[0], maxPrice: priceRange[1] }),
//     ...(showOnlyInStock && { inStock: true }),
//     ...(showOnlyNew && { isNew: true }),
//     ...(showOnlySale && { isSale: true }),
//   }

//   const { products, loading, error, pagination, refetch } = useProducts(filters)

//   useEffect(() => {
//     if (categoryParam && categories.length > 0) {
//       const category = categories.find(cat => 
//         cat.slug === categoryParam || cat.name.toLowerCase() === categoryParam.toLowerCase()
//       )
//       if (category) {
//         setSelectedCategory(category.name)
//       }
//     }
//   }, [categoryParam, categories])

//   // Reset to first page when filters change
//   useEffect(() => {
//     setCurrentPage(1)
//   }, [selectedCategory, searchQuery, sortBy, sortOrder, priceRange, showOnlyInStock, showOnlyNew, showOnlySale])

//   const categoriesData = [
//     { name: "Todos los Productos", slug: "todos" },
//     ...categories.map(cat => ({ name: cat.name, slug: cat.slug }))
//   ]

//   const handleSearch = (query: string) => {
//     setSearchQuery(query)
//     setCurrentPage(1)
//   }

//   const handlePageChange = (page: number) => {
//     setCurrentPage(page)
//     window.scrollTo({ top: 0, behavior: 'smooth' })
//   }

//   if (loading && products.length === 0) {
//     return <ProductsPageSkeleton />
//   }

//   return (
//     <SiteLayout>
//       <main className="bg-gray-50 min-h-screen">
//         <CategoryBreadcrumb category={selectedCategory} />

//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 md:py-12">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h1 className="text-2xl md:text-4xl font-bold mb-4">
//                 {selectedCategory === "Todos los Productos" ? "Nuestros Productos" : selectedCategory}
//               </h1>
//               <p className="text-lg md:text-xl mb-6 md:mb-8">
//                 {selectedCategory === "Todos los Productos"
//                   ? "Encuentra todo lo que necesitas para tu negocio"
//                   : `Explora nuestra selección de ${selectedCategory.toLowerCase()}`}
//               </p>

//               {/* Search Bar */}
//               <div className="max-w-2xl mx-auto relative">
//                 <input
//                   type="text"
//                   placeholder="Buscar productos..."
//                   value={searchQuery}
//                   onChange={(e) => handleSearch(e.target.value)}
//                   className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-900 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
//                 />
//                 <button className="absolute right-2 top-2 md:top-2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors">
//                   <Search className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="container mx-auto px-4 py-6 md:py-8">
//           <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//             {/* Mobile Filters Overlay */}
//             {showFilters && (
//               <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
//                 <div className="absolute right-0 top-0 h-full w-80 bg-white p-6 overflow-y-auto">
//                   <div className="flex justify-between items-center mb-6">
//                     <h3 className="text-lg font-semibold">Filtros</h3>
//                     <button onClick={() => setShowFilters(false)} className="p-2">
//                       <X className="w-5 h-5" />
//                     </button>
//                   </div>
//                   <FilterSidebar
//                     categories={categoriesData}
//                     selectedCategory={selectedCategory}
//                     setSelectedCategory={setSelectedCategory}
//                     priceRange={priceRange}
//                     setPriceRange={setPriceRange}
//                     shouldShowPrices={shouldShowPrices}
//                     showOnlyInStock={showOnlyInStock}
//                     setShowOnlyInStock={setShowOnlyInStock}
//                     showOnlyNew={showOnlyNew}
//                     setShowOnlyNew={setShowOnlyNew}
//                     // showOnlySale={showOnlySale}
//                     setShowOnlySale={setShowOnlySale}
//                   />
//                 </div>
//               </div>
//             )}

//             {/* Desktop Sidebar */}
//             <aside className="hidden lg:block lg:w-64 flex-shrink-0">
//               <FilterSidebar
//                 categories={categoriesData}
//                 selectedCategory={selectedCategory}
//                 setSelectedCategory={setSelectedCategory}
//                 priceRange={priceRange}
//                 setPriceRange={setPriceRange}
//                 shouldShowPrices={shouldShowPrices}
//                 showOnlyInStock={showOnlyInStock}
//                 setShowOnlyInStock={setShowOnlyInStock}
//                 showOnlyNew={showOnlyNew}
//                 setShowOnlyNew={setShowOnlyNew}
//                 showOnlySale={showOnlySale}
//                 setShowOnlySale={setShowOnlySale}
//               />
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1">
//               {/* Results Header */}
//               <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                   <div className="flex items-center gap-4">
//                     <span className="text-gray-600">
//                       {pagination ? `${pagination.total} productos encontrados` : 'Cargando...'}
//                     </span>
//                     {error && (
//                       <div className="text-red-600 text-sm">
//                         Error: {error}
//                         <button 
//                           onClick={refetch}
//                           className="ml-2 text-blue-600 hover:underline"
//                         >
//                           Reintentar
//                         </button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="flex items-center gap-4">
//                     {/* Mobile Filter Button */}
//                     <button
//                       onClick={() => setShowFilters(true)}
//                       className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
//                     >
//                       <Filter className="w-4 h-4" />
//                       Filtros
//                     </button>

//                     {/* Sort Dropdown */}
//                     <div className="relative">
//                       <select
//                         value={`${sortBy}-${sortOrder}`}
//                         onChange={(e) => {
//                           const [field, order] = e.target.value.split('-') as [typeof sortBy, typeof sortOrder]
//                           setSortBy(field)
//                           setSortOrder(order)
//                         }}
//                         className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500"
//                       >
//                         <option value="name-asc">Nombre A-Z</option>
//                         <option value="name-desc">Nombre Z-A</option>
//                         <option value="price-asc">Precio: Menor a Mayor</option>
//                         <option value="price-desc">Precio: Mayor a Menor</option>
//                         <option value="rating-desc">Mejor Calificación</option>
//                         <option value="created_at-desc">Más Recientes</option>
//                       </select>
//                       <ChevronDown className="absolute right-2 top-3 w-4 h-4 text-gray-400 pointer-events-none" />
//                     </div>

//                     {/* View Mode Toggle */}
//                     <div className="flex border border-gray-300 rounded-md overflow-hidden">
//                       <button
//                         onClick={() => setViewMode("grid")}
//                         className={`p-2 ${viewMode === "grid" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
//                       >
//                         <Grid className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode("list")}
//                         className={`p-2 ${viewMode === "list" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
//                       >
//                         <List className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Loading State */}
//               {loading && products.length > 0 && (
//                 <div className="text-center py-4 text-gray-600">
//                   Actualizando productos...
//                 </div>
//               )}

//               {/* Products Grid */}
//               {products.length > 0 ? (
//                 <div
//                   className={`grid gap-4 md:gap-6 ${
//                     viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
//                   }`}
//                 >
//                   {products.map((product, index) => (
//                     <ProductCard 
//                       key={product.id} 
//                       product={product} 
//                       viewMode={viewMode} 
//                       index={index}
//                       shouldShowPrices={shouldShowPrices}
//                       shouldShowAddToCart={shouldShowAddToCart}
//                     />
//                   ))}
//                 </div>
//               ) : !loading && (
//                 <div className="text-center py-12">
//                   <div className="text-gray-500 text-lg mb-4">
//                     No se encontraron productos
//                   </div>
//                   <p className="text-gray-400">
//                     Intenta ajustar los filtros o términos de búsqueda
//                   </p>
//                 </div>
//               )}

//               {/* Pagination */}
//               {pagination && pagination.totalPages > 1 && (
//                 <div className="flex justify-center mt-8 md:mt-12">
//                   <div className="flex items-center space-x-2">
//                     <button
//                       onClick={() => handlePageChange(currentPage - 1)}
//                       disabled={currentPage === 1}
//                       className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                     >
//                       Anterior
//                     </button>
                    
//                     {/* Page Numbers */}
//                     {Array.from({ length: Math.min(5, pagination.totalPages) }, (_, i) => {
//                       const pageNum = Math.max(1, Math.min(pagination.totalPages - 4, currentPage - 2)) + i
//                       if (pageNum > pagination.totalPages) return null
                      
//                       return (
//                         <button
//                           key={pageNum}
//                           onClick={() => handlePageChange(pageNum)}
//                           className={`px-3 py-2 md:px-4 md:py-2 rounded-md text-sm ${
//                             currentPage === pageNum
//                               ? "bg-blue-800 text-white"
//                               : "border border-gray-300 hover:bg-gray-50"
//                           }`}
//                         >
//                           {pageNum}
//                         </button>
//                       )
//                     })}
                    
//                     <button
//                       onClick={() => handlePageChange(currentPage + 1)}
//                       disabled={currentPage === pagination.totalPages}
//                       className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
//                     >
//                       Siguiente
//                     </button>
//                   </div>
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </main>
//     </SiteLayout>
//   )
// }
//     isNew: false,
//     isSale: true,
//   },
//   {
//     id: 4,
//     name: "Filtro de Aceite Universal",
//     category: "Autopartes",
//     price: 180.0,
//     originalPrice: null,
//     rating: 4.1,
//     reviews: 89,
//     image: "/placeholder.svg?height=300&width=300",
//     inStock: false,
//     isNew: false,
//     isSale: false,
//   },
//   {
//     id: 5,
//     name: "Regulador de Presión Argón",
//     category: "Gases Industriales",
//     price: 950.0,
//     originalPrice: null,
//     rating: 4.6,
//     reviews: 34,
//     image: "/placeholder.svg?height=300&width=300",
//     inStock: true,
//     isNew: true,
//     isSale: false,
//   },
//   {
//     id: 6,
//     name: "Compresor de Aire 100L",
//     category: "Equipos Neumáticos",
//     price: 12500.0,
//     originalPrice: 14000.0,
//     rating: 4.7,
//     reviews: 28,
//     image: "/placeholder.svg?height=300&width=300",
//     inStock: true,
//     isNew: false,
//     isSale: true,
//   },
// ]

// const categoriesData = [
//   {
//     name: "Gases Industriales",
//     description: "Oxígeno, acetileno, argón y más gases para uso industrial",
//     image: "/placeholder.svg?height=200&width=300",
//     products: ["Oxígeno", "Acetileno", "Argón", "CO2", "Nitrógeno"],
//   },
//   {
//     name: "Autopartes",
//     description: "Repuestos y accesorios para todo tipo de vehículos",
//     image: "/placeholder.svg?height=200&width=300",
//     products: ["Frenos", "Suspensión", "Motor", "Transmisión", "Eléctrico"],
//   },
//   {
//     name: "Herramientas",
//     description: "Herramientas profesionales para todos los oficios",
//     image: "/placeholder.svg?height=200&width=300",
//     products: ["Manuales", "Eléctricas", "Neumáticas", "Medición", "Corte"],
//   },
//   {
//     name: "Equipos de Soldadura",
//     description: "Equipos y consumibles para soldadura profesional",
//     image: "/placeholder.svg?height=200&width=300",
//     products: ["Soldadoras", "Electrodos", "Alambres", "Caretas", "Accesorios"],
//   },
// ]

// const sortOptions = [
//   { value: "featured", label: "Destacados" },
//   { value: "price-low", label: "Precio: Menor a Mayor" },
//   { value: "price-high", label: "Precio: Mayor a Menor" },
//   { value: "name", label: "Nombre A-Z" },
//   { value: "rating", label: "Mejor Calificados" },
//   { value: "newest", label: "Más Recientes" },
// ]

// export default function ProductosPage() {
//   const searchParams = useSearchParams()
//   const categoryParam = searchParams.get("categoria")
//   const { shouldShowPrices } = useShoppingFeatures()

//   const [selectedCategory, setSelectedCategory] = useState("Todos los Productos")
//   const [sortBy, setSortBy] = useState("featured")
//   const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
//   const [showFilters, setShowFilters] = useState(false)
//   const [priceRange, setPriceRange] = useState([0, 20000])
//   const [searchQuery, setSearchQuery] = useState("")
//   const [isLoading, setIsLoading] = useState(true)

//   // Set initial category from URL parameter
//   useEffect(() => {
//     if (categoryParam && categoriesData.some((cat) => cat.name === categoryParam)) {
//       setSelectedCategory(categoryParam)
//     }
//     setIsLoading(false)
//   }, [categoryParam])

//   const filteredProducts = products.filter((product) => {
//     const matchesCategory = selectedCategory === "Todos los Productos" || product.category === selectedCategory
//     const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
//     const matchesPrice = shouldShowPrices ? product.price >= priceRange[0] && product.price <= priceRange[1] : true
//     return matchesCategory && matchesSearch && matchesPrice
//   })

//   const categories = categoriesData.map((cat) => cat.name)

//   return (
//     <SiteLayout>
//       <main className="bg-gray-50 min-h-screen">
//         <CategoryBreadcrumb category={selectedCategory} />

//         {/* Hero Section */}
//         <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 md:py-12">
//           <div className="container mx-auto px-4">
//             <div className="text-center">
//               <h1 className="text-2xl md:text-4xl font-bold mb-4">
//                 {selectedCategory === "Todos los Productos" ? "Nuestros Productos" : selectedCategory}
//               </h1>
//               <p className="text-lg md:text-xl mb-6 md:mb-8">
//                 {selectedCategory === "Todos los Productos"
//                   ? "Encuentra todo lo que necesitas para tu negocio"
//                   : `Explora nuestra selección de ${selectedCategory.toLowerCase()}`}
//               </p>

//               {/* Search Bar */}
//               <div className="max-w-2xl mx-auto relative">
//                 <input
//                   type="text"
//                   placeholder="Buscar productos..."
//                   value={searchQuery}
//                   onChange={(e) => setSearchQuery(e.target.value)}
//                   className="w-full px-4 md:px-6 py-3 md:py-4 rounded-full text-gray-900 text-base md:text-lg focus:outline-none focus:ring-4 focus:ring-yellow-400"
//                 />
//                 <button className="absolute right-2 top-2 md:top-2 bg-yellow-400 text-black p-2 rounded-full hover:bg-yellow-300 transition-colors">
//                   <Search className="w-5 h-5 md:w-6 md:h-6" />
//                 </button>
//               </div>
//             </div>
//           </div>
//         </section>

//         <div className="container mx-auto px-4 py-6 md:py-8">
//           <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//             {/* Mobile Filters Overlay */}
//             {showFilters && (
//               <div className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-50">
//                 <div className="bg-white w-80 h-full overflow-y-auto">
//                   <div className="p-4 border-b border-gray-200 flex justify-between items-center">
//                     <h3 className="font-bold text-lg">Filtros</h3>
//                     <button onClick={() => setShowFilters(false)}>
//                       <X className="w-6 h-6" />
//                     </button>
//                   </div>
//                   <div className="p-4">
//                     {/* Categories */}
//                     <div className="mb-6">
//                       <h4 className="font-semibold mb-3">Categorías</h4>
//                       <div className="space-y-2">
//                         {categories.map((category) => (
//                           <button
//                             key={category}
//                             onClick={() => {
//                               setSelectedCategory(category)
//                               setShowFilters(false)
//                             }}
//                             className={`block w-full text-left px-3 py-2 rounded-md transition-colors ${
//                               selectedCategory === category ? "bg-blue-800 text-white" : "hover:bg-gray-100"
//                             }`}
//                           >
//                             {category}
//                           </button>
//                         ))}
//                       </div>
//                     </div>

//                     {/* Price Range */}
//                     {shouldShowPrices && (
//                       <div className="mb-6">
//                         <h4 className="font-semibold mb-3">Rango de Precio</h4>
//                         <div className="space-y-3">
//                           <div className="flex items-center gap-2">
//                             <input
//                               type="number"
//                               placeholder="Min"
//                               value={priceRange[0]}
//                               onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                             />
//                             <span>-</span>
//                             <input
//                               type="number"
//                               placeholder="Max"
//                               value={priceRange[1]}
//                               onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//                               className="w-full px-3 py-2 border border-gray-300 rounded-md"
//                             />
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )}

//             {/* Desktop Sidebar Filters */}
//             <aside className="hidden lg:block lg:w-64 flex-shrink-0">
//               <div className="bg-white rounded-lg shadow-md p-6 sticky top-4">
//                 <h3 className="font-bold text-lg mb-4">Filtros</h3>

//                 {/* Categories */}
//                 <div className="mb-6">
//                   <h4 className="font-semibold mb-3">Categorías</h4>
//                   <div className="space-y-2">
//                     {categories.map((category) => (
//                       <button
//                         key={category}
//                         onClick={() => setSelectedCategory(category)}
//                         className={`block w-full text-left px-3 py-2 rounded-md transition-colors text-sm ${
//                           selectedCategory === category ? "bg-blue-800 text-white" : "hover:bg-gray-100"
//                         }`}
//                       >
//                         {category}
//                       </button>
//                     ))}
//                   </div>
//                 </div>

//                 {/* Price Range */}
//                 {shouldShowPrices && (
//                   <div className="mb-6">
//                     <h4 className="font-semibold mb-3">Rango de Precio</h4>
//                     <div className="space-y-3">
//                       <div className="flex items-center gap-2">
//                         <input
//                           type="number"
//                           placeholder="Min"
//                           value={priceRange[0]}
//                           onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                         <span>-</span>
//                         <input
//                           type="number"
//                           placeholder="Max"
//                           value={priceRange[1]}
//                           onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
//                           className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </aside>

//             {/* Main Content */}
//             <div className="flex-1">
//               {/* Toolbar */}
//               <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//                 <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
//                   <div className="flex items-center gap-4">
//                     <span className="text-gray-600 text-sm md:text-base">
//                       {filteredProducts.length} productos encontrados
//                     </span>
//                     <button
//                       onClick={() => setShowFilters(!showFilters)}
//                       className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm"
//                     >
//                       <Filter className="w-4 h-4" />
//                       Filtros
//                     </button>
//                   </div>

//                   <div className="flex items-center gap-4 w-full sm:w-auto">
//                     {/* Sort Dropdown */}
//                     <div className="relative flex-1 sm:flex-none">
//                       <select
//                         value={sortBy}
//                         onChange={(e) => setSortBy(e.target.value)}
//                         className="appearance-none bg-white border border-gray-300 rounded-md px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-blue-500 w-full text-sm"
//                       >
//                         {sortOptions.map((option) => (
//                           <option key={option.value} value={option.value}>
//                             {option.label}
//                           </option>
//                         ))}
//                       </select>
//                       <ChevronDown className="absolute right-2 top-1/2 transform -translate-y-1/2 w-4 h-4 pointer-events-none" />
//                     </div>

//                     {/* View Mode Toggle */}
//                     <div className="flex border border-gray-300 rounded-md overflow-hidden">
//                       <button
//                         onClick={() => setViewMode("grid")}
//                         className={`p-2 ${viewMode === "grid" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
//                       >
//                         <Grid className="w-4 h-4" />
//                       </button>
//                       <button
//                         onClick={() => setViewMode("list")}
//                         className={`p-2 ${viewMode === "list" ? "bg-blue-800 text-white" : "bg-white text-gray-600 hover:bg-gray-50"}`}
//                       >
//                         <List className="w-4 h-4" />
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Products Grid */}
//               <div
//                 className={`grid gap-4 md:gap-6 ${
//                   viewMode === "grid" ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" : "grid-cols-1"
//                 }`}
//               >
//                 {filteredProducts.map((product, index) => (
//                   <ProductCard key={product.id} product={product} viewMode={viewMode} index={index} />
//                 ))}
//               </div>

//               {/* Pagination */}
//               <div className="flex justify-center mt-8 md:mt-12">
//                 <div className="flex items-center space-x-2">
//                   <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 disabled:opacity-50 text-sm">
//                     Anterior
//                   </button>
//                   <button className="px-3 py-2 md:px-4 md:py-2 bg-blue-800 text-white rounded-md text-sm">1</button>
//                   <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
//                     2
//                   </button>
//                   <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
//                     3
//                   </button>
//                   <button className="px-3 py-2 md:px-4 md:py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-sm">
//                     Siguiente
//                   </button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </main>
//     </SiteLayout>
//   )
// }

// function ProductCard({ product, viewMode, index }: { product: any; viewMode: "grid" | "list"; index: number }) {
//   const [isFavorite, setIsFavorite] = useState(false)
//   const { shouldShowPrices, shouldShowAddToCart, isShoppingEnabled } = useShoppingFeatures()

//   if (viewMode === "list") {
//     return (
//       <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
//         <div className="flex flex-col sm:flex-row">
//           <div className="w-full sm:w-48 h-48 bg-gray-100 flex items-center justify-center relative overflow-hidden">
//             {product.isNew && (
//               <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
//                 Nuevo
//               </span>
//             )}
//             {product.isSale && (
//               <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
//                 Oferta
//               </span>
//             )}
//             <ProductImage
//               productId={product.id}
//               width={200}
//               height={200}
//               alt={product.name}
//               className="object-contain"
//               priority={index < 4}
//               sizes="(max-width: 640px) 100vw, 200px"
//             />
//           </div>
//           <div className="flex-1 p-4 md:p-6">
//             <div className="flex flex-col sm:flex-row justify-between items-start mb-2">
//               <div className="flex-1">
//                 <span className="text-sm text-blue-800 font-medium">{product.category}</span>
//                 <h3 className="font-semibold text-base md:text-lg text-gray-900 hover:text-blue-800">
//                   <Link href={`/productos/${product.id}`}>{product.name}</Link>
//                 </h3>
//               </div>
//               {/* <button
//                 onClick={() => setIsFavorite(!isFavorite)}
//                 className={`p-2 rounded-full mt-2 sm:mt-0 ${isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"}`}
//               >
//                 <Heart className={`w-5 h-5 ${isFavorite ? "fill-current" : ""}`} />
//               </button> */}
//             </div>

//             <div className="flex items-center mb-3">
//               <div className="flex items-center">
//                 {[...Array(5)].map((_, i) => (
//                   <Star
//                     key={i}
//                     className={`w-4 h-4 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//                   />
//                 ))}
//               </div>
//               <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
//             </div>

//             <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
//               {shouldShowPrices && (
//                 <div>
//                   <span className="text-xl md:text-2xl font-bold text-gray-900">${product.price.toLocaleString()}</span>
//                   {product.originalPrice && (
//                     <span className="ml-2 text-base md:text-lg text-gray-500 line-through">
//                       ${product.originalPrice.toLocaleString()}
//                     </span>
//                   )}
//                 </div>
//               )}
//               {shouldShowAddToCart && (
//                 <button
//                   disabled={!product.inStock}
//                   className="w-full sm:w-auto bg-blue-800 text-white px-4 md:px-6 py-2 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//                 >
//                   <ShoppingCart className="w-4 h-4" />
//                   {product.inStock ? "Agregar" : "Agotado"}
//                 </button>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }

//   return (
//     <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow group">
//       <div className="aspect-square bg-gray-100 flex items-center justify-center relative overflow-hidden">
//         {product.isNew && (
//           <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full z-10">
//             Nuevo
//           </span>
//         )}
//         {product.isSale && (
//           <span className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full z-10">
//             Oferta
//           </span>
//         )}
//         {/* <button
//           onClick={() => setIsFavorite(!isFavorite)}
//           className={`absolute ${product.isSale ? "top-10" : "top-2"} right-2 p-2 rounded-full bg-white shadow-md ${
//             isFavorite ? "text-red-500" : "text-gray-400 hover:text-red-500"
//           } z-10`}
//         >
//           <Heart className={`w-4 h-4 ${isFavorite ? "fill-current" : ""}`} />
//         </button> */}
//         <Link href={`/productos/${product.id}`}>
//           <ProductImage
//             productId={product.id}
//             width={300}
//             height={300}
//             alt={product.name}
//             className="object-contain group-hover:scale-105 transition-transform duration-200"
//             priority={index < 8}
//             sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
//           />
//         </Link>
//       </div>
//       <div className="p-3 md:p-4">
//         <span className="text-xs text-blue-800 font-medium">{product.category}</span>
//         <h3 className="font-semibold text-gray-900 mt-1 group-hover:text-blue-800 text-sm md:text-base line-clamp-2">
//           <Link href={`/productos/${product.id}`}>{product.name}</Link>
//         </h3>

//         <div className="flex items-center mt-2 mb-3">
//           <div className="flex items-center">
//             {[...Array(5)].map((_, i) => (
//               <Star
//                 key={i}
//                 className={`w-3 h-3 ${i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"}`}
//               />
//             ))}
//           </div>
//           <span className="ml-1 text-xs text-gray-600">({product.reviews})</span>
//         </div>

//         <div className="mb-3">
//           {shouldShowPrices && (
//             <>
//               <span className="text-base md:text-lg font-bold text-gray-900">${product.price.toLocaleString()}</span>
//               {product.originalPrice && (
//                 <span className="ml-2 text-sm text-gray-500 line-through">${product.originalPrice.toLocaleString()}</span>
//               )}
//             </>
//           )}
//         </div>

//         {/* {shouldShowAddToCart && (
//           <button
//             disabled={!product.inStock}
//             className="w-full bg-blue-800 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed flex items-center justify-center gap-2 text-sm"
//           >
//             <ShoppingCart className="w-4 h-4" />
//             {product.inStock ? "Agregar al Carrito" : "Agotado"}
//           </button>
//         )} */}
//       </div>
//     </div>
//   )
// }

// function ProductsPageSkeleton() {
//   return (
//     <main className="bg-gray-50 min-h-screen">
//       <div className="bg-white border-b border-gray-200 py-3">
//         <div className="container mx-auto px-4">
//           <div className="flex items-center space-x-2 text-sm">
//             <div className="h-4 bg-gray-200 rounded w-12 animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
//             <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
//           </div>
//         </div>
//       </div>

//       <section className="bg-gradient-to-r from-blue-800 to-blue-900 text-white py-8 md:py-12">
//         <div className="container mx-auto px-4">
//           <div className="text-center">
//             <div className="h-8 bg-blue-700 rounded w-64 mx-auto mb-4 animate-pulse"></div>
//             <div className="h-6 bg-blue-700 rounded w-96 mx-auto mb-8 animate-pulse"></div>
//             <div className="max-w-2xl mx-auto">
//               <div className="h-12 bg-white rounded-full animate-pulse"></div>
//             </div>
//           </div>
//         </div>
//       </section>

//       <div className="container mx-auto px-4 py-6 md:py-8">
//         <div className="flex flex-col lg:flex-row gap-6 md:gap-8">
//           <aside className="hidden lg:block lg:w-64 flex-shrink-0">
//             <div className="bg-white rounded-lg shadow-md p-6">
//               <div className="h-6 bg-gray-200 rounded w-16 mb-4 animate-pulse"></div>
//               <div className="space-y-2">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="h-8 bg-gray-200 rounded animate-pulse"></div>
//                 ))}
//               </div>
//             </div>
//           </aside>

//           <div className="flex-1">
//             <div className="bg-white rounded-lg shadow-md p-4 mb-6">
//               <div className="flex justify-between items-center">
//                 <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
//                 <div className="flex gap-4">
//                   <div className="h-8 bg-gray-200 rounded w-32 animate-pulse"></div>
//                   <div className="h-8 bg-gray-200 rounded w-16 animate-pulse"></div>
//                 </div>
//               </div>
//             </div>

//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
//               {[...Array(8)].map((_, index) => (
//                 <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
//                   <ImageSkeleton className="aspect-square" />
//                   <div className="p-3 md:p-4 space-y-3">
//                     <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
//                     <div className="h-5 bg-gray-200 rounded w-full animate-pulse"></div>
//                     <div className="h-4 bg-gray-200 rounded w-20 animate-pulse"></div>
//                     <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
//                     <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       </div>
//     </main>
//   )
// }
