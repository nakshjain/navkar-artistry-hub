import { Injectable } from '@angular/core';
import {CartItem, Product} from "../types/products.types";
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private baseUrl =BASE_URL+'/cart'
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

  mergeCart(cart: any, userId: any){
    return this.http.post<any>(`${this.baseUrl}/mergeCart`,{ cart: cart, userId: userId })
  }
  getCartProductsUserNotLogged(){
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    return cart
  }
  initializeCartUserNotLogged() {
    if (!localStorage.getItem('cart')) {
      const initialCartData:CartItem[] = [];
      localStorage.setItem('cart', JSON.stringify(initialCartData));
    }
  }

  getCartItemQuantity(cartProduct: Product): number {
    let cart: CartItem[] = JSON.parse(localStorage.getItem('cart') || '[]');
    let index=cart.findIndex(cartItem => cartItem.product.productId === cartProduct.productId)
    if(index!==-1){
      return cart[index].quantity
    }
    else{
      return 0
    }
  }

  addToCartUserNotLogged(cartProduct: Product, quantityToAdd?: Number){
    this.initializeCartUserNotLogged()
    let cart : CartItem[]=JSON.parse(localStorage.getItem('cart') || '[]')
    let index=cart.findIndex(cartItem => cartItem.product.productId === cartProduct.productId)
    if(index!==-1){
      if(quantityToAdd===-1){
        cart[index].quantity-=1
        if(cart[index].quantity<=0){
          cart.splice(index,1)
        }
      }else{
        if(this.getCartItemQuantity(cartProduct)<cartProduct.quantity){
          cart[index].quantity+=1
        }
        else{
          cart[index].quantity=cartProduct.quantity
        }
      }
    }
    else{
      if(this.getCartItemQuantity(cartProduct)<cartProduct.quantity){
        let cartItem:CartItem={product:cartProduct,quantity:1}
        cart.push(cartItem)
      }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }

  removeFromCartUserNotLogged(cartProduct: Product){
    let cart : CartItem[]=JSON.parse(localStorage.getItem('cart') || '[]')
    let index=cart.findIndex(cartItem => cartItem.product.productId === cartProduct.productId)
    if(index!==-1){
      cart.splice(index,1)
    }
    localStorage.setItem('cart', JSON.stringify(cart));
  }
}
