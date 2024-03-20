import {Component, OnInit} from '@angular/core';
import {CartService} from "../api/cart.service";
import {CartItem, Product} from "../types/products.types";
import {Router} from "@angular/router";
import {AuthService} from "../api/auth.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:CartItem[]=[]
  totalAmount=0
  isUserLoggedIn=false
  constructor(private router: Router,
              private cartService: CartService,
              private authService:AuthService,
              private ngxService:NgxUiLoaderService,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog) {

  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
    });
      this.getCart()
  }

  getCart(){
    if(this.isUserLoggedIn) {
      this.ngxService.start()
      this.cartService.getCartProducts().subscribe(
        (response) => {
          this.cart = response.cart
          this.ngxService.stop()
          this.getTotalAmount(this.cart)
        }, (error) => {
          console.log(error)
          this.ngxService.stop()
        }
      )
    }
    else{
      this.cart=this.cartService.getCartProductsUserNotLogged()
      this.getTotalAmount(this.cart)
    }
  }

  updateItem(cartItem: CartItem, quantity?: number){
    if(this.isUserLoggedIn){
      this.ngxService.start()
      this.cartService.addToCart(cartItem.product,quantity).subscribe(
        (response)=>{
          this.ngxService.stop()
          this.getCart()
        },(error)=>{
          this.ngxService.stop()
          console.log(error)
          this.openSnackBar(error.error.message, 'Error !')
          this.getCart()
        }
      )
    }
    else{
      this.cartService.addToCartUserNotLogged(cartItem.product,quantity)
      this.getCart()
    }
  }

  continueShopping(){
    this.router.navigate(['/shop']);
  }
  goToProduct(product: Product){
    this.router.navigate([`/product/${product.productId}`]);
  }

  removeItem(product: Product) {
    if(this.isUserLoggedIn){
      this.ngxService.start()
      this.cartService.removeFromCart(product).subscribe(
        (response)=>{
          this.openSnackBar(response.message, 'Success !')
          this.getCart()
          this.ngxService.stop()
        },(error)=>{
          console.log(error)
          this.openSnackBar(error.error.message, 'Error !')
          this.ngxService.stop()
        }
      )
    }
    else{
      this.cartService.removeFromCartUserNotLogged(product)
      this.getCart()
    }
  }

  getTotalAmount(cartItems: CartItem[]){
    this.totalAmount=0
    cartItems.forEach(
      (cartItem)=>{
        this.totalAmount+=cartItem.product.price*cartItem.quantity
      }
    )
  }


  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config)
  }

  openLoginDialog() {
    if(!this.isUserLoggedIn){
      this.matDialog.open(LoginComponent,{
      })
    }
    else{
      this.matDialog.closeAll()
    }
  }
}
