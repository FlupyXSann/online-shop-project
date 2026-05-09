"use client"

import { ChevronDown, BadgeCheck } from "lucide-react"
import { Button } from "@/components/ui/button"

export function HeroSection() {
  const scrollToMenu = () => {
    document.getElementById("menu")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <section className="relative min-h-[60vh] md:min-h-[70vh] bg-gradient-to-br from-primary via-primary to-accent overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 left-10 w-32 h-32 bg-secondary/20 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-20 w-48 h-48 bg-accent/30 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary-foreground/5 rounded-full blur-3xl" />
      </div>

      <div className="relative container mx-auto px-4 py-16 md:py-24 flex flex-col items-center justify-center text-center min-h-[60vh] md:min-h-[70vh]">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 bg-secondary/90 text-secondary-foreground px-4 py-2 rounded-full mb-6 shadow-lg">
          <BadgeCheck className="w-5 h-5 text-primary" />
          <span className="font-semibold text-sm">100% HALAL</span>
        </div>

        {/* Main Heading */}
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-primary-foreground mb-4 leading-tight">
          <span className="block">Jagonya Kebab</span>
          <span className="block text-secondary mt-2">Lebih Berani Taste-nya!</span>
        </h1>

        <p className="text-lg md:text-xl text-primary-foreground/90 max-w-2xl mb-8">
          Nikmati kelezatan Arabian Kebab dengan cita rasa autentik Timur Tengah. 
          Dibuat dengan daging pilihan dan bumbu rahasia Bang Aji!
        </p>

        {/* CTA Button */}
        <Button
          size="lg"
          variant="secondary"
          className="text-lg px-8 py-6 shadow-xl hover:shadow-2xl transition-all duration-300"
          onClick={scrollToMenu}
        >
          Lihat Menu
          <ChevronDown className="ml-2 w-5 h-5 animate-bounce" />
        </Button>

        {/* Quick Stats */}
        <div className="flex flex-wrap justify-center gap-8 mt-12 text-primary-foreground">
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">7+</div>
            <div className="text-sm opacity-80">Menu Pilihan</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">100%</div>
            <div className="text-sm opacity-80">Halal</div>
          </div>
          <div className="text-center">
            <div className="text-3xl md:text-4xl font-bold">8K</div>
            <div className="text-sm opacity-80">Mulai Dari</div>
          </div>
        </div>
      </div>

      {/* Wave Divider */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
          <path 
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z" 
            className="fill-background"
          />
        </svg>
      </div>
    </section>
  )
}
