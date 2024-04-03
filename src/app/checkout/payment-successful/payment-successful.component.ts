import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {ActivatedRoute, Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {CartService} from "../../api/cart.service";

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit{
  remainingTime: number = 4;
  countdownInterval: any;
  paymentId=''
  private isPaymentSuccessful=false
  private paymentOrderId=''
  constructor(private orderService:OrderService,
              private cartService: CartService,
              private router: Router,
              private ngxUiLoaderService:NgxUiLoaderService,
              private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.paymentOrderId = params['paymentOrderId'];
    });
    this.checkValidation()
  }

  getOrderDetails(){
    this.paymentId=this.orderService.getPaymentDetails().paymentId
    this.isPaymentSuccessful=this.orderService.getPaymentDetails().isPaymentSuccessful
  }

  checkValidation(){
    this.getOrderDetails()
    if(!this.isPaymentSuccessful){
      this.router.navigateByUrl('/my-account/orders')
    }
    this.goToOrder()
  }

  goToOrder() {
    this.ngxUiLoaderService.start()
    this.orderService.verifyOrderId(this.paymentOrderId).subscribe(
      (response)=>{
        this.clearCart()
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }

  clearCart(){
    this.cartService.clearCart().subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        this.orderService.setPaymentDetails(false,'PAYMENT_FAILED')
        this.countdownInterval = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime <= 0) {
            clearInterval(this.countdownInterval);
            this.router.navigateByUrl('/my-account/orders');
          }
        }, 1000)
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }
}
