import { Injectable } from '@angular/core';
import {CartProduct} from "../types/products.types";
import {UserService} from "./user.service";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl =BASE_URL
  user:any
  constructor(private http:HttpClient){ }

  getCartProducts(){
    return this.http.get<any>(`${this.baseUrl}/getCart`)
  }

  addToCart(cartProduct: any, quantityToAdd?: Number){
    return this.http.post<any>(`${this.baseUrl}/addToCart?quantityToAdd=${quantityToAdd}`,cartProduct)
  }
  removeFromCart(cartProduct: any){
    return this.http.post<any>(`${this.baseUrl}/removeFromCart`,cartProduct)
  }

  // addToCartUserNotLogged(productId:string){
  //   this.initializeCart()
  //   this.userService.getUserDetails().subscribe(
  //     (user)=>{
  //       this.user=user
  //     },(error)=>{
  //       console.log(error)
  //     }
  //   )
  //   let cart : CartProduct[]=JSON.parse(localStorage.getItem('cart') || '[]')
  //   let index=cart.findIndex(cartItem => cartItem.productId === productId)
  //   if(index===-1){
  //     let cartItem:CartProduct={productId:productId,quantity:1}
  //     cart.push(cartItem)
  //   }
  //   else{
  //     cart[index].quantity+=1
  //   }
  //   localStorage.setItem('cart', JSON.stringify(cart));
  //   console.log(cart)
  // }

  initializeCart() {
    if (!localStorage.getItem('cart')) {
      const initialCartData:CartProduct[] = [];
      localStorage.setItem('cart', JSON.stringify(initialCartData));
    }
  }

  // getCartItemQuantity(productId: string): number {
  //   let cart: CartProduct[] = JSON.parse(localStorage.getItem('cart') || '[]');
    // let cartItem = cart.find(item => item.productId === productId);
    // return cartItem ? cartItem.quantity : 0;
  // }
}
