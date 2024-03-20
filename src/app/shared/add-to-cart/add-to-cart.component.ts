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
  cartItem:any
  isProductAvailable=true
  itemInCart=0
  isProductAdding=false
  constructor(private cartService:CartService, private snackBar:MatSnackBar) {
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'right';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config)
  }
  ngOnInit(){
  }
  addToCart(product: any){
    this.isProductAdding=true
    this.cartService.addToCart(product).subscribe(
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

  removeItem() {
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

  checkIfAvailable(cartItem:CartItem){
    this.itemInCart=cartItem.quantity
    return !(cartItem.quantity === cartItem.product.quantity);
  }
}
