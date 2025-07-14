"use client"

import { useState, useEffect } from "react"
import { Settings, Wrench, Car, Fuel, Zap, Cog } from "lucide-react"
import Link from "next/link"
import type { Department } from "@/types/admin"

// Icon mapping
const iconMap = {
  Settings,
  Wrench,
  Car,
  Fuel,
  Zap,
  Cog,
}

export function DepartmentsSection() {
  const [departments, setDepartments] = useState<Department[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchDepartments()
  }, [])

  const fetchDepartments = async () => {
    try {
      const response = await fetch("/api/admin/departments")
      const data = await response.json()
      if (data.success) {
        setDepartments(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch departments:", error)
      // Fallback to static data if API fails
      setDepartments([
        {
          id: "1",
          name: "Gases Industriales",
          icon: "Settings",
          color: "bg-blue-800",
          href: "/productos?categoria=Gases Industriales",
          order: 1,
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
      <section className="py-6 sm:py-8 md:py-16 bg-gray-50">
        <div className="container mx-auto px-2 sm:px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-48 mb-6"></div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-8">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col items-center">
                  <div className="w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 bg-gray-200 rounded-full mb-2 sm:mb-3 md:mb-4"></div>
                  <div className="h-4 bg-gray-200 rounded w-20"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-6 sm:py-8 md:py-16 bg-gray-50">
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 sm:mb-8 md:mb-12">
          <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-0">Departamentos</h2>
          {/* <Link href="/departamentos" className="text-blue-800 hover:underline font-medium text-sm sm:text-base">
            Ver Más
          </Link> */}
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4 md:gap-8">
          {departments.map((dept) => {
            const IconComponent = iconMap[dept.icon as keyof typeof iconMap] || Settings
            return (
              <Link key={dept.id} href={dept.href} className="flex flex-col items-center group">
                <div
                  className={`${dept.color} w-12 h-12 sm:w-16 sm:h-16 md:w-24 md:h-24 rounded-full flex items-center justify-center mb-2 sm:mb-3 md:mb-4 group-hover:scale-110 transition-transform duration-200`}
                >
                  <IconComponent className="w-6 h-6 sm:w-8 sm:h-8 md:w-12 md:h-12 text-white" />
                </div>
                <span className="text-gray-700 font-medium text-center text-xs sm:text-sm md:text-base group-hover:text-blue-800 leading-tight px-1">
                  {dept.name}
                </span>
              </Link>
            )
          })}
        </div>
      </div>
    </section>
  )
}
