"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Eye, EyeOff, ExternalLink } from "lucide-react"
import type { Department } from "@/types/admin"

const iconOptions = [
  { value: "Settings", label: "Settings (⚙️)" },
  { value: "Wrench", label: "Wrench (🔧)" },
  { value: "Car", label: "Car (🚗)" },
  { value: "Fuel", label: "Fuel (⛽)" },
  { value: "Zap", label: "Zap (⚡)" },
  { value: "Cog", label: "Cog (⚙️)" },
]

export default function DepartmentsAdmin() {
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
    } finally {
      setLoading(false)
    }
  }

  const toggleDepartmentStatus = async (id: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !isActive }),
      })

      if (response.ok) {
        fetchDepartments()
      }
    } catch (error) {
      console.error("Failed to update department:", error)
    }
  }

  const deleteDepartment = async (id: string) => {
    if (!confirm("Are you sure you want to delete this department?")) return

    try {
      const response = await fetch(`/api/admin/departments/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchDepartments()
      }
    } catch (error) {
      console.error("Failed to delete department:", error)
    }
  }

  const getIconLabel = (iconValue: string) => {
    const icon = iconOptions.find((opt) => opt.value === iconValue)
    return icon ? icon.label : iconValue
  }

  if (loading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Departments</h1>
          <p className="text-gray-600 mt-2">Manage homepage department sections</p>
        </div>
        <Link
          href="/admin/departments/new"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Department
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Icon</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Department
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Link</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {departments.map((department) => (
              <tr key={department.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className={`w-12 h-12 ${department.color} rounded-full flex items-center justify-center`}>
                    <span className="text-white text-xs">{getIconLabel(department.icon).split(" ")[1]}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div>
                    <div className="text-sm font-medium text-gray-900">{department.name}</div>
                    <div className="text-sm text-gray-500">{getIconLabel(department.icon)}</div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="text-xs text-blue-600 flex items-center">
                    <ExternalLink className="w-3 h-3 mr-1" />
                    {department.href}
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{department.order}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <button
                    onClick={() => toggleDepartmentStatus(department.id, department.isActive)}
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      department.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
                    }`}
                  >
                    {department.isActive ? (
                      <>
                        <Eye className="w-3 h-3 mr-1" />
                        Active
                      </>
                    ) : (
                      <>
                        <EyeOff className="w-3 h-3 mr-1" />
                        Inactive
                      </>
                    )}
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <Link
                      href={`/admin/departments/${department.id}/edit`}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      <Edit className="w-4 h-4" />
                    </Link>
                    <button onClick={() => deleteDepartment(department.id)} className="text-red-600 hover:text-red-900">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {departments.length === 0 && (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-4">No departments found</div>
            <Link
              href="/admin/departments/new"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              Add First Department
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
