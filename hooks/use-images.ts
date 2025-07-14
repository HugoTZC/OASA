"use client"

import { useState, useEffect } from 'react'
import { imagesService, ImageData, ImageResponse } from '@/lib/images'

/**
 * Hook for fetching product images
 */
export function useProductImages(
  productId: string | number | null,
  options: {
    size?: string
    count?: number
    seed?: string
  } = {}
) {
  const [images, setImages] = useState<ImageData | ImageData[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!productId) return

    setLoading(true)
    setError(null)

    imagesService.getProductImages(productId, options)
      .then((response: ImageResponse) => {
        if (response.success) {
          setImages(response.images || null)
        } else {
          setError(response.error || 'Failed to load images')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load images')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [productId, options.size, options.count, options.seed])

  return { images, loading, error }
}

/**
 * Hook for fetching category images
 */
export function useCategoryImage(category: string | null, size = '1200x400') {
  const [image, setImage] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!category) return

    setLoading(true)
    setError(null)

    imagesService.getCategoryImage(category, size)
      .then((response: ImageResponse) => {
        if (response.success) {
          setImage(response.image || null)
        } else {
          setError(response.error || 'Failed to load image')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load image')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [category, size])

  return { image, loading, error }
}

/**
 * Hook for fetching hero images
 */
export function useHeroImages(options: {
  count?: number
  size?: string
} = {}) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    imagesService.getHeroImages(options)
      .then((response: ImageResponse) => {
        if (response.success && Array.isArray(response.images)) {
          setImages(response.images)
        } else {
          setError(response.error || 'Failed to load images')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load images')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [options.count, options.size])

  return { images, loading, error }
}

/**
 * Hook for fetching random images
 */
export function useRandomImages(options: {
  size?: string
  count?: number
  category?: string
} = {}) {
  const [images, setImages] = useState<ImageData | ImageData[] | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchImages = () => {
    setLoading(true)
    setError(null)

    imagesService.getRandomImages(options)
      .then((response: ImageResponse) => {
        if (response.success) {
          setImages(response.images || null)
        } else {
          setError(response.error || 'Failed to load images')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load images')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchImages()
  }, [options.size, options.count, options.category])

  return { images, loading, error, refresh: fetchImages }
}

/**
 * Hook for fetching gallery images with pagination
 */
export function useGalleryImages(
  type: string,
  options: {
    page?: number
    limit?: number
    size?: string
  } = {}
) {
  const [images, setImages] = useState<ImageData[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [currentPage, setCurrentPage] = useState(options.page || 1)

  const fetchImages = (page = currentPage) => {
    setLoading(true)
    setError(null)

    imagesService.getGalleryImages(type, { ...options, page })
      .then((response: ImageResponse) => {
        if (response.success && Array.isArray(response.images)) {
          if (page === 1) {
            setImages(response.images)
          } else {
            setImages(prev => [...prev, ...response.images as ImageData[]])
          }
          setCurrentPage(page)
        } else {
          setError(response.error || 'Failed to load images')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load images')
      })
      .finally(() => {
        setLoading(false)
      })
  }

  useEffect(() => {
    fetchImages(1)
  }, [type, options.limit, options.size])

  const loadMore = () => {
    fetchImages(currentPage + 1)
  }

  return { images, loading, error, currentPage, loadMore }
}

/**
 * Hook for getting placeholder images
 */
export function usePlaceholderImage(options: {
  size?: string
  type?: string
  grayscale?: boolean
  blur?: number
} = {}) {
  const [image, setImage] = useState<ImageData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setLoading(true)
    setError(null)

    imagesService.getPlaceholderImage(options)
      .then((response: ImageResponse) => {
        if (response.success) {
          setImage(response.image || null)
        } else {
          setError(response.error || 'Failed to load image')
        }
      })
      .catch((err) => {
        setError(err.message || 'Failed to load image')
      })
      .finally(() => {
        setLoading(false)
      })
  }, [options.size, options.type, options.grayscale, options.blur])

  return { image, loading, error }
}
