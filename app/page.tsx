import { HeroCarousel } from "@/components/hero-carousel"
import { DepartmentsSection } from "@/components/departments-section"
import { ProductsShowcase } from "@/components/products-showcase"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturesSection } from "@/components/features-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteLayout } from "@/components/site-layout"
import { useEffect } from "react"

export default function HomePage() {
  useEffect(() => {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    console.log("Backend URL:", backendUrl);

    fetch(`${backendUrl}/api/test`)
      .then((res) => res.json())
      .then((data) => {
        console.log("Respuesta backend:", data);
      })
      .catch((err) => {
        console.error("Error al conectar backend:", err);
      });
  }, []);
  
  return (
    <SiteLayout>
      <HeroCarousel />
      <DepartmentsSection />
      <ProductsShowcase />
      <CategoryShowcase />
      <FeaturesSection />
      {/* <NewsletterSection /> */}
    </SiteLayout>
  )
}

