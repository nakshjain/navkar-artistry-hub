import {Component, OnInit} from '@angular/core';
import {CartService} from "../api/cart.service";
import {CartItem, Product} from "../models/products.types";
import {Router} from "@angular/router";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {OrderService} from "../api/order.service";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:CartItem[]=[]
  totalAmount=0
  isUserLoggedIn=false
  userId=''
  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private router: Router,
              private cartService: CartService,
              private snackBar: MatSnackBar,
              private matDialog: MatDialog,
              private orderService: OrderService,
              private titleService: Title) {

  }

  ngOnInit(): void {
    this.titleService.setTitle('Shopping Cart | Navkar Artistry Hub')
    const storedUserDetails = sessionStorage.getItem('userDetails');
    if(storedUserDetails){
      const user=JSON.parse(storedUserDetails)
      this.isUserLoggedIn=true
      this.userId=user.userId
    }
    this.getCart()
  }

  getCart(){
    this.ngxUiLoaderService.start()
    if(this.isUserLoggedIn) {
      this.cartService.getCartProducts().subscribe(
        (response) => {
          this.cart = response.cart
          this.getTotalAmount(this.cart)
          this.ngxUiLoaderService.stop()
        }, (error) => {
          console.error(error)
          this.ngxUiLoaderService.stop()
        }
      )
    }
    else{
      this.cart=this.cartService.getCartProductsUserNotLogged()
      this.getTotalAmount(this.cart)
      this.ngxUiLoaderService.stop()
    }
  }

  updateItem(cartItem: CartItem, quantity?: number){
    if(this.isUserLoggedIn){
      this.cartService.addToCart(cartItem.product,quantity).subscribe(
        (response)=>{
          this.getCart()
        },(error)=>{
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
      this.cartService.removeFromCart(product).subscribe(
        (response)=>{
          this.openSnackBar(response.message, '')
          this.getCart()
        },(error)=>{
          this.openSnackBar(error.error.message, 'Error !')
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

  checkOut() {
    this.ngxUiLoaderService.start()
    this.orderService.createPaymentOrder(this.cart, this.userId).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        const paymentOrderId=response.data.id
        this.router.navigateByUrl(`/checkout/${paymentOrderId}`)
      }, (error)=>{
        this.ngxUiLoaderService.stop()
        console.error(error)
      }
    )
  }
}
