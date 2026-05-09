"use client"

import Image from "next/image"
import { Product } from "@/lib/products"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent } from "@/components/ui/card"

interface ProductCardProps {
  product: Product
  onClick: () => void
}

export function ProductCard({ product, onClick }: ProductCardProps) {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price)
  }

  return (
    <Card 
      className="group cursor-pointer overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 border-0 bg-card"
      onClick={onClick}
    >
      <div className="relative aspect-square overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover transition-transform duration-300 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        
        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-2">
          {product.isNew && (
            <Badge className="bg-accent text-accent-foreground font-bold shadow-md">
              NEW
            </Badge>
          )}
          {product.isPopular && (
            <Badge className="bg-primary text-primary-foreground font-bold shadow-md">
              FAVORIT
            </Badge>
          )}
        </div>

        {/* Click to view */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <span className="bg-primary text-primary-foreground px-4 py-2 rounded-full font-medium text-sm shadow-lg">
            Lihat Detail
          </span>
        </div>
      </div>

      <CardContent className="p-4">
        <h3 className="font-bold text-lg text-foreground mb-1">{product.name}</h3>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{product.description}</p>
        
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Original:</span>
              <span className="font-bold text-primary">Rp {formatPrice(product.priceOriginal)}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">+ Keju:</span>
              <span className="font-bold text-accent">Rp {formatPrice(product.priceKeju)}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
