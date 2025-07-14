"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { HeroImage } from "./dynamic-image"
import { useHeroImages } from "@/hooks/use-images"
import type { HeroSlide } from "@/types/admin"

export function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  // Get hero images from API
  const { images: heroImages, loading: heroImagesLoading } = useHeroImages({ 
    count: 5, 
    size: '600x400' 
  })

  useEffect(() => {
    fetchSlides()
  }, [])

  useEffect(() => {
    if (slides.length > 0) {
      setIsLoaded(true)
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 5000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

  const fetchSlides = async () => {
    try {
      const response = await fetch("/api/admin/hero-slides")
      const data = await response.json()
      if (data.success) {
        setSlides(data.data)
      }
    } catch (error) {
      console.error("Failed to fetch slides:", error)
      // Fallback to static data if API fails
      setSlides([
        {
          id: "1",
          title: "VISITA NUESTRO",
          subtitle: "CATÁLOGO DIGITAL",
          cta: "HAZ CLIC AQUÍ",
          image: "/images/hero-tablet.png",
          background: "bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900",
          order: 1,
          isActive: true,
          createdAt: "",
          updatedAt: "",
        },
      ])
    }
  }

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  if (!isLoaded || slides.length === 0) {
    return (
      <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 bg-gray-200 animate-pulse flex items-center justify-center">
        <div className="text-gray-400">Cargando...</div>
      </div>
    )
  }

  return (
    <div className="relative h-48 sm:h-64 md:h-80 lg:h-96 overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`${slide.background} h-full flex items-center relative overflow-hidden`}>
            {/* Decorative elements - hidden on mobile */}
            <div className="absolute inset-0 opacity-20 hidden md:block">
              <div className="absolute top-10 left-20 w-32 h-1 bg-yellow-400 transform -rotate-12"></div>
              <div className="absolute top-32 left-40 w-24 h-1 bg-white transform rotate-45"></div>
              <div className="absolute bottom-20 left-10 w-40 h-1 bg-yellow-400 transform rotate-12"></div>
              <div className="absolute top-20 right-32 w-28 h-1 bg-white transform -rotate-45"></div>
              <div className="absolute bottom-32 right-20 w-36 h-1 bg-yellow-400 transform rotate-45"></div>
            </div>

            <div className="container mx-auto px-2 sm:px-4 flex flex-col md:flex-row items-center justify-between min-w-0">
              <div className="flex-1 text-white text-center md:text-left mb-4 md:mb-0 min-w-0">
                <h1 className="text-xl sm:text-2xl md:text-4xl lg:text-6xl font-black mb-2 md:mb-4 transform md:-skew-x-12 leading-tight">
                  <span className="text-yellow-400 block">{slide.title}</span>
                  <span className="text-yellow-400 block">{slide.subtitle}</span>
                  <span className="text-white block text-base sm:text-lg md:text-2xl lg:text-4xl mt-1 sm:mt-2">
                    {slide.cta}
                  </span>
                </h1>
              </div>
              <div className="flex-1 flex justify-center md:justify-end min-w-0">
                <div className="relative w-32 h-20 sm:w-48 sm:h-32 md:w-80 md:h-48 lg:w-96 lg:h-60 flex-shrink-0">
                  {heroImagesLoading ? (
                    <div className="w-full h-full bg-gray-200 animate-pulse rounded-lg flex items-center justify-center">
                      <div className="text-gray-400 text-sm">Loading...</div>
                    </div>
                  ) : (
                    <HeroImage
                      seed={`hero-${index}`}
                      width={400}
                      height={300}
                      alt="Hero image"
                      className="object-contain w-full h-full"
                      priority={index === 0}
                      sizes="(max-width: 640px) 128px, (max-width: 768px) 192px, (max-width: 1200px) 320px, 384px"
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation arrows - hidden on mobile */}
      <button
        onClick={prevSlide}
        className="hidden md:block absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="hidden md:block absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full hover:bg-opacity-75 transition-all"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots indicator */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-yellow-400" : "bg-white bg-opacity-50"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
