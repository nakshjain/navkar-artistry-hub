export interface Product {
  productId: string
  name: string
  about: string
  imageLinks: [string]
  category: string
  subCategory:string
  availability: string
  price: number
  quantity: number
}
export interface ProductsByCategory {
  category: string
  products: Product[]
}
export interface Category{
  id: string
  name: string
  link: string
}
export interface CartItem {
  product: Product
  quantity: number
}
