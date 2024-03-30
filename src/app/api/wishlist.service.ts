import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";
import {BehaviorSubject} from "rxjs";
import {Product} from "../types/products.types";

@Injectable({
  providedIn: 'root'
})
export class WishlistService{
  wishlistCache: BehaviorSubject<any[]>= new BehaviorSubject<any[]>([])
  private baseUrl =BASE_URL+'/wishlist'
  constructor(private http:HttpClient) {
  }

  fetchWishlist() {
    let isUserLoggedIn=false
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if(storedUserDetails){
      isUserLoggedIn=true
    }
    if(isUserLoggedIn){
      this.getWishlist().subscribe(
        (response) => {
          this.wishlistCache.next(response.wishlist);
        },
        (error) => {
          console.error(error);
        }
      );
    }
    else{
      this.getWishlistUserNotLogged()
    }
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

  initializeWishlistUserNotLogged() {
    if (!localStorage.getItem('wishlist')) {
      const initialWishlistData: Product[] = [];
      localStorage.setItem('wishlist', JSON.stringify(initialWishlistData));
    }
  }

  getWishlistUserNotLogged(){
    this.initializeWishlistUserNotLogged()
    let wishlist: Product[]=JSON.parse(localStorage.getItem('wishlist') || '[]')
    this.wishlistCache.next(wishlist)
    return wishlist
  }

  addToWishlistUserNotLogged(productToAdd: Product){
    this.initializeWishlistUserNotLogged()
    let wishlist: Product[]=JSON.parse(localStorage.getItem('wishlist') || '[]')
    let index=wishlist.findIndex(product=>product.productId===productToAdd.productId)
    if(index===-1){
      wishlist.push(productToAdd)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.getWishlistUserNotLogged()
  }

  removeFromWishlistUserNotLogged(productId: string){
    this.initializeWishlistUserNotLogged()
    let wishlist: Product[]=JSON.parse(localStorage.getItem('wishlist') || '[]')
    let index=wishlist.findIndex(product=>product.productId === productId)
    if(index!==-1){
      wishlist.splice(index,1)
    }
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
    this.getWishlistUserNotLogged()
  }

  mergeWishlist(wishlist: any, email: any){
    return this.http.post<any>(`${this.baseUrl}/mergeWishlist`,{ wishlist: wishlist, email: email })
  }
}
