"use client"

import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import type { HeroSlide } from "@/types/admin"

const API_BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL?.replace(/\/$/, "") || "https://api.oasamexico.com"

const BANNERS = [
  `${API_BASE_URL}/api/banners/banner1`,
  `${API_BASE_URL}/api/banners/banner2`,
  `${API_BASE_URL}/api/banners/banner3`,
]

export function HeroCarousel() {
  const [slides, setSlides] = useState<HeroSlide[]>([])
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)

  useEffect(() => {
    const staticSlides: HeroSlide[] = BANNERS.map((image, index) => ({
      id: String(index + 1),
      title: "",
      subtitle: "",
      cta: "",
      image: image,
      background: "bg-gradient-to-r from-blue-900 via-blue-800 to-purple-900",
      order: index + 1,
      isActive: index === 0,
      createdAt: "",
      updatedAt: "",
    }))
    setSlides(staticSlides)
  }, [])

  useEffect(() => {
    if (slides.length > 0) {
      setIsLoaded(true)
      const timer = setInterval(() => {
        setCurrentSlide((prev) => (prev + 1) % slides.length)
      }, 10000)
      return () => clearInterval(timer)
    }
  }, [slides.length])

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
    <div className="relative w-full aspect-[3/1] overflow-hidden bg-slate-100">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
            index === currentSlide ? "translate-x-0" : index < currentSlide ? "-translate-x-full" : "translate-x-full"
          }`}
        >
          <div className={`${slide.background} h-full flex items-center relative overflow-hidden`}>
            <div className="absolute inset-0">
              <img
                src={slide.image}
                alt={`Banner ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute inset-0 bg-black opacity-20"></div>
          </div>
        </div>
      ))}

      <button
        onClick={prevSlide}
        className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-md transition-all hover:bg-black/80 md:p-2"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/60 p-3 text-white shadow-md transition-all hover:bg-black/80 md:p-2"
        aria-label="Slide siguiente"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

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
