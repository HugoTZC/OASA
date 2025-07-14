"use client"

import type React from "react"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Calendar, User, Search, Mail, ArrowRight } from "lucide-react"
import { RandomImage } from "@/components/dynamic-image"
import { ImageSkeleton } from "@/components/image-skeleton"

const blogPosts = [
  {
    id: 1,
    title: "Guía Completa de Seguridad en Soldadura Industrial",
    excerpt:
      "Aprende las mejores prácticas de seguridad para operaciones de soldadura en entornos industriales. Protocolos, equipos y normativas actualizadas.",
    author: "Ing. Carlos Mendoza",
    date: "2024-01-15",
    category: "Seguridad",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "8 min",
    featured: true,
  },
  {
    id: 2,
    title: "Nuevas Tecnologías en Gases Industriales",
    excerpt:
      "Descubre las últimas innovaciones en tecnología de gases industriales y cómo pueden optimizar tus procesos de manufactura.",
    author: "Dra. Ana García",
    date: "2024-01-10",
    category: "Tecnología",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "6 min",
    featured: false,
  },
  {
    id: 3,
    title: "Mantenimiento Preventivo de Equipos de Soldadura",
    excerpt:
      "Programa de mantenimiento esencial para maximizar la vida útil de tus equipos de soldadura y garantizar operaciones eficientes.",
    author: "Téc. Roberto Silva",
    date: "2024-01-05",
    category: "Mantenimiento",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "5 min",
    featured: false,
  },
  {
    id: 4,
    title: "Tendencias en Autopartes 2024",
    excerpt:
      "Análisis de las principales tendencias en la industria automotriz y cómo afectan la selección de autopartes y componentes.",
    author: "Ing. María López",
    date: "2024-01-01",
    category: "Autopartes",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "7 min",
    featured: false,
  },
  {
    id: 5,
    title: "Optimización de Procesos con Gases Especiales",
    excerpt: "Cómo los gases especiales pueden mejorar la eficiencia y calidad en procesos industriales específicos.",
    author: "Dr. Fernando Ruiz",
    date: "2023-12-28",
    category: "Procesos",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "9 min",
    featured: false,
  },
  {
    id: 6,
    title: "Herramientas Digitales para Talleres Modernos",
    excerpt:
      "Integración de tecnología digital en talleres mecánicos para mejorar productividad y gestión de inventarios.",
    author: "Ing. Patricia Vega",
    date: "2023-12-25",
    category: "Tecnología",
    image: "/placeholder.svg?height=300&width=400",
    readTime: "6 min",
    featured: false,
  },
]

