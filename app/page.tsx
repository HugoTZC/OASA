import { HeroCarousel } from "@/components/hero-carousel"
import { DepartmentsSection } from "@/components/departments-section"
import { ProductsShowcase } from "@/components/products-showcase"
import { CategoryShowcase } from "@/components/category-showcase"
import { FeaturesSection } from "@/components/features-section"
import { NewsletterSection } from "@/components/newsletter-section"
import { SiteLayout } from "@/components/site-layout"

export default function HomePage() {
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
