/**
 * Images Service
 * Frontend service to consume the backend images API
 */

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3001'

export interface ImageData {
  id: string | number
  url: string
  thumbnail?: string
  alt: string
  title?: string
  description?: string
  size: {
    width: number
    height: number
  }
}

export interface ImageResponse {
  success: boolean
  images?: ImageData | ImageData[]
  image?: ImageData
  error?: string
}

class ImagesService {
  /**
   * Get product images
   */
  async getProductImages(productId: string | number, options: {
    size?: string
    count?: number
    seed?: string
  } = {}): Promise<ImageResponse> {
    try {
      const params = new URLSearchParams()
      if (options.size) params.append('size', options.size)
      if (options.count) params.append('count', options.count.toString())
      if (options.seed) params.append('seed', options.seed)

      const response = await fetch(
        `${BACKEND_URL}/api/images/product/${productId}?${params}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching product images:', error)
      return {
        success: false,
        error: 'Failed to fetch product images'
      }
    }
  }

  /**
   * Get category banner image
   */
  async getCategoryImage(category: string, size = '1200x400'): Promise<ImageResponse> {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/images/category/${encodeURIComponent(category)}?size=${size}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching category image:', error)
      return {
        success: false,
        error: 'Failed to fetch category image'
      }
    }
  }

  /**
   * Get hero/carousel images
   */
  async getHeroImages(options: {
    count?: number
    size?: string
  } = {}): Promise<ImageResponse> {
    try {
      const params = new URLSearchParams()
      if (options.count) params.append('count', options.count.toString())
      if (options.size) params.append('size', options.size)

      const response = await fetch(
        `${BACKEND_URL}/api/images/hero?${params}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching hero images:', error)
      return {
        success: false,
        error: 'Failed to fetch hero images'
      }
    }
  }

  /**
   * Get placeholder image
   */
  async getPlaceholderImage(options: {
    size?: string
    type?: string
    grayscale?: boolean
    blur?: number
  } = {}): Promise<ImageResponse> {
    try {
      const params = new URLSearchParams()
      if (options.size) params.append('size', options.size)
      if (options.type) params.append('type', options.type)
      if (options.grayscale) params.append('grayscale', 'true')
      if (options.blur) params.append('blur', options.blur.toString())

      const response = await fetch(
        `${BACKEND_URL}/api/images/placeholder?${params}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching placeholder image:', error)
      return {
        success: false,
        error: 'Failed to fetch placeholder image'
      }
    }
  }

  /**
   * Get random images
   */
  async getRandomImages(options: {
    size?: string
    count?: number
    category?: string
  } = {}): Promise<ImageResponse> {
    try {
      const params = new URLSearchParams()
      if (options.size) params.append('size', options.size)
      if (options.count) params.append('count', options.count.toString())
      if (options.category) params.append('category', options.category)

      const response = await fetch(
        `${BACKEND_URL}/api/images/random?${params}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching random images:', error)
      return {
        success: false,
        error: 'Failed to fetch random images'
      }
    }
  }

  /**
   * Get gallery images
   */
  async getGalleryImages(type: string, options: {
    page?: number
    limit?: number
    size?: string
  } = {}): Promise<ImageResponse> {
    try {
      const params = new URLSearchParams()
      if (options.page) params.append('page', options.page.toString())
      if (options.limit) params.append('limit', options.limit.toString())
      if (options.size) params.append('size', options.size)

      const response = await fetch(
        `${BACKEND_URL}/api/images/gallery/${type}?${params}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching gallery images:', error)
      return {
        success: false,
        error: 'Failed to fetch gallery images'
      }
    }
  }

  /**
   * Get image info
   */
  async getImageInfo(seed: string): Promise<ImageResponse> {
    try {
      const response = await fetch(
        `${BACKEND_URL}/api/images/info/${encodeURIComponent(seed)}`
      )
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }
      
      return await response.json()
    } catch (error) {
      console.error('Error fetching image info:', error)
      return {
        success: false,
        error: 'Failed to fetch image info'
      }
    }
  }

  /**
   * Generate direct Picsum URL (for cases where you need immediate URL without API call)
   */
  generatePicsumUrl(options: {
    width: number
    height?: number
    seed?: string
    id?: number
    grayscale?: boolean
    blur?: number
    random?: boolean
  }): string {
    const { width, height = width, seed, id, grayscale, blur, random } = options
    let url = 'https://picsum.photos'

    if (id) {
      url += `/id/${id}`
    } else if (seed) {
      url += `/seed/${seed}`
    }

    url += `/${width}/${height}`

    const effects = []
    if (grayscale) effects.push('grayscale')
    if (blur) effects.push(`blur=${blur}`)
    if (random) effects.push(`random=${Date.now()}`)

    if (effects.length > 0) {
      url += '?' + effects.join('&')
    }

    return url
  }
}

export const imagesService = new ImagesService()
export default imagesService
