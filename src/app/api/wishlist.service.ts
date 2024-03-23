import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  private baseUrl =BASE_URL+'/wishlist'
  constructor(private http:HttpClient) { }

  getWishlist(){
    return this.http.get<any>(`${this.baseUrl}/getWishlist`)
  }

  addToWishlist(productId: string){
    return this.http.post<any>(`${this.baseUrl}/addToWishlist`, {productId: productId})
  }
}
