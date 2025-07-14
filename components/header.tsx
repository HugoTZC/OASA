"use client"

import type React from "react"
import { Search, User, ShoppingCart, Menu, X, LogOut } from "lucide-react"
import Link from "next/link"
import { useState } from "react"
import { useAuth } from "@/contexts/auth-context"
import { useShoppingFeatures } from "@/hooks/use-shopping-features"

export function Header() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false)
  const { user, logout } = useAuth()
  const { shouldShowCart } = useShoppingFeatures()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery)}`
    }
  }

  const handleLogout = async () => {
    await logout()
    setIsUserMenuOpen(false)
  }

  return (
    <header className="bg-white shadow-sm relative">
      <div className="container mx-auto px-2 sm:px-4">
        {/* Main Header */}
        <div className="flex items-center justify-between py-2 sm:py-3 md:py-4 min-w-0">
          {/* Logo */}
          <Link href="/" className="flex items-center flex-shrink-0 min-w-0">
            <div className="w-16 h-6 sm:w-20 sm:h-8 md:w-32 md:h-12 bg-blue-800 rounded flex items-center justify-center flex-shrink-0">
              <span className="text-white font-bold text-xs sm:text-sm md:text-xl">OASA</span>
            </div>
            <div className="ml-1 sm:ml-2 hidden sm:block min-w-0">
              <div className="text-xs text-gray-600 truncate">La tienda de los expertos.</div>
            </div>
          </Link>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-gray-100"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>

          {/* Desktop Search Bar */}
          <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-blue-800 text-white rounded-r-md hover:bg-blue-900"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>

          {/* Desktop User Actions */}
          <div className="hidden md:flex items-center gap-4">
            {user ? (
              <div className="relative">
                <button
                  onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                  className="flex items-center gap-1 hover:bg-gray-100 px-2 py-1 rounded"
                >
                  <User className="w-5 h-5" />
                  <span className="text-sm">{user.name}</span>
                </button>

                {isUserMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border z-50">
                    <div className="py-1">
                      <div className="px-4 py-2 text-sm text-gray-500 border-b">{user.email}</div>
                      {user.role === "admin" ? (
                        <Link
                          href="/admin"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsUserMenuOpen(false)}
                        >
                          Panel de Admin
                        </Link>
                      ) : (
                        <>
                          <Link
                            href="/profile"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Mi Perfil
                          </Link>
                          <Link
                            href="/orders"
                            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                            onClick={() => setIsUserMenuOpen(false)}
                          >
                            Mis Pedidos
                          </Link>
                        </>
                      )}
                      <button
                        onClick={handleLogout}
                        className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Cerrar Sesión
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="text-sm text-gray-600">
                {/* <Link href="/auth/login" className="hover:underline">
                  Iniciar sesión
                </Link>
                <span className="mx-1">/</span>
                <Link href="/auth/register" className="hover:underline">
                  Registrar
                </Link> */}
              </div>
            )}

            {user?.role !== "admin" && shouldShowCart && (
              <Link href="/cart" className="flex items-center gap-2">
                <div className="relative">
                  {/* <ShoppingCart className="w-6 h-6" />
                  <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    0
                  </span> */}
                </div>
                <span className="text-sm">Carrito</span>
              </Link>
            )}
          </div>

          {/* Mobile Cart Icon */}
          {user?.role !== "admin" && shouldShowCart && (
            <Link href="/cart" className="md:hidden flex items-center">
              <div className="relative">
                <ShoppingCart className="w-6 h-6" />
                <span className="absolute -top-2 -right-2 bg-blue-800 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  0
                </span>
              </div>
            </Link>
          )}
        </div>

        {/* Mobile Search Bar */}
        <div className="md:hidden pb-3">
          <form onSubmit={handleSearch}>
            <div className="relative">
              <input
                type="text"
                placeholder="Buscar..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <button
                type="submit"
                className="absolute right-0 top-0 h-full px-4 bg-blue-800 text-white rounded-r-md hover:bg-blue-900"
              >
                <Search className="w-5 h-5" />
              </button>
            </div>
          </form>
        </div>

        {/* Desktop Navigation - Hide for admin users */}
        {user?.role !== "admin" && (
          <nav className="hidden md:block border-t border-gray-200">
            <ul className="flex items-center space-x-8 py-4 overflow-x-auto">
              <li>
                <Link href="/" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Inicio
                </Link>
              </li>
              <li>
                <Link href="/nosotros" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Nosotros
                </Link>
              </li>
              <li>
                <Link href="/productos" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Productos
                </Link>
              </li>
              {/* <li>
                <Link href="/creditos" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Créditos
                </Link>
              </li> */}
              {/* <li>
                <Link href="/servicios" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Servicios Industriales
                </Link>
              </li>
              <li>
                <Link href="/sucursales" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Sucursales
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Blog
                </Link>
              </li> */}
              {/* <li>
                <Link href="/atencion" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Atención a clientes
                </Link>
              </li> */}
              <li>
                <Link href="/catalogo" className="text-gray-700 hover:text-blue-800 whitespace-nowrap">
                  Catálogo de Productos
                </Link>
              </li>
            </ul>
          </nav>
        )}
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && user?.role !== "admin" && (
        <div className="md:hidden bg-white border-t border-gray-200 absolute top-full left-0 right-0 z-50 max-h-screen overflow-y-auto">
          <div className="px-4 py-2 space-y-1">
            {/* User Actions */}
            <div className="border-b border-gray-200 pb-3 mb-3">
              {user ? (
                <>
                  <div className="py-2 text-sm text-gray-600">{user.name}</div>
                  <button onClick={handleLogout} className="block py-2 text-gray-700 hover:text-blue-800 text-sm">
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <>
                  <Link href="/auth/login" className="block py-2 text-gray-700 hover:text-blue-800 text-sm">
                    Iniciar sesión
                  </Link>
                  <Link href="/auth/register" className="block py-2 text-gray-700 hover:text-blue-800 text-sm">
                    Registrar
                  </Link>
                </>
              )}
              <Link href="/cart" className="block py-2 text-gray-700 hover:text-blue-800 text-sm">
                Carrito
              </Link>
            </div>

            {/* Navigation Links */}
            <Link href="/" className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm">
              Inicio
            </Link>
            <Link
              href="/nosotros"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Nosotros
            </Link>
            <Link
              href="/productos"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Productos
            </Link>
            <Link
              href="/creditos"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Créditos
            </Link>
            <Link
              href="/servicios"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Servicios Industriales
            </Link>
            <Link
              href="/sucursales"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Sucursales
            </Link>
            <Link
              href="/blog"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Blog
            </Link>
            <Link
              href="/atencion"
              className="block py-3 text-gray-700 hover:text-blue-800 border-b border-gray-100 text-sm"
            >
              Atención a clientes
            </Link>
            <Link href="/catalogo" className="block py-3 text-gray-700 hover:text-blue-800 text-sm">
              Catálogo de Productos
            </Link>
          </div>
        </div>
      )}
    </header>
  )
}
