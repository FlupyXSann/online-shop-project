"use client"

import { useState } from "react"
import Image from "next/image"
import { X, Plus, Minus, ShoppingCart, ExternalLink } from "lucide-react"
import { Product, toppings } from "@/lib/products"
import { useCart, Variant, Topping } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"

interface ProductModalProps {
  product: Product
  isOpen: boolean
  onClose: () => void
  gformUrl: string
}

export function ProductModal({ product, isOpen, onClose, gformUrl }: ProductModalProps) {
  const { addItem } = useCart()
  const [variant, setVariant] = useState<Variant>("original")
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([])
  const [quantity, setQuantity] = useState(1)

  if (!isOpen) return null

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("id-ID").format(price)
  }

  const basePrice = variant === "original" ? product.priceOriginal : product.priceKeju
  const toppingPrice = selectedToppings.reduce((sum, t) => {
    return sum + (t === "keju" ? 2000 : 3000)
  }, 0)
  const totalPrice = (basePrice + toppingPrice) * quantity

  const handleToppingChange = (toppingId: Topping, checked: boolean) => {
    if (checked) {
      setSelectedToppings(prev => [...prev, toppingId])
    } else {
      setSelectedToppings(prev => prev.filter(t => t !== toppingId))
    }
  }

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      variant,
      price: basePrice,
      quantity,
      toppings: selectedToppings,
      image: product.image
    })
    onClose()
    resetState()
  }

  const handleCheckout = () => {
    const toppingNames = selectedToppings.map(t => 
      t === "keju" ? "Keju Slice/Parut" : "Telor"
    ).join(", ")
    
    const orderDetails = encodeURIComponent(
      `${product.name} (${variant === "keju" ? "Keju" : "Original"})${toppingNames ? ` + ${toppingNames}` : ""} x${quantity} = Rp ${formatPrice(totalPrice)}`
    )
    
    window.open(`${gformUrl}?entry.123456789=${orderDetails}`, "_blank")
    onClose()
    resetState()
  }

  const resetState = () => {
    setVariant("original")
    setSelectedToppings([])
    setQuantity(1)
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative bg-card rounded-2xl shadow-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-200">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 bg-background/80 backdrop-blur rounded-full flex items-center justify-center hover:bg-background transition shadow-lg"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Product Image */}
        <div className="relative aspect-video w-full">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover rounded-t-2xl"
          />
          <div className="absolute top-4 left-4 flex gap-2">
            {product.isNew && (
              <Badge className="bg-accent text-accent-foreground font-bold">NEW</Badge>
            )}
            {product.isPopular && (
              <Badge className="bg-primary text-primary-foreground font-bold">FAVORIT</Badge>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Title & Description */}
          <div>
            <h2 className="text-2xl font-bold text-foreground mb-2">{product.name}</h2>
            <p className="text-muted-foreground">{product.description}</p>
          </div>

          {/* Variant Selection */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Pilih Varian</Label>
            <RadioGroup value={variant} onValueChange={(v) => setVariant(v as Variant)}>
              <div className="flex gap-4">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="original" id="original" />
                  <Label htmlFor="original" className="cursor-pointer">
                    Original - Rp {formatPrice(product.priceOriginal)}
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="keju" id="keju" />
                  <Label htmlFor="keju" className="cursor-pointer">
                    Keju - Rp {formatPrice(product.priceKeju)}
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>

          {/* Toppings */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Extra Topping</Label>
            <div className="space-y-2">
              {toppings.map(topping => (
                <div key={topping.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={topping.id}
                    checked={selectedToppings.includes(topping.id as Topping)}
                    onCheckedChange={(checked) => 
                      handleToppingChange(topping.id as Topping, checked as boolean)
                    }
                  />
                  <Label htmlFor={topping.id} className="cursor-pointer">
                    {topping.name} (+Rp {formatPrice(topping.price)})
                  </Label>
                </div>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="space-y-3">
            <Label className="text-base font-semibold">Jumlah</Label>
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                disabled={quantity <= 1}
              >
                <Minus className="w-4 h-4" />
              </Button>
              <span className="text-xl font-bold w-12 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={() => setQuantity(quantity + 1)}
              >
                <Plus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          {/* Total Price */}
          <div className="bg-muted rounded-xl p-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Total Harga:</span>
              <span className="text-2xl font-bold text-primary">
                Rp {formatPrice(totalPrice)}
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <Button
              variant="outline"
              className="flex-1"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Keranjang
            </Button>
            <Button
              className="flex-1 bg-primary hover:bg-primary/90"
              onClick={handleCheckout}
            >
              <ExternalLink className="w-4 h-4 mr-2" />
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
