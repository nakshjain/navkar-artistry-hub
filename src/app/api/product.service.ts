import {Injectable} from '@angular/core';
import {Product, ProductsByCategory} from "../types/products.types";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class ProductService {

  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }

  getProducts(sortingOrder: String, priceRange:String, searchText: String, category:String, subCategory:String, availability:boolean){
    console.log(category,availability)
    return this.http.get<Product[]>(`${this.baseUrl}/getProducts?sortingOrder=${sortingOrder}&priceRange=${priceRange}&searchText=${searchText}&category=${category}&subCategory=${subCategory}&availability=${availability}`)
  }

  getProductsByCategory(category: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getProductsByCategory/${category}`);
  }
  getAllProductsByCategory(): Observable<ProductsByCategory[]> {
    return this.getAllProducts().pipe(
      map(
        (products)=>{
          const productsByCategory: { [category: string]: Product[] } = {};

          products.forEach((product) => {
            if(product.availability){
              if (productsByCategory[product.category]) {
                productsByCategory[product.category].push(product);
              } else {
                productsByCategory[product.category] = [product];
              }
            }
          });
          return Object.keys(productsByCategory).map(
            (category) => ({
              category: category,
              products: productsByCategory[category],
            })
          );
        }
      )
    )
  }
  getProductById(id: string): Observable<Product> {
    return this.http.get<Product>(`${this.baseUrl}/getProductById/${id}`);
  }

  getAllCategories(){
    return this.getAllProducts().pipe(
        map((products)=>{
          const categories: string[]=[]
          products.forEach((product)=>{
            if(product.availability) {
              if(!categories.includes(product.category)) {
                categories.push(product.category)
              }
            }
          })
          return categories;
        })
    )
  }

  addProduct(product: any){
    console.log(product)
    return this.http.post<any>(`${this.baseUrl}/addProduct`,product)
  }
}
