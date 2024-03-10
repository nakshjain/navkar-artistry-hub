export interface Product {
  _id: string
  name: string
  about: string
  imageLink: string
  category: string
  availability: string
  price: string
}

export interface ProductsByCategory {
  category: string
  products: Product[]
}
