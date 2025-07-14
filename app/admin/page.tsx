"use client"
import { useState, useEffect } from "react"
import Link from "next/link"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ImageIcon, Building2, Star, Grid3X3, Users, Plus, Settings } from "lucide-react"

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    heroSlides: 0,
    departments: 0,
    featuredProducts: 0,
    categoryShowcase: 0,
    users: 0,
  })

  useEffect(() => {
    loadStats()
  }, [])

  const loadStats = async () => {
    try {
      // Load stats from APIs
      const [heroRes, deptRes, prodRes, catRes] = await Promise.all([
        fetch("/api/admin/hero-slides"),
        fetch("/api/admin/departments"),
        fetch("/api/admin/featured-products"),
        fetch("/api/admin/category-showcase"),
      ])

      const [heroData, deptData, prodData, catData] = await Promise.all([
        heroRes.json(),
        deptRes.json(),
        prodRes.json(),
        catRes.json(),
      ])

      setStats({
        heroSlides: heroData.length || 0,
        departments: deptData.length || 0,
        featuredProducts: prodData.length || 0,
        categoryShowcase: catData.length || 0,
        users: 2, // Mock data
      })
    } catch (error) {
      console.error("Failed to load stats:", error)
    }
  }

  const quickActions = [
    {
      title: "Hero Slides",
      description: "Gestionar slides del carrusel principal",
      icon: ImageIcon,
      href: "/admin/hero-slides",
      addHref: "/admin/hero-slides/new",
      count: stats.heroSlides,
    },
    {
      title: "Departments",
      description: "Administrar departamentos de productos",
      icon: Building2,
      href: "/admin/departments",
      addHref: "/admin/departments/new",
      count: stats.departments,
    },
    {
      title: "Featured Products",
      description: "Productos destacados en la página principal",
      icon: Star,
      href: "/admin/featured-products",
      addHref: "/admin/featured-products/new",
      count: stats.featuredProducts,
    },
    {
      title: "Category Showcase",
      description: "Vitrina de categorías destacadas",
      icon: Grid3X3,
      href: "/admin/category-showcase",
      addHref: "/admin/category-showcase/new",
      count: stats.categoryShowcase,
    },
    {
      title: "Users",
      description: "Gestionar usuarios y administradores",
      icon: Users,
      href: "/admin/users",
      addHref: "/admin/users/new",
      count: stats.users,
    },
    {
      title: "Site Settings",
      description: "Configuración del sitio, temas y banner",
      icon: Settings,
      href: "/admin/site-settings",
      addHref: null,
      count: null,
    },
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="mt-2 text-gray-600">Bienvenido al panel de administración de OASA</p>
      </div>

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {quickActions.map((action) => (
          <Card key={action.title} className="hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">{action.title}</CardTitle>
              <action.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{action.count ?? 'N/A'}</div>
              <CardDescription className="mt-2">{action.description}</CardDescription>
              <div className="mt-4 flex gap-2">
                <Button asChild size="sm">
                  <Link href={action.href}>Ver todos</Link>
                </Button>
                {action.addHref && (
                  <Button asChild variant="outline" size="sm">
                    <Link href={action.addHref}>
                      <Plus className="h-4 w-4 mr-1" />
                      Agregar
                    </Link>
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="mt-8">
        <Card>
          <CardHeader>
            <CardTitle>Acciones Rápidas</CardTitle>
            <CardDescription>Tareas comunes de administración</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/hero-slides/new">
                  <ImageIcon className="h-6 w-6 mb-2" />
                  Nuevo Slide
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/departments/new">
                  <Building2 className="h-6 w-6 mb-2" />
                  Nuevo Departamento
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/featured-products/new">
                  <Star className="h-6 w-6 mb-2" />
                  Producto Destacado
                </Link>
              </Button>
              <Button asChild variant="outline" className="h-20 flex-col bg-transparent">
                <Link href="/admin/category-showcase/new">
                  <Grid3X3 className="h-6 w-6 mb-2" />
                  Nueva Categoría
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
