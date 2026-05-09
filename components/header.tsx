"use client"

import { ShoppingCart, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/lib/cart-context"
import { useState } from "react"

interface HeaderProps {
  onCartClick: () => void
}

export function Header({ onCartClick }: HeaderProps) {
  const { getTotalItems } = useCart()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const totalItems = getTotalItems()

  return (
    <header className="sticky top-0 z-50 bg-gradient-to-r from-primary to-accent shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 md:w-14 md:h-14 bg-secondary rounded-full flex items-center justify-center shadow-md">
              <span className="text-xl md:text-2xl font-bold text-primary">BA</span>
            </div>
            <div className="text-primary-foreground">
              <h1 className="text-lg md:text-xl font-bold leading-tight">Kebab Bang Aji</h1>
              <p className="text-xs md:text-sm opacity-90">Arabian Kebab</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <a href="#menu" className="text-primary-foreground hover:opacity-80 transition font-medium">
              Menu
            </a>
            <a href="#tentang" className="text-primary-foreground hover:opacity-80 transition font-medium">
              Tentang
            </a>
            <a href="#kontak" className="text-primary-foreground hover:opacity-80 transition font-medium">
              Kontak
            </a>
          </nav>

          {/* Cart Button */}
          <div className="flex items-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="relative"
              onClick={onCartClick}
            >
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-primary text-primary-foreground text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                  {totalItems}
                </span>
              )}
            </Button>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="icon"
              className="md:hidden text-primary-foreground"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden py-4 border-t border-primary-foreground/20">
            <div className="flex flex-col gap-3">
              <a 
                href="#menu" 
                className="text-primary-foreground hover:opacity-80 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Menu
              </a>
              <a 
                href="#tentang" 
                className="text-primary-foreground hover:opacity-80 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Tentang
              </a>
              <a 
                href="#kontak" 
                className="text-primary-foreground hover:opacity-80 transition font-medium py-2"
                onClick={() => setMobileMenuOpen(false)}
              >
                Kontak
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  )
}
