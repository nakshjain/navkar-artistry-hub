export interface Product {
  id: string
  name: string
  price: string
  review: string
  imageUrl: string
  category: string
  rating: string
}

export interface ProductsByCategory {
  category: string
  products: Product[]
}
