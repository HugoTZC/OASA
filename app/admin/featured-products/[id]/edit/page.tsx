"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, Save, Eye } from "lucide-react"

const categoryOptions = [
  "Gases Industriales",
  "Equipos de Soldadura",
  "Herramientas",
  // "Autopartes",
  "Equipos Neumáticos",
  "Seguridad Industrial",
]

export default function EditFeaturedProduct({ params }: { params: { id: string } }) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [initialLoading, setInitialLoading] = useState(true)
  const [formData, setFormData] = useState({
    name: "",
    category: "Gases Industriales",
    price: "",
    originalPrice: "",
    image: "",
    href: "",
    order: 1,
    isActive: true,
  })

  useEffect(() => {
    fetchProduct()
  }, [params.id])

  const fetchProduct = async () => {
    try {
      const response = await fetch(`/api/admin/featured-products/${params.id}`)
      const data = await response.json()
      if (data.success) {
        const product = data.data
        setFormData({
          name: product.name,
          category: product.category,
          price: product.price.toString(),
          originalPrice: product.originalPrice ? product.originalPrice.toString() : "",
          image: product.image,
          href: product.href,
          order: product.order,
          isActive: product.isActive,
        })
      }
    } catch (error) {
      console.error("Failed to fetch product:", error)
    } finally {
      setInitialLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch(`/api/admin/featured-products/${params.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (response.ok) {
        router.push("/admin/featured-products")
      } else {
        alert("Failed to update featured product")
      }
    } catch (error) {
      console.error("Failed to update featured product:", error)
      alert("Failed to update featured product")
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

  const price = Number.parseFloat(formData.price) || 0
  const originalPrice = Number.parseFloat(formData.originalPrice) || 0
  const hasDiscount = originalPrice > 0 && originalPrice > price

  if (initialLoading) {
    return <div className="flex justify-center items-center h-64">Loading...</div>
  }

  return (
    <div>
      <div className="flex items-center mb-8">
        <Link href="/admin/featured-products" className="mr-4 p-2 hover:bg-gray-100 rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Edit Featured Product</h1>
          <p className="text-gray-600 mt-2">Update featured product showcase</p>
        </div>
      </div>

      <div className="max-w-4xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Form */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="e.g., Tanque de Oxígeno Industrial"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  {categoryOptions.map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Price ($)</label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1250.00"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Original Price ($) <span className="text-gray-500">(optional)</span>
                  </label>
                  <input
                    type="number"
                    name="originalPrice"
                    value={formData.originalPrice}
                    onChange={handleChange}
                    step="0.01"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="1400.00"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Image URL</label>
                <input
                  type="url"
                  name="image"
                  value={formData.image}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="https://example.com/product-image.jpg"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Product Link</label>
                <input
                  type="text"
                  name="href"
                  value={formData.href}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="/productos/product-slug"
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
                  href="/admin/featured-products"
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
                  {loading ? "Updating..." : "Update Product"}
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

            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
                {formData.image ? (
                  <img
                    src={formData.image || "/placeholder.svg"}
                    alt={formData.name || "Product"}
                    className="object-contain w-full h-full"
                    onError={(e) => {
                      e.currentTarget.style.display = "none"
                    }}
                  />
                ) : (
                  <div className="text-gray-400 text-center">
                    <div className="text-4xl mb-2">📦</div>
                    <div className="text-sm">Product Image</div>
                  </div>
                )}
              </div>
              <div className="p-4">
                <span className="text-xs text-blue-800 font-medium">{formData.category}</span>
                <h3 className="font-semibold text-gray-900 mt-1 line-clamp-2">{formData.name || "Product Name"}</h3>
                <div className="mt-2">
                  <span className="text-lg font-bold text-gray-900">${price.toLocaleString() || "0"}</span>
                  {hasDiscount && (
                    <span className="ml-2 text-sm text-gray-500 line-through">${originalPrice.toLocaleString()}</span>
                  )}
                </div>
              </div>
            </div>

            <div className="mt-4 p-3 bg-gray-100 rounded-md">
              <div className="text-sm text-gray-600">
                <strong>Category:</strong> {formData.category}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Price:</strong> ${price.toLocaleString() || "0"}
                {hasDiscount && (
                  <span className="text-green-600 ml-2">
                    ({Math.round(((originalPrice - price) / originalPrice) * 100)}% off)
                  </span>
                )}
              </div>
              <div className="text-sm text-gray-600 mt-1">
                <strong>Link:</strong> {formData.href || "/productos/..."}
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
