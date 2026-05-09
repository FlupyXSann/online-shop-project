export interface Product {
  id: string
  name: string
  description: string
  priceOriginal: number
  priceKeju: number
  image: string
  category: "main" | "burger" | "hotdog" | "extra"
  isNew?: boolean
  isPopular?: boolean
}

export const products: Product[] = [
  {
    id: "shawarma",
    name: "Shawarma",
    description: "Daging sapi pilihan dengan bumbu khas Timur Tengah, sayuran segar, dan saus spesial dalam balutan tortilla lembut.",
    priceOriginal: 17000,
    priceKeju: 19000,
    image: "/images/shawarma.jpg",
    category: "main",
    isNew: true
  },
  {
    id: "kebab-kecil",
    name: "Kebab Kecil",
    description: "Porsi pas untuk camilan, berisi daging cincang berbumpu, sayuran, dan saus mayo spesial.",
    priceOriginal: 10000,
    priceKeju: 12000,
    image: "/images/kebab-kecil.jpg",
    category: "main"
  },
  {
    id: "kebab-besar",
    name: "Kebab Besar",
    description: "Porsi lebih besar dengan isian melimpah, cocok untuk yang lapar berat!",
    priceOriginal: 14000,
    priceKeju: 16000,
    image: "/images/kebab-besar.jpg",
    category: "main",
    isPopular: true
  },
  {
    id: "kebab-xl",
    name: "Kebab XL",
    description: "Ukuran jumbo dengan double daging dan ekstra sayuran. Dijamin puas!",
    priceOriginal: 17000,
    priceKeju: 19000,
    image: "/images/kebab-xl.jpg",
    category: "main"
  },
  {
    id: "burger-kecil",
    name: "Burger Kecil",
    description: "Mini burger dengan patty daging kebab, selada, tomat, dan saus spesial.",
    priceOriginal: 8000,
    priceKeju: 10000,
    image: "/images/burger-kecil.jpg",
    category: "burger"
  },
  {
    id: "super-burger",
    name: "Super Burger",
    description: "Burger jumbo dengan double patty, sayuran segar, dan saus BBQ.",
    priceOriginal: 10000,
    priceKeju: 12000,
    image: "/images/super-burger.jpg",
    category: "burger"
  },
  {
    id: "hotdog-kebab",
    name: "Hotdough",
    description: "Kombinasi unik hotdog dengan daging kebab dalam roti lembut.",
    priceOriginal: 8000,
    priceKeju: 10000,
    image: "/images/hotdough.jpg",
    category: "hotdog"
  }
]

export const toppings = [
  { id: "keju", name: "Keju Slice/Parut", price: 2000 },
  { id: "telor", name: "Telor", price: 3000 }
]
