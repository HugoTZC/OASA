"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const { login, user, loading: authLoading } = useAuth()
  const router = useRouter()

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      console.log("User found, redirecting:", user)
      if (user.role === "admin") {
        console.log("Redirecting admin to /admin")
        router.push("/admin")
      } else {
        console.log("Redirecting customer to /")
        router.push("/")
      }
    }
  }, [user, authLoading, router])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")

    console.log("Attempting login with:", email)

    try {
      const result = await login(email, password)
      console.log("Login result:", result)

      if (result.success) {
        console.log("Login successful, redirecting...")
        // Don't redirect here, let the useEffect handle it
      } else {
        setError(result.error || "Error al iniciar sesión")
      }
    } catch (err) {
      console.error("Login error:", err)
      setError("Error de conexión")
    } finally {
      setLoading(false)
    }
  }

  // Show loading while checking auth
  if (authLoading) {
    return (
      <div className="flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div>
      <h2 className="text-center text-3xl font-extrabold text-gray-900 mb-6">Iniciar Sesión</h2>

      {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <Label htmlFor="email">Correo Electrónico</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="mt-1"
            placeholder="tu@email.com"
            disabled={loading}
          />
        </div>

        <div>
          <Label htmlFor="password">Contraseña</Label>
          <Input
            id="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="mt-1"
            placeholder="••••••••"
            disabled={loading}
          />
        </div>

        <Button type="submit" disabled={loading} className="w-full">
          {loading ? "Iniciando sesión..." : "Iniciar Sesión"}
        </Button>
      </form>

      <div className="mt-6 text-center">
        <p className="text-sm text-gray-600">
          ¿No tienes cuenta?{" "}
          <Link href="/auth/register" className="text-blue-600 hover:text-blue-500">
            Regístrate aquí
          </Link>
        </p>
      </div>

      <div className="mt-4 p-3 bg-blue-50 rounded text-sm text-blue-700">
        <strong>Cuentas de prueba:</strong>
        <br />
        <strong>Admin:</strong> admin@oasa.com
        <br />
        <strong>Cliente:</strong> user@example.com
        <br />
        <strong>Contraseña:</strong> cualquiera
      </div>

      <div className="mt-4 text-center">
        <Link href="/" className="text-sm text-blue-600 hover:text-blue-500">
          ← Volver al sitio web
        </Link>
      </div>
    </div>
  )
}
