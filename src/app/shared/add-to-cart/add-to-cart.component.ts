import {Component, Input, OnInit} from '@angular/core';
import {CartService} from "../../api/cart.service";
import {CartItem} from "../../models/products.types";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {Router} from "@angular/router";

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
  quantityToAdd:any

  cartItem:any
  isProductAvailable=true
  itemInCart=0
  isProductAdding=false
  isUserLoggedIn=false
  constructor(private cartService:CartService,
              private snackBar:MatSnackBar,
              private router:Router) {
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

    const snackBarRef = this.snackBar.open(message, action, config)

    if(action==='Go to Cart'){
      snackBarRef.onAction().subscribe(() => {
        this.router.navigate(['/cart']);
      });
    }
  }

  addToCart(){
    if(this.isUserLoggedIn){
      this.isProductAdding=true
      this.cartService.addToCart(this.product,this.quantityToAdd).subscribe(
        (data)=>{
          this.openSnackBar('Item Added!', 'Go to Cart');
          this.isProductAdding=false
          this.cartItem=data.cart
          this.isProductAvailable=this.checkIfAvailable(this.cartItem)
        },(error)=>{
          this.openSnackBar('Failed to add!', 'Error');
          this.isProductAdding=false
        }
      )
    }
    else{
      this.cartService.addToCartUserNotLogged(this.product)
      this.itemInCart=this.cartService.getCartItemQuantity(this.product)
      this.isProductAvailable=this.product.quantity>this.itemInCart
      this.openSnackBar('Item Added!', 'Go to Cart');
    }
  }

  removeItem() {
    if(this.isUserLoggedIn){
      this.cartService.removeFromCart(this.product).subscribe(
        (response)=>{
          this.openSnackBar('Item Removed from Cart', '');
          this.isProductAvailable=true
          this.itemInCart=0
        },(error)=>{
          this.openSnackBar('Failed to Remove from Cart!', 'Error');
        }
      )
    }
    else {
      this.cartService.removeFromCartUserNotLogged(this.product)
      this.openSnackBar('Item Removed from Cart', '');
      this.itemInCart=this.cartService.getCartItemQuantity(this.product)
      this.isProductAvailable=this.product.quantity>this.itemInCart
    }
  }

  checkIfAvailable(cartItem:CartItem){
    this.itemInCart=cartItem.quantity
    return !(cartItem.quantity === cartItem.product.quantity);
  }
}
