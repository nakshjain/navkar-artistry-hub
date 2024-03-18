export interface Product {
  productId: string
  name: string
  about: string
  imageLink: string
  category: string
  subCategory:string
  availability: string
  price: string
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
