import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/contexts/auth-context"
import { ShoppingProvider } from "@/contexts/shopping-context"
import { SiteSettingsProvider } from "@/contexts/site-settings-context"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "OASA - La tienda de los expertos",
  description: "Gases industriales, herramientas y equipos de soldadura",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <SiteSettingsProvider>
          <AuthProvider>
            <ShoppingProvider>
              {children}
            </ShoppingProvider>
          </AuthProvider>
        </SiteSettingsProvider>
      </body>
    </html>
  )
}
