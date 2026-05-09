"use client"

import { useState } from "react"
import { CartProvider } from "@/lib/cart-context"
import { products, Product } from "@/lib/products"
import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ProductCard } from "@/components/product-card"
import { ProductModal } from "@/components/product-modal"
import { CartDrawer } from "@/components/cart-drawer"
import { Footer } from "@/components/footer"
import { Badge } from "@/components/ui/badge"

// Ganti dengan URL Google Form Anda
const GFORM_URL = "https://docs.google.com/forms/d/e/YOUR_FORM_ID/viewform"

function ShopContent() {
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)

  const mainProducts = products.filter(p => p.category === "main")
  const burgerProducts = products.filter(p => p.category === "burger")
  const hotdogProducts = products.filter(p => p.category === "hotdog")

  return (
    <div className="min-h-screen bg-background">
      <Header onCartClick={() => setIsCartOpen(true)} />
      
      <HeroSection />

      {/* Menu Section */}
      <section id="menu" className="py-16 md:py-24">
        <div className="container mx-auto px-4">
          {/* Section Header */}
          <div className="text-center mb-12">
            <Badge className="bg-primary/10 text-primary mb-4">Menu Kami</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Pilihan Menu Lezat
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Berbagai pilihan kebab dengan cita rasa autentik Timur Tengah. 
              Tersedia varian Original dan Keju dengan tambahan topping pilihan.
            </p>
          </div>

          {/* Main Kebab */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-primary rounded-full" />
              <h3 className="text-xl font-bold text-foreground">Kebab & Shawarma</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {mainProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>

          {/* Burger */}
          <div className="mb-16">
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-accent rounded-full" />
              <h3 className="text-xl font-bold text-foreground">Burger Kebab</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {burgerProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>

          {/* Hotdog */}
          <div>
            <div className="flex items-center gap-3 mb-6">
              <div className="h-1 w-12 bg-secondary rounded-full" />
              <h3 className="text-xl font-bold text-foreground">Hotdog Kebab</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {hotdogProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onClick={() => setSelectedProduct(product)}
                />
              ))}
            </div>
          </div>

          {/* Extra Topping Info */}
          <div className="mt-16 bg-gradient-to-r from-secondary/50 to-accent/30 rounded-2xl p-6 md:p-8">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <h3 className="text-xl font-bold text-foreground mb-2">Extra Topping</h3>
                <p className="text-muted-foreground">Tambahkan topping favoritmu!</p>
              </div>
              <div className="flex flex-wrap gap-4">
                <div className="bg-card px-6 py-3 rounded-xl shadow-sm">
                  <span className="text-sm text-muted-foreground">Keju Slice/Parut</span>
                  <p className="font-bold text-primary">+Rp 2.000</p>
                </div>
                <div className="bg-card px-6 py-3 rounded-xl shadow-sm">
                  <span className="text-sm text-muted-foreground">Telor</span>
                  <p className="font-bold text-primary">+Rp 3.000</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="tentang" className="py-16 bg-muted/50">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <Badge className="bg-primary/10 text-primary mb-4">Tentang Kami</Badge>
            <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
              Kebab Bang Aji
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              Kebab Bang Aji hadir untuk memenuhi keinginan Anda akan cita rasa kebab autentik 
              Timur Tengah. Dengan menggunakan daging sapi pilihan berkualitas tinggi dan 
              resep bumbu rahasia, kami berkomitmen menyajikan kebab yang lebih berani taste-nya!
            </p>
            <p className="text-muted-foreground leading-relaxed">
              Semua produk kami <strong className="text-primary">100% HALAL</strong> dan 
              dibuat fresh setiap hari untuk menjaga kualitas dan kelezatan. 
              Pesan sekarang dan rasakan sensasi Arabian Kebab yang sesungguhnya!
            </p>
          </div>
        </div>
      </section>

      <Footer />

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          isOpen={!!selectedProduct}
          onClose={() => setSelectedProduct(null)}
          gformUrl={GFORM_URL}
        />
      )}

      {/* Cart Drawer */}
      <CartDrawer
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        gformUrl={GFORM_URL}
      />
    </div>
  )
}

export default function Home() {
  return (
    <CartProvider>
      <ShopContent />
    </CartProvider>
  )
}
