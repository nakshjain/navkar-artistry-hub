import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {OrderService} from "../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.css']
})
export class CheckoutComponent implements OnInit{
  razorPayKey='rzp_test_ePTB6pCtDu49TQ'
  paymentOrderId=''

  constructor(private route:ActivatedRoute,
              private router:Router,
              private orderService:OrderService,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }

  ngOnInit() {
    this.verifyOrderId()
  }

  getOrderId(){
    return this.route.snapshot.params['paymentOrderId']
  }

  verifyOrderId(){
    this.paymentOrderId=this.getOrderId()
    this.ngxUiLoaderService.start()
    this.orderService.verifyOrderId(this.paymentOrderId).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.ngxUiLoaderService.stop()
        this.router.navigateByUrl('/')
      }
    )
  }
  payWithRazorPay(){
    const paymentOrderId=this.getOrderId()
    const options : any={
      key: this.razorPayKey,
      amount: 1500000,
      // amount: this.selectedProduct?.price * 100, // amount should be in paise format to display Rs 1255 without decimal point
      currency: 'INR',
      name: 'Navkar Artistry Hub', // company name or product name
      description: '',
      image: './../../assets/logo.png',
      order_id: paymentOrderId,
      modal: {
        escape: false,
      },
      notes: {
      },
      theme: {
        color: '#000',
      },
    };
    options.handler = (response: any, error: any) => {
      options.response = response;
      if (error) {
        this.router.navigateByUrl('paymentFailed');
      } else {
        this.orderService
          .verifyPaymentSignature(response, paymentOrderId)
          .subscribe((response: any) => {
            if(response.data.isPaymentVerified){
              this.orderService.setPaymentDetails(true, response.data.paymentId)
              this.router.navigateByUrl('paymentSuccessful')
            }
            else{
              this.orderService.setPaymentDetails(false,'PAYMENT_FAILED')
              this.router.navigateByUrl('paymentFailed');
            }
          });
      }
    };
    options.modal.ondismiss = () => {
      alert('Transaction has been cancelled.');
      this.router.navigateByUrl('paymentFailed');
    };
    const rzp = new this.orderService.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
