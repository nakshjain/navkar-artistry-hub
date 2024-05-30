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
export interface ProductsByCategoryString {
  category: string
  products: Product[]
}
export interface ProductsByCategory {
  category: Category
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
