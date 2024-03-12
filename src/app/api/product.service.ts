import {Injectable} from '@angular/core';
import {Product, ProductsByCategory} from "../types/products.types";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, map, Observable} from "rxjs";
import {response} from "express";

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

  getAllAvailableProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllAvailableProducts`);
  }

  getAllArchivedProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getAllArchivedProducts`);
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
  getAllArchivedCategories(){
    return this.getAllProducts().pipe(
        map((products)=>{
          const categories: string[]=[]
          products.forEach((product)=>{
            if(!product.availability) {
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
    this.http.post<any>(`${this.baseUrl}/addProduct`,product).subscribe(
      (response)=>{
        console.log(response)
      },error => {
        console.log(error)
      }
    )
  }
}
