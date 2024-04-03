import {Component, Input} from '@angular/core';
import {CartItem, Product} from "../../models/products.types";
import {OrderService} from "../../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-buy-now',
  templateUrl: './buy-now.component.html',
  styleUrls: ['./buy-now.component.css']
})
export class BuyNowComponent {
  userId=''
  @Input()
  product:any
  @Input()
  quantity:any
  constructor(private orderService:OrderService,
              private router:Router,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }

  getUserId(){
    const user=sessionStorage.getItem('userDetails')
    if(user){
      const userObject=JSON.parse(user)
      this.userId=userObject.userId
    }
  }
  buyNow() {
    let cart: CartItem[]=[]
    cart.push({
      quantity: this.quantity,
      product: this.product
    })
    this.getUserId()
    this.ngxUiLoaderService.start()
    this.orderService.createPaymentOrder(cart, this.userId).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        const paymentOrderId=response.data.id
        this.router.navigateByUrl(`/checkout/${paymentOrderId}`)
      }, (error)=>{
        this.ngxUiLoaderService.stop()
        console.log(error)
      }
    )
  }
}
