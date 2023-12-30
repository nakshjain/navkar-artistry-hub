export interface Product {
  id: string
  name: string
  about: string
  imageUrl: string
  category: string
  available: string
  price: string
}

export interface ProductsByCategory {
  category: string
  products: Product[]
}
