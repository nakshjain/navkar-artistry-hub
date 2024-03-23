import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class WishlistService{
  wishlistCache: BehaviorSubject<any[]>= new BehaviorSubject<any[]>([])
  private baseUrl =BASE_URL+'/wishlist'
  constructor(private http:HttpClient) {
  }

  fetchWishlist() {
    this.getWishlist().subscribe(
      (response) => {
        this.wishlistCache.next(response.wishlist);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getWishlist(){
    return this.http.get<any>(`${this.baseUrl}/getWishlist`)
  }

  addToWishlist(productId: string){
    return this.http.post<any>(`${this.baseUrl}/addToWishlist`, {productId: productId})
  }

  removeFromWishlist(productId: string){
    return this.http.post<any>(`${this.baseUrl}/removeFromWishlist`, {productId: productId})
  }
}
