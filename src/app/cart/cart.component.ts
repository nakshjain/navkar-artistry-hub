import {Component, OnInit} from '@angular/core';
import {CartService} from "../api/cart.service";
import {CartProduct, Product} from "../types/products.types";
import {Router} from "@angular/router";
import {UserService} from "../api/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:CartProduct[]=[]

  constructor(private router: Router, private cartService: CartService, private userService:UserService, private ngxService:NgxUiLoaderService,) {

  }

  ngOnInit(): void {
    this.getCart()
  }

  getCart(){
    this.ngxService.start()
    this.cartService.getCartProducts().subscribe(
      (response)=>{
        this.cart=response.cart
        this.ngxService.stop()
      },(error)=>{
        console.log(error)
        this.ngxService.stop()
    }
    )
  }

  updateItem(cartItem: CartProduct, quantity?: number){
    this.ngxService.start()
    this.cartService.addToCart(cartItem.product,quantity).subscribe(
      (response)=>{
        this.ngxService.stop()
        this.getCart()
      },(error)=>{
        this.ngxService.stop()
        console.log(error)
      }
    )
  }

  continueShopping(){
    this.router.navigate(['/shop']);
  }
  goToProduct(product: Product){
    this.router.navigate([`/product/${product.productId}`]);
  }

  removeItem(product: Product) {
    this.ngxService.start()
    this.cartService.removeFromCart(product).subscribe(
      (response)=>{
        this.getCart()
        this.ngxService.stop()
      },(error)=>{
        console.log(error)
        this.ngxService.stop()
      }
    )
  }
}
