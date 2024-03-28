import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../api/cart.service";
import {CartItem} from "../../types/products.types";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.css']
})
export class AddToCartComponent implements OnInit{
  @Input()
  product: any
  @Input()
  title='Add to Cart'
  @Input()
  borderRadius='100px'
  @Input()
  height='auto'
  @Input()
  quantityToAdd=1

  cartItem:any
  isProductAvailable=true
  itemInCart=0
  isProductAdding=false
  isUserLoggedIn=false
  constructor(private cartService:CartService,
              private snackBar:MatSnackBar) {
  }

  ngOnInit(){
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if(storedUserDetails){
      this.isUserLoggedIn=true
    }
  }
  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config)
  }

  addToCart(){
    if(this.isUserLoggedIn){
      this.isProductAdding=true
      this.cartService.addToCart(this.product,this.quantityToAdd).subscribe(
        (data)=>{
          this.openSnackBar('Item Added!', 'Success');
          this.isProductAdding=false
          this.cartItem=data.cart
          this.isProductAvailable=this.checkIfAvailable(this.cartItem)
        },(error)=>{
          this.openSnackBar('Failed to add!', 'Error');
          this.isProductAdding=false
          console.log(error)
        }
      )
    }
    else{
      this.cartService.addToCartUserNotLogged(this.product)
      this.itemInCart=this.cartService.getCartItemQuantity(this.product)
      this.isProductAvailable=this.product.quantity>this.itemInCart
      this.openSnackBar('Item Added!', 'Success');
    }
  }

  removeItem() {
    if(this.isUserLoggedIn){
      this.cartService.removeFromCart(this.product).subscribe(
        (response)=>{
          this.openSnackBar('Item Removed from Cart', 'Success');
          this.isProductAvailable=true
          this.itemInCart=0
        },(error)=>{
          this.openSnackBar('Failed to Remove from Cart!', 'Error');
          console.log(error)
        }
      )
    }
    else {
      this.cartService.removeFromCartUserNotLogged(this.product)
      this.openSnackBar('Item Removed from Cart', 'Success');
      this.itemInCart=this.cartService.getCartItemQuantity(this.product)
      this.isProductAvailable=this.product.quantity>this.itemInCart
    }
  }

  checkIfAvailable(cartItem:CartItem){
    this.itemInCart=cartItem.quantity
    return !(cartItem.quantity === cartItem.product.quantity);
  }
}
