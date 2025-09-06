import "./globals.css"
import { Inter } from "next/font/google"
import { cn } from "@/lib/utils"
import Navbar from "@/components/navbar"
import ScrollToTop from "@/components/scroll-to-top"
import { AuthProvider } from "@/contexts/auth-context"
import { CartProvider } from "@/contexts/cart-context"
import CartSidebar from "@/components/cart-sidebar"
import { Toaster } from "sonner"
import type { Metadata } from "next"
import Script from "next/script"
import type React from "react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ivonix Labs - Innovative Electronics & Software Solutions",
  description:
    "Ivonix Labs: Cutting-edge electronics design, software development, and 3D printing services. Experts in embedded systems, IoT, AI/ML, and robotics.",
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
    generator: 'v0.app'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <Script src="https://www.googletagmanager.com/gtag/js?id=G-GT9CWC9JBE" strategy="afterInteractive" />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-GT9CWC9JBE');
          `}
        </Script>
      </head>
      <body className={cn(inter.className, "min-h-screen bg-black text-white antialiased relative")}>
        <AuthProvider>
          <CartProvider>
            <div className="fixed inset-0 bg-grid-white/[0.02] -z-10" />
            <Navbar />
            <main className="pt-16 md:pt-0">{children}</main>
            <ScrollToTop />
            <CartSidebar />
            <Toaster />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
