import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../api/cart.service";
import {CartProduct, Product} from "../../types/products.types";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit{
  @Input()
  product: any
  cartItem:any
  isProductAvailable=true
  itemInCart=0
  constructor(private cartService:CartService) {
  }

  ngOnInit(){
  }
  addToCart(product: any){
    console.log(product)
    this.cartService.addToCart(product).subscribe(
      (data)=>{
        this.cartItem=data.cart
        this.isProductAvailable=this.checkIfAvailable(this.cartItem)
      },(error)=>{
        console.log(error)
      }
    )
  }

  removeItem() {
    this.cartService.removeFromCart(this.product).subscribe(
      (response)=>{
        console.log(response)
        this.isProductAvailable=true
        this.itemInCart=0
      },(error)=>{
        console.log(error)
      }
    )
  }

  checkIfAvailable(cartItem:CartProduct){
    this.itemInCart=cartItem.quantity
    return !(cartItem.quantity === cartItem.product.quantity);
  }
}
