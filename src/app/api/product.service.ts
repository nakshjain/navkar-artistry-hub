import {Injectable} from '@angular/core';
import {Product, ProductsByCategory} from "../types/products.types";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = BASE_URL

  constructor(private http: HttpClient) {
  }

  getAllProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllProducts`);
  }

  getProductsByPagination(
    sortingOrder: String,
    priceRange:String,
    searchText: String,
    category:String,
    subCategory:String,
    availability:boolean,
    page: number,
    pageSize: number){
    return this.http.get<any>(`${this.baseUrl}/getProductsByPagination?sortingOrder=${sortingOrder}&priceRange=${priceRange}&searchText=${searchText}&category=${category}&subCategory=${subCategory}&availability=${availability}&page=${page}&pageSize=${pageSize}`)
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
  getProductById(id: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/getProductById/${id}`);
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