const categories = ["Todos", "Seguridad", "Tecnología", "Mantenimiento", "Autopartes", "Procesos"]

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [searchQuery, setSearchQuery] = useState("")
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  const filteredPosts = blogPosts.filter((post) => {
    const matchesCategory = selectedCategory === "Todos" || post.category === selectedCategory
    const matchesSearch =
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const featuredPost = blogPosts.find((post) => post.featured)
  const regularPosts = filteredPosts.filter((post) => !post.featured)

  const handleNewsletterSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Newsletter subscription:", email)
    setEmail("")
    alert("¡Gracias por suscribirte a nuestro blog!")
  }

  if (isLoading) {
    return <BlogPageSkeleton />
  }

  return (
    <main>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-800 to-blue-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold mb-6">Blog OASA</h1>
            <p className="text-lg md:text-xl mb-6 md:mb-8 leading-relaxed">
              Conocimiento técnico, tendencias industriales y consejos de expertos para optimizar tu negocio. Mantente
              actualizado con las últimas novedades del sector.
            </p>

            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <input
                type="text"
                placeholder="Buscar artículos..."
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

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          {/* Main Content */}
          <div className="flex-1">
            {/* Featured Post */}
            {featuredPost && selectedCategory === "Todos" && !searchQuery && (
              <div className="mb-8 md:mb-12">
                <h2 className="text-2xl md:text-3xl font-bold mb-6 md:mb-8 text-gray-900">Artículo Destacado</h2>
                <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow">
                  <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                    <RandomImage
                      seed={`blog-featured-${featuredPost.id}`}
                      width={800}
                      height={400}
                      alt={featuredPost.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      priority
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                    />
                  </div>
                  <div className="p-6 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 md:gap-4 mb-4 text-sm text-gray-600">
                      <span className="bg-purple-100 text-purple-800 px-3 py-1 rounded-full font-medium">
                        {featuredPost.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="w-4 h-4 mr-1" />
                        {new Date(featuredPost.date).toLocaleDateString("es-ES")}
                      </div>
                      <div className="flex items-center">
                        <User className="w-4 h-4 mr-1" />
                        {featuredPost.author}
                      </div>
                      <span>{featuredPost.readTime} lectura</span>
                    </div>
                    <h3 className="text-xl md:text-2xl font-bold mb-4 text-gray-900 hover:text-purple-800">
                      <Link href={`/blog/${featuredPost.id}`}>{featuredPost.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-6 leading-relaxed">{featuredPost.excerpt}</p>
                    <Link
                      href={`/blog/${featuredPost.id}`}
                      className="inline-flex items-center text-purple-800 font-semibold hover:text-purple-900"
                    >
                      Leer más
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Link>
                  </div>
                </div>
              </div>
            )}

            {/* Category Filter */}
            <div className="mb-6 md:mb-8">
              <div className="flex flex-wrap gap-2 md:gap-3">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-3 md:px-4 py-2 rounded-full font-medium transition-colors text-sm md:text-base ${
                      selectedCategory === category
                        ? "bg-purple-800 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* Blog Posts Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {regularPosts.map((post, index) => (
                <article
                  key={post.id}
                  className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow"
                >
                  <div className="aspect-video bg-gray-200 flex items-center justify-center overflow-hidden">
                    <RandomImage
                      seed={`blog-post-${post.id}`}
                      width={400}
                      height={300}
                      alt={post.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform duration-300"
                      priority={index < 4}
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    />
                  </div>
                  <div className="p-4 md:p-6">
                    <div className="flex flex-wrap items-center gap-2 md:gap-3 mb-3 text-xs md:text-sm text-gray-600">
                      <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                        {post.category}
                      </span>
                      <div className="flex items-center">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(post.date).toLocaleDateString("es-ES")}
                      </div>
                      <span>{post.readTime}</span>
                    </div>
                    <h3 className="text-lg md:text-xl font-bold mb-3 text-gray-900 hover:text-purple-800 line-clamp-2">
                      <Link href={`/blog/${post.id}`}>{post.title}</Link>
                    </h3>
                    <p className="text-gray-600 mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
                      {post.excerpt}
                    </p>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center text-xs md:text-sm text-gray-600">
                        <User className="w-4 h-4 mr-1" />
                        {post.author}
                      </div>
                      <Link
                        href={`/blog/${post.id}`}
                        className="text-purple-800 font-semibold hover:text-purple-900 text-sm"
                      >
                        Leer más →
                      </Link>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <aside className="lg:w-80">
            {/* Newsletter Subscription */}
            <div className="bg-gradient-to-br from-purple-800 to-blue-800 text-white p-6 rounded-xl mb-8">
              <Mail className="w-12 h-12 mb-4" />
              <h3 className="text-xl font-bold mb-3">Suscríbete al Blog</h3>
              <p className="mb-4 text-purple-100">
                Recibe los últimos artículos técnicos y novedades de la industria directamente en tu correo.
              </p>
              <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Tu correo electrónico"
                  className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-yellow-400"
                  required
                />
                <button
                  type="submit"
                  className="w-full bg-yellow-400 text-black py-3 px-4 rounded-lg font-bold hover:bg-yellow-300 transition-colors"
                >
                  Suscribirse
                </button>
              </form>
            </div>

            {/* Popular Posts */}
            <div className="bg-white p-6 rounded-xl shadow-lg mb-8">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Artículos Populares</h3>
              <div className="space-y-4">
                {blogPosts.slice(0, 4).map((post, index) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                    <div className="flex gap-3">
                      <div className="w-16 h-16 bg-gray-200 rounded-lg flex-shrink-0 flex items-center justify-center overflow-hidden">
                        <RandomImage
                          seed={`blog-sidebar-${post.id}`}
                          width={64}
                          height={64}
                          alt={post.title}
                          className="object-cover w-full h-full"
                          sizes="64px"
                        />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold text-sm text-gray-900 group-hover:text-purple-800 line-clamp-2">
                          {post.title}
                        </h4>
                        <p className="text-xs text-gray-600 mt-1">{new Date(post.date).toLocaleDateString("es-ES")}</p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold mb-4 text-gray-900">Categorías</h3>
              <div className="space-y-2">
                {categories.slice(1).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className="block w-full text-left px-3 py-2 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">{category}</span>
                      <span className="text-sm text-gray-500">
                        {blogPosts.filter((post) => post.category === category).length}
                      </span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}

function BlogPageSkeleton() {
  return (
    <main>
      <section className="bg-gradient-to-r from-purple-800 to-blue-800 text-white py-12 md:py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="h-12 bg-purple-700 rounded w-48 mx-auto mb-6 animate-pulse"></div>
            <div className="h-6 bg-purple-700 rounded w-96 mx-auto mb-8 animate-pulse"></div>
            <div className="max-w-2xl mx-auto">
              <div className="h-12 bg-white rounded-full animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8 md:py-12">
        <div className="flex flex-col lg:flex-row gap-8 md:gap-12">
          <div className="flex-1">
            <div className="mb-8 md:mb-12">
              <div className="h-8 bg-gray-200 rounded w-48 mb-6 md:mb-8 animate-pulse"></div>
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                <ImageSkeleton className="aspect-video" />
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex gap-4">
                    <div className="h-6 bg-gray-200 rounded w-20 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded w-32 animate-pulse"></div>
                  </div>
                  <div className="h-8 bg-gray-200 rounded w-full animate-pulse"></div>
                  <div className="space-y-2">
                    <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded w-3/4 animate-pulse"></div>
                  </div>
                  <div className="h-6 bg-gray-200 rounded w-24 animate-pulse"></div>
                </div>
              </div>
            </div>

            <div className="mb-6 md:mb-8">
              <div className="flex gap-2 md:gap-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-8 bg-gray-200 rounded-full w-20 animate-pulse"></div>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg overflow-hidden">
                  <ImageSkeleton className="aspect-video" />
                  <div className="p-4 md:p-6 space-y-3">
                    <div className="flex gap-3">
                      <div className="h-5 bg-gray-200 rounded w-16 animate-pulse"></div>
                      <div className="h-5 bg-gray-200 rounded w-20 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-gray-200 rounded w-full animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-2/3 animate-pulse"></div>
                    </div>
                    <div className="flex justify-between">
                      <div className="h-4 bg-gray-200 rounded w-24 animate-pulse"></div>
                      <div className="h-4 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <aside className="lg:w-80 space-y-8">
            <div className="bg-gradient-to-br from-purple-800 to-blue-800 p-6 rounded-xl">
              <div className="h-12 w-12 bg-purple-700 rounded mb-4 animate-pulse"></div>
              <div className="h-6 bg-purple-700 rounded w-32 mb-3 animate-pulse"></div>
              <div className="h-4 bg-purple-700 rounded w-full mb-4 animate-pulse"></div>
              <div className="space-y-3">
                <div className="h-12 bg-white rounded-lg animate-pulse"></div>
                <div className="h-12 bg-yellow-400 rounded-lg animate-pulse"></div>
              </div>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="h-6 bg-gray-200 rounded w-32 mb-4 animate-pulse"></div>
              <div className="space-y-4">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg animate-pulse"></div>
                    <div className="flex-1 space-y-2">
                      <div className="h-4 bg-gray-200 rounded w-full animate-pulse"></div>
                      <div className="h-3 bg-gray-200 rounded w-16 animate-pulse"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </div>
    </main>
  )
}
