"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Menu, X, Twitter, User, LogOut, ChevronRight, Settings } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"
import AuthModal from "./auth-modal"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [showAuthModal, setShowAuthModal] = useState(false)
  const pathname = usePathname()
  const { user, signOut } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Prevent body scroll when mobile menu is open
  // Remove the useEffect for scroll handling since we're handling it in handleMenuToggle
  useEffect(() => {
    return () => {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("top")
      document.body.style.removeProperty("width")
    }
  }, [])

  const navItems = [
    { href: "/projects", label: "Projects" },
    { href: "/3d-printing", label: "3D Printing" },
    { href: "/drones", label: "Drones" },
    { href: "/products", label: "Products" },
    { href: "/store", label: "Store" },
    { href: "/blog", label: "Blog", className: "text-yellow-500 hover:text-yellow-400" },
    { href: "/admin/users", label: "User Profiles", adminOnly: true },
  ]

  const handleMenuToggle = () => {
    if (isOpen) {
      document.body.style.removeProperty("overflow")
      document.body.style.removeProperty("position")
      document.body.style.removeProperty("top")
      document.body.style.removeProperty("width")
      const scrollPosition = Number.parseInt(document.body.style.top || "0") * -1
      document.body.style.removeProperty("top")
      if (scrollPosition) {
        requestAnimationFrame(() => {
          window.scrollTo(0, scrollPosition)
        })
      }
    } else {
      document.body.style.top = `-${window.scrollY}px`
      document.body.style.position = "fixed"
      document.body.style.width = "100%"
      document.body.style.overflow = "hidden"
    }
    setIsOpen(!isOpen)
  }

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 w-full z-[9999]">
        <div
          className={`w-full transition-all duration-300 ${
            isScrolled ? "bg-black/40 backdrop-blur-sm" : "bg-transparent"
          }`}
        >
          <div className="container mx-auto px-8 md:px-16 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-1 group">
              <div className="relative w-8 h-8">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-bSIapUmW1W1AXI3QvJsBEOgs8MIR2B.png"
                  alt="Ivonix Labs Logo"
                  width={32}
                  height={32}
                  className="transition-transform duration-300 group-hover:scale-110 brightness-125 contrast-125"
                />
              </div>
              <span className="text-xl font-semibold text-yellow-500 group-hover:text-yellow-400 transition-colors">
                Ivonix Labs
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-2 lg:space-x-6">
              {navItems.map(
                (item) =>
                  (!item.adminOnly || (user && user.email === "admin@example.com")) && (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`relative px-2 py-1 transition-colors ${
                        item.className || "text-gray-300 hover:text-white"
                      } ${pathname === item.href ? "text-white" : ""}`}
                    >
                      {item.label}
                      {pathname === item.href && (
                        <motion.div
                          layoutId="navbar-indicator"
                          className="absolute bottom-0 left-0 right-0 h-0.5 bg-yellow-500"
                          initial={false}
                        />
                      )}
                    </Link>
                  ),
              )}
            </div>

            {/* Desktop Auth & Twitter */}
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                      <User className="h-6 w-6" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">{user.email}</p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.user_metadata.name || "User"}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/settings">
                        <Settings className="mr-2 h-4 w-4" />
                        <span>Settings</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => signOut()}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Button
                  onClick={() => setShowAuthModal(true)}
                  className="text-gray-300 hover:text-white bg-transparent"
                >
                  Sign In
                </Button>
              )}

              <a
                href="https://twitter.com/ivonixlabs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center space-x-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white px-4 py-2 rounded-full transition-colors"
              >
                <Twitter size={16} />
                <span className="text-sm font-medium">Follow</span>
              </a>
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={handleMenuToggle}
              className="p-2 text-gray-300 hover:text-white bg-gray-800/50 backdrop-blur-sm rounded-lg md:hidden relative z-50"
              aria-label="Toggle menu"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 bg-black/90 md:hidden"
                style={{ zIndex: 40 }}
                onClick={handleMenuToggle}
              />
              <motion.div
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                className="fixed top-0 right-0 h-full w-80 bg-black shadow-xl md:hidden"
                style={{ zIndex: 50 }}
              >
                <div className="h-full flex flex-col">
                  <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-xl font-semibold text-white">Menu</h2>
                  </div>

                  <div className="flex-1 overflow-y-auto">
                    <div className="p-4">
                      <div className="space-y-2">
                        {navItems.map(
                          (item) =>
                            (!item.adminOnly || (user && user.email === "admin@example.com")) && (
                              <motion.div key={item.href} whileTap={{ scale: 0.95 }}>
                                <Link
                                  href={item.href}
                                  className={`flex items-center justify-between py-3 px-4 rounded-lg ${
                                    item.className || "text-gray-300 hover:text-white"
                                  } ${pathname === item.href ? "bg-gray-800/50 text-white" : ""}`}
                                  onClick={handleMenuToggle}
                                >
                                  <span className="text-base">{item.label}</span>
                                  <ChevronRight className="h-5 w-5 text-gray-400" />
                                </Link>
                              </motion.div>
                            ),
                        )}
                      </div>

                      <div className="mt-6 pt-6 border-t border-gray-800">
                        {user ? (
                          <div className="space-y-4">
                            <div className="px-4">
                              <p className="text-sm font-medium">{user.email}</p>
                              <p className="text-xs text-gray-400">{user.user_metadata.name || "User"}</p>
                            </div>
                            <Link
                              href="/profile"
                              className="flex items-center justify-between py-3 px-4 text-gray-300 hover:text-white rounded-lg"
                              onClick={handleMenuToggle}
                            >
                              <span className="text-base">Profile</span>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>
                            <Link
                              href="/settings"
                              className="flex items-center justify-between py-3 px-4 text-gray-300 hover:text-white rounded-lg"
                              onClick={handleMenuToggle}
                            >
                              <span className="text-base">Settings</span>
                              <ChevronRight className="h-5 w-5 text-gray-400" />
                            </Link>
                            <button
                              onClick={() => {
                                signOut()
                                handleMenuToggle()
                              }}
                              className="flex items-center w-full py-3 px-4 text-gray-300 hover:text-white rounded-lg"
                            >
                              <LogOut className="h-5 w-5 mr-2" />
                              <span className="text-base">Sign Out</span>
                            </button>
                          </div>
                        ) : (
                          <Button
                            onClick={() => {
                              setShowAuthModal(true)
                              handleMenuToggle()
                            }}
                            className="w-full py-2 text-base bg-yellow-500 hover:bg-yellow-600 text-black rounded-lg"
                          >
                            Sign In
                          </Button>
                        )}
                      </div>

                      <div className="mt-6 mb-4">
                        <a
                          href="https://twitter.com/ivonixlabs"
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center justify-center space-x-2 bg-[#1DA1F2] hover:bg-[#1a91da] text-white py-2 px-4 rounded-lg w-full"
                        >
                          <Twitter size={18} />
                          <span className="text-base font-medium">Follow on Twitter</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
      </nav>
      <AuthModal isOpen={showAuthModal} onClose={() => setShowAuthModal(false)} />
    </>
  )
}
