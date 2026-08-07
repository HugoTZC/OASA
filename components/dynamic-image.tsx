"use client"

import { useState } from "react"

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, '') || 'http://localhost:5000';

function isAbsoluteUrl(str: string): boolean {
  return str.startsWith('http://') || str.startsWith('https://') || str.startsWith('//')
}

function fixMalformedUrl(url: string): string {
  const httpsDoubleSlash = url.indexOf('https//')
  if (httpsDoubleSlash !== -1) {
    return 'https://' + url.substring(httpsDoubleSlash + 6)
  }
  const httpDoubleSlash = url.indexOf('http//')
  if (httpDoubleSlash !== -1) {
    return 'http://' + url.substring(httpDoubleSlash + 5)
  }
  return url
}

function resolveImageSrc(imagePath: string | undefined, backendUrl: string): string {
  if (!imagePath) return '/placeholder.svg'

  let resolved = imagePath

  if (isAbsoluteUrl(resolved)) {
    if (resolved.startsWith('//')) {
      return `https:${resolved}`
    }
    resolved = fixMalformedUrl(resolved)
    return resolved
  }

  if (resolved.startsWith('/')) {
    return `${backendUrl}${resolved}`
  }

  return `${backendUrl}/${resolved}`
}

interface DynamicImageProps {
  src?: string
  fallback?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}

export function DynamicImage({
  fallback = "/placeholder.svg",
  alt = "",
  width,
  height,
  className = "",
  src,
}: DynamicImageProps) {
  const [useFallback, setUseFallback] = useState(false)

  const handleError = () => {
    setUseFallback(true)
  }

  const imageSrc = useFallback ? fallback : resolveImageSrc(src, BACKEND_URL)

  const getOptimizedSrc = (originalSrc: string) => {
    if (originalSrc.startsWith('/images/')) {
      return `/api/images/proxy?path=${encodeURIComponent(originalSrc)}`
    }
    if (originalSrc.startsWith(`${BACKEND_URL}/images/`)) {
      const path = originalSrc.replace(BACKEND_URL, '')
      return `/api/images/proxy?path=${encodeURIComponent(path)}`
    }
    return originalSrc
  }

  const displaySrc = imageSrc.startsWith(BACKEND_URL) || imageSrc.startsWith('/images/')
    ? getOptimizedSrc(imageSrc)
    : imageSrc

  return (
    <img
      src={displaySrc}
      alt={alt}
      width={width}
      height={height}
      className={className}
      onError={handleError}
    />
  )
}

export function ProductImage(props: {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}) {
  return <DynamicImage {...props} />
}

export function CategoryImage(props: {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}) {
  return <DynamicImage {...props} />
}

export function HeroImage(props: {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}) {
  return <DynamicImage {...props} />
}

export function RandomImage(props: {
  src?: string
  alt?: string
  width?: number
  height?: number
  className?: string
}) {
  return <DynamicImage {...props} />
}