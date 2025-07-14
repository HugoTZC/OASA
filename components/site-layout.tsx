import type React from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { TopBanner } from "@/components/top-banner"
import { WhatsAppButton } from "@/components/whatsapp-button"

interface SiteLayoutProps {
  children: React.ReactNode
}

export function SiteLayout({ children }: SiteLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <TopBanner />
      <Header />
      <main className="flex-1">{children}</main>
      <Footer />
      <WhatsAppButton />
    </div>
  )
}
