import {Injectable} from '@angular/core';
import {Product, ProductsByCategory} from "../models/products.types";
import {HttpClient} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl = BASE_URL+'/product'

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

  getProductsBySubCategory(category: string, subCategory: string): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.baseUrl}/getProductsBySubCategory/${category}/${subCategory}`);
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

  addProduct(product: any){
    return this.http.post<any>(`${this.baseUrl}/addProduct`,product)
  }

  addProductImages(images: FormData){
    return this.http.post<any>(`${this.baseUrl}/addProductImages`,images)
  }

  deleteProductImage(imageUrl: any, productId: string){
    return this.http.delete<any>(`${this.baseUrl}/deleteProductImage`,  { body: { imageUrl: imageUrl, productId: productId } })
  }

  defaultProductImage(productId: string, defaultImageUrl: string){
    return this.http.put<any>(`${this.baseUrl}/defaultProductImage`,{ productId : productId, defaultImageUrl : defaultImageUrl})
  }

  updateProduct(product: any){
    return this.http.put<any>(`${this.baseUrl}/updateProduct`,product)
  }
  deleteProduct(productId: any){
    return this.http.delete<any>(`${this.baseUrl}/deleteProduct/${productId}`)
  }
}
