import {Component, OnInit} from '@angular/core';
import {CartService} from "../api/cart.service";
import {CartProduct, Product} from "../types/products.types";
import {Router} from "@angular/router";
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{
  cart:CartProduct[]=[]

  constructor(private router: Router, private cartService: CartService, private userService:UserService) {

  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
    });
    this.getCart()
  }

  getCart(){
    this.cartService.getCartProducts().subscribe(
      (response)=>{
        this.cart=response.cart
      },(error)=>{
        console.log(error)
    }
    )
  }

  updateItem(cartItem: CartProduct, quantity?: number){
    console.log(cartItem)
    this.cartService.addToCart(cartItem.product,quantity).subscribe(
      (response)=>{
        this.getCart()
      },(error)=>{
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
    this.cartService.removeFromCart(product).subscribe(
      (response)=>{
        console.log(response)
        this.getCart()
      },(error)=>{
        console.log(error)
      }
    )
  }
}
