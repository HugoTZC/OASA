"use client"

import type React from "react"

import { useAuth } from "@/contexts/auth-context"
import { useRouter } from "next/navigation"
import { useEffect } from "react"
import Link from "next/link"
import { LayoutDashboard, ImageIcon, Package, Star, Grid3X3, Users, LogOut, Settings, CreditCard } from "lucide-react"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, logout, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && (!user || user.role !== "admin")) {
      router.push("/auth/login")
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-800 mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando...</p>
        </div>
      </div>
    )
  }

  if (!user || user.role !== "admin") {
    return null
  }

  const handleLogout = async () => {
    await logout()
    router.push("/auth/login")
  }

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-8 h-8 bg-blue-800 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">O</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Panel de Administración</h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-600">Bienvenido, {user.name}</span>
              <button onClick={handleLogout} className="flex items-center space-x-2 text-gray-600 hover:text-gray-900">
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Salir</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-6">
            <ul className="space-y-2">
              <li>
                <Link
                  href="/admin"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  <span>Dashboard</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/hero-slides"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <ImageIcon className="w-5 h-5" />
                  <span>Hero Slides</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/departments"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Package className="w-5 h-5" />
                  <span>Departamentos</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/featured-products"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Star className="w-5 h-5" />
                  <span>Productos Destacados</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/category-showcase"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Grid3X3 className="w-5 h-5" />
                  <span>Showcase Categorías</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/users"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Users className="w-5 h-5" />
                  <span>Usuarios</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/shopping-settings"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                  <span>Configuración Shopping</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/site-settings"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Settings className="w-5 h-5" />
                  <span>Configuración del Sitio</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/subscription-management"
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-gray-100"
                >
                  <Package className="w-5 h-5" />
                  <span>Características E-commerce</span>
                </Link>
              </li>
            </ul>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">{children}</main>
      </div>
    </div>
  )
}
