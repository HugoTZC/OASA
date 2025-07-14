// Hero Carousel Types
export interface HeroSlide {
  id: string
  title: string
  subtitle: string
  cta: string
  image: string
  background: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Department Types
export interface Department {
  id: string
  name: string
  icon: string
  color: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Featured Product Types
export interface FeaturedProduct {
  id: string
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Category Showcase Types
export interface CategoryShowcase {
  id: string
  name: string
  description: string
  productCount: string
  image: string
  href: string
  order: number
  isActive: boolean
  createdAt: string
  updatedAt: string
}

// Admin User Types
export interface AdminUser {
  id: string
  email: string
  name: string
  role: "admin" | "editor"
  createdAt: string
  updatedAt: string
}

// API Response Types
export interface ApiResponse<T> {
  success: boolean
  data?: T
  message?: string
  error?: string
}

export interface PaginatedResponse<T> {
  success: boolean
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}
