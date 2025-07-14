"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"

const iconOptions = [
  { value: "Settings", label: "Settings", emoji: "⚙️" },
  { value: "Wrench", label: "Wrench", emoji: "🔧" },
  { value: "Car", label: "Car", emoji: "🚗" },
  { value: "Fuel", label: "Fuel", emoji: "⛽" },
  { value: "Zap", label: "Zap", emoji: "⚡" },
  { value: "Cog", label: "Cog", emoji: "⚙️" },
]

const colorOptions = [
  { value: "bg-blue-800", label: "Blue", color: "#1e40af" },
  { value: "bg-green-800", label: "Green", color: "#166534" },
  { value: "bg-purple-800", label: "Purple", color: "#6b21a8" },
  { value: "bg-red-800", label: "Red", color: "#991b1b" },
  { value: "bg-orange-800", label: "Orange", color: "#9a3412" },
  { value: "bg-gray-800", label: "Gray", color: "#1f2937" },
]

export default function EditDepartment({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    icon: "Settings",
    color: "bg-blue-800",
    href: "",
    order: 1,
    isActive: true,
  })

  useEffect(() => {
    fetchDepartment()
  }, [params.id])

  const fetchDepartment = async () => {
    try {
      const response = await fetch(`/api/admin/departments/${params.id}`)
      const data = await response.json()
      if (data.success) {
        const department = data.data
        setFormData({
          name: department.name,
          icon: department.icon,
          color: department.color,
          href: department.href,
          order: department.order,
          isActive: department.isActive,
        })
      }
    } catch (error) {
      console.error("Failed to fetch department:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/departments/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/departments")
      } else {
        alert("Failed to update department")
      }
    } catch (error) {
      console.error("Failed to update department:", error)
      alert("Failed to update department")
    } finally {
      setLoading(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const selectedIcon = iconOptions.find((icon) => icon.value === formData.icon)
  const selectedColor = colorOptions.find((color) => color.value === formData.color)

  if (initialLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Link href="/admin/departments" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Department</h1>
          <p className="text-gray-600 mt-2">Update department section</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Department Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Gases Industriales"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Icon</label>
                <select
                  name="icon"
                  value={formData.icon}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {iconOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.emoji} {option.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                <div className="grid grid-cols-3 gap-2">
                  {colorOptions.map((option) => (
                    <label key={option.value} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="color"
                        value={option.value}
                        checked={formData.color === option.value}
                        onChange={handleChange}
                        className="sr-only"
                      />
                      <div
                        className={`w-6 h-6 rounded-full mr-2 ${option.value} ${formData.color === option.value ? "ring-2 ring-offset-2 ring-gray-400" : ""}`}
                      ></div>
                      <span className="text-sm">{option.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Link URL</label>
                <input
                  type="text"
                  name="href"
                  value={formData.href}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/productos?categoria=Department Name"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Order</label>
                  <input
                    type="number"
                    name="order"
                    value={formData.order}
                    onChange={handleChange}
                    min="1"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="isActive"
                    checked={formData.isActive}
                    onChange={handleChange}
                    className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  />
                  <label className="ml-2 block text-sm text-gray-900">Active</label>
                </div>
              </div>

              <div className="flex justify-end space-x-4 mt-8">
                <Link
                  href="/admin/departments"
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </Link>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
                >
                  <Save className="w-4 h-4 mr-2" />
                  {loading ? "Updating..." : "Update Department"}
                </button>
              </div>
            </form>
          </div>

          {/* Preview */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center mb-4">
              <Eye className="w-5 h-5 mr-2 text-gray-600" />
              <h3 className="text-lg font-semibold text-gray-900">Preview</h3>
            </div>

            <div className="flex flex-col items-center group cursor-pointer">
              <div
                className={`${formData.color} w-24 h-24 rounded-full flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-200`}
              >
                <span className="text-white text-2xl">{selectedIcon?.emoji}</span>
              </div>
              <span className="text-gray-700 font-medium text-center group-hover:text-blue-800 leading-tight px-1">
                {formData.name || "Department Name"}
              </span>
            </div>

            <div className="mt-6 p-3 bg-gray-100 rounded-md">
              <div className="text-sm text-gray-600">
                <strong>Icon:</strong> {selectedIcon?.label} {selectedIcon?.emoji}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Color:</strong> {selectedColor?.label}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Link:</strong> {formData.href || "/productos?categoria=..."}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Order:</strong> {formData.order}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Status:</strong>{" "}
                <span className={formData.isActive ? "text-green-600" : "text-red-600"}>
                  {formData.isActive ? "Active" : "Inactive"}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
