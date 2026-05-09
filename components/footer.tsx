"use client"

import { MapPin, Phone, Clock, Instagram, MessageCircle } from "lucide-react"

export function Footer() {
  return (
    <footer id="kontak" className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                <span className="text-xl font-bold text-primary">BA</span>
              </div>
              <div>
                <h3 className="text-lg font-bold">Kebab Bang Aji</h3>
                <p className="text-sm opacity-70">Arabian Kebab</p>
              </div>
            </div>
            <p className="text-sm opacity-80 leading-relaxed">
              Jagonya Kebab dengan cita rasa autentik Timur Tengah. 
              100% Halal dan dibuat dengan bahan berkualitas.
            </p>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Kontak</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 mt-0.5 text-secondary" />
                <span className="text-sm opacity-80">
                  Jl. Contoh No. 123, Kota Anda
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-secondary" />
                <span className="text-sm opacity-80">+62 812 3456 7890</span>
              </div>
              <div className="flex items-start gap-3">
                <Clock className="w-5 h-5 mt-0.5 text-secondary" />
                <span className="text-sm opacity-80">
                  Setiap Hari<br />10:00 - 22:00 WIB
                </span>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-lg font-bold mb-4">Ikuti Kami</h3>
            <div className="flex gap-3">
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 bg-background/10 rounded-full flex items-center justify-center hover:bg-secondary hover:text-secondary-foreground transition"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
            <p className="text-sm opacity-60 mt-4">
              www.bangajikebab.com
            </p>
          </div>
        </div>

        <div className="border-t border-background/10 mt-8 pt-8 text-center">
          <p className="text-sm opacity-60">
            © 2024 Kebab Bang Aji. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
