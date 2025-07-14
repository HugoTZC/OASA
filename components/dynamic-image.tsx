"use client"

import { useState } from 'react'
import Image, { ImageProps } from 'next/image'
import { imagesService } from '@/lib/images'

interface DynamicImageProps extends Omit<ImageProps, 'src'> {
  /**
   * Type of image to fetch
   */
  type?: 'product' | 'category' | 'hero' | 'placeholder' | 'random'
  
  /**
   * Product ID (for product images)
   */
  productId?: string | number
  
  /**
   * Category name (for category images)
   */
  category?: string
  
  /**
   * Custom seed for consistent random images
   */
  seed?: string
  
  /**
   * Image size in format "widthxheight" or just "width" for square
   */
  size?: string
  
  /**
   * Fallback image URL
   */
  fallback?: string
  
  /**
   * Whether to apply grayscale effect
   */
  grayscale?: boolean
  
  /**
   * Blur amount (1-10)
   */
  blur?: number
  
  /**
   * Image variant (for different styles)
   */
  variant?: string
}

export function DynamicImage({
  type = 'placeholder',
  productId,
  category,
  seed,
  size,
  fallback = '/placeholder.svg',
  grayscale = false,
  blur,
  variant,
  alt = '',
  width,
  height,
  className = '',
  ...props
}: DynamicImageProps) {
  const [src, setSrc] = useState<string>('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)

  // Generate image URL based on type and options
  const generateImageUrl = () => {
    const imageSize = size || `${width}x${height}` || '400'
    
    switch (type) {
      case 'product':
        if (productId) {
          const productSeed = seed || `product-${productId}${variant ? `-${variant}` : ''}`
          return imagesService.generatePicsumUrl({
            width: parseInt(imageSize.split('x')[0]),
            height: parseInt(imageSize.split('x')[1] || imageSize.split('x')[0]),
            seed: productSeed,
            grayscale,
            blur
          })
        }
        break
        
      case 'category':
        if (category) {
          const categorySeed = `category-${category}${variant ? `-${variant}` : ''}`
          return imagesService.generatePicsumUrl({
            width: parseInt(imageSize.split('x')[0]),
            height: parseInt(imageSize.split('x')[1] || imageSize.split('x')[0]),
            seed: categorySeed,
            grayscale,
            blur
          })
        }
        break
        
      case 'hero':
        const heroSeed = seed || `hero${variant ? `-${variant}` : ''}`
        return imagesService.generatePicsumUrl({
          width: parseInt(imageSize.split('x')[0]),
          height: parseInt(imageSize.split('x')[1] || imageSize.split('x')[0]),
          seed: heroSeed,
          grayscale,
          blur
        })
        
      case 'random':
        return imagesService.generatePicsumUrl({
          width: parseInt(imageSize.split('x')[0]),
          height: parseInt(imageSize.split('x')[1] || imageSize.split('x')[0]),
          seed: seed,
          grayscale,
          blur,
          random: !seed
        })
        
      case 'placeholder':
      default:
        const placeholderSeed = seed || `placeholder${variant ? `-${variant}` : ''}`
        return imagesService.generatePicsumUrl({
          width: parseInt(imageSize.split('x')[0]),
          height: parseInt(imageSize.split('x')[1] || imageSize.split('x')[0]),
          seed: placeholderSeed,
          grayscale,
          blur
        })
    }
    
    return fallback
  }

  // Initialize image URL
  useState(() => {
    const url = generateImageUrl()
    setSrc(url)
    setLoading(false)
  })

  const handleError = () => {
    setError(true)
    setSrc(fallback)
    setLoading(false)
  }

  const handleLoad = () => {
    setError(false)
    setLoading(false)
  }

  return (
    <div className={`relative ${loading ? 'animate-pulse bg-gray-200' : ''}`}>
      <Image
        src={src || fallback}
        alt={alt}
        width={width}
        height={height}
        className={`${className} ${loading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`}
        onError={handleError}
        onLoad={handleLoad}
        {...props}
      />
      
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
          <div className="w-8 h-8 border-2 border-gray-300 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
      )}
      
      {error && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-100 text-gray-500 text-sm">
          <span>Image not available</span>
        </div>
      )}
    </div>
  )
}

/**
 * Product Image Component
 */
export function ProductImage({
  productId,
  seed,
  variant,
  ...props
}: Omit<DynamicImageProps, 'type'> & { productId: string | number }) {
  return (
    <DynamicImage
      type="product"
      productId={productId}
      seed={seed}
      variant={variant}
      {...props}
    />
  )
}

/**
 * Category Image Component
 */
export function CategoryImage({
  category,
  variant,
  ...props
}: Omit<DynamicImageProps, 'type'> & { category: string }) {
  return (
    <DynamicImage
      type="category"
      category={category}
      variant={variant}
      {...props}
    />
  )
}

/**
 * Hero Image Component
 */
export function HeroImage({
  seed,
  variant,
  ...props
}: Omit<DynamicImageProps, 'type'>) {
  return (
    <DynamicImage
      type="hero"
      seed={seed}
      variant={variant}
      {...props}
    />
  )
}

/**
 * Random Image Component
 */
export function RandomImage({
  seed,
  variant,
  ...props
}: Omit<DynamicImageProps, 'type'>) {
  return (
    <DynamicImage
      type="random"
      seed={seed}
      variant={variant}
      {...props}
    />
  )
}
