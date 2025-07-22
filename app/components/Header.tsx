"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { motion } from "framer-motion"
import { FiMenu, FiX } from "react-icons/fi"

const Header = () => {
  const [isOpen, setIsOpen] = useState(false)

  const toggleMenu = () => setIsOpen(!isOpen)

  return (
    <header className="fixed w-full bg-white bg-opacity-90 backdrop-blur-sm z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-purple-900">
          Bricklabs
        </Link>
        <nav className="hidden md:flex space-x-6">
          <NavLink href="#services">Services</NavLink>
          <NavLink href="#about">About</NavLink>
          <NavLink href="#contact">Contact</NavLink>
        </nav>
        <button className="md:hidden text-purple-900" onClick={toggleMenu}>
          {isOpen ? <FiX size={24} /> : <FiMenu size={24} />}
        </button>
      </div>
      {isOpen && (
        <motion.nav
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          className="md:hidden bg-white py-4"
        >
          <div className="container mx-auto px-4 flex flex-col space-y-4">
            <NavLink href="#services" onClick={toggleMenu}>
              Services
            </NavLink>
            <NavLink href="#about" onClick={toggleMenu}>
              About
            </NavLink>
            <NavLink href="#contact" onClick={toggleMenu}>
              Contact
            </NavLink>
          </div>
        </motion.nav>
      )}
    </header>
  )
}

const NavLink = ({ href, children, onClick }: { href: string; children: React.ReactNode; onClick?: () => void }) => (
  <Link href={href} className="text-purple-900 hover:text-purple-700 transition-colors" onClick={onClick}>
    {children}
  </Link>
)

export default Header
