"use client"

import { X, Plus, Minus, Trash2, ShoppingBag, ExternalLink } from "lucide-react"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import Image from "next/image"

interface CartDrawerProps {
  isOpen: boolean
  onClose: () => void
  gformUrl: string
}

export function CartDrawer({ isOpen, onClose, gformUrl }: CartDrawerProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, clearCart } = useCart()

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price)
  }

  const handleCheckoutAll = () => {
    if (items.length === 0) return
    
    const orderDetails = items.map(item => {
      const toppingNames = item.toppings.map(t => 
        t === "keju" ? "Keju" : "Telor"
      ).join(", ")
      const toppingPrice = item.toppings.reduce((sum, t) => {
        return sum + (t === "keju" ? 2000 : 3000)
      }, 0)
      const itemTotal = (item.price + toppingPrice) * item.quantity
      return `${item.name} (${item.variant === "keju" ? "Keju" : "Original"})${toppingNames ? ` + ${toppingNames}` : ""} x${item.quantity} = Rp ${formatPrice(itemTotal)}`
    }).join("\n")
    
    const totalAll = `\n\nTOTAL: Rp ${formatPrice(getTotalPrice())}`
    
    window.open(`${gformUrl}?entry.123456789=${encodeURIComponent(orderDetails + totalAll)}`, "_blank")
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-card shadow-2xl animate-in slide-in-from-right duration-300">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <div className="flex items-center gap-2">
            <ShoppingBag className="w-5 h-5 text-primary" />
            <h2 className="text-lg font-bold">Keranjang Belanja</h2>
          </div>
          <button
            onClick={onClose}
            className="w-10 h-10 rounded-full hover:bg-muted flex items-center justify-center transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex flex-col h-[calc(100%-80px)]">
          {items.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center p-8 text-center">
              <ShoppingBag className="w-16 h-16 text-muted-foreground/30 mb-4" />
              <p className="text-muted-foreground">Keranjang masih kosong</p>
              <p className="text-sm text-muted-foreground/70">Yuk pilih menu favoritmu!</p>
            </div>
          ) : (
            <>
              {/* Items */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {items.map(item => {
                  const toppingPrice = item.toppings.reduce((sum, t) => {
                    return sum + (t === "keju" ? 2000 : 3000)
                  }, 0)
                  const itemTotal = (item.price + toppingPrice) * item.quantity

                  return (
                    <div key={item.id} className="flex gap-3 bg-muted/50 rounded-xl p-3">
                      <div className="relative w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h3 className="font-semibold text-sm">{item.name}</h3>
                            <p className="text-xs text-muted-foreground capitalize">
                              {item.variant}
                              {item.toppings.length > 0 && (
                                <> + {item.toppings.map(t => t === "keju" ? "Keju" : "Telor").join(", ")}</>
                              )}
                            </p>
                          </div>
                          <button
                            onClick={() => removeItem(item.id)}
                            className="text-destructive hover:bg-destructive/10 p-1 rounded"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                            >
                              <Minus className="w-3 h-3" />
                            </button>
                            <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="w-6 h-6 rounded-full bg-background flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition"
                            >
                              <Plus className="w-3 h-3" />
                            </button>
                          </div>
                          <span className="font-bold text-primary text-sm">
                            Rp {formatPrice(itemTotal)}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>

              {/* Footer */}
              <div className="border-t p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Total Pesanan:</span>
                  <span className="text-2xl font-bold text-primary">
                    Rp {formatPrice(getTotalPrice())}
                  </span>
                </div>
                
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={clearCart}
                    className="flex-shrink-0"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                  <Button
                    className="flex-1 bg-primary hover:bg-primary/90"
                    onClick={handleCheckoutAll}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Checkout Semua
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
