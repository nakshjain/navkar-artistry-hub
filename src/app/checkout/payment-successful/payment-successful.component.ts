import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-payment-successful',
  templateUrl: './payment-successful.component.html',
  styleUrls: ['./payment-successful.component.css']
})
export class PaymentSuccessfulComponent implements OnInit{
  paymentId=''
  private isPaymentSuccessful=false
  constructor(private orderService:OrderService,
              private router: Router) {
  }

  ngOnInit(){
    this.checkValidation()
  }

  getOrderDetails(){
    this.paymentId=this.orderService.getPaymentDetails().paymentId
    this.isPaymentSuccessful=this.orderService.getPaymentDetails().isPaymentSuccessful
  }

  checkValidation(){
    this.getOrderDetails()
    if(!this.isPaymentSuccessful){
      this.router.navigateByUrl('cart')
    }
  }
}
