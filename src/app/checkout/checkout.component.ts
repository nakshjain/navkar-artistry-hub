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
  addressTitle='Select Address'
  subTitle='Choose delivery address'
  selectedAddress: any
  paymentOrderId=''
  orderDetails: any
  totalAmount=0
  razorPayKey='rzp_test_ePTB6pCtDu49TQ'

  constructor(private route:ActivatedRoute,
              private router:Router,
              private orderService:OrderService,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }

  ngOnInit() {
    this.verifyOrderId()
  }

  selectAddress(address: any){
    this.selectedAddress=address
    this.addAddressToOrderId()
  }

  getOrderId(){
    return this.route.snapshot.params['paymentOrderId']
  }

  verifyOrderId(){
    this.paymentOrderId=this.getOrderId()
    this.ngxUiLoaderService.start()
    this.orderService.verifyOrderId(this.paymentOrderId).subscribe(
      (response)=>{
        console.log(response)
        this.orderDetails=response.order
        this.totalAmount=response.order.totalAmount
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.log(error)
        this.ngxUiLoaderService.stop()
        // this.router.navigateByUrl('/')
      }
    )
  }

  addAddressToOrderId(){
    this.ngxUiLoaderService.start()
    this.orderService.addAddress(this.selectedAddress, this.paymentOrderId).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.ngxUiLoaderService.stop()
        this.router.navigateByUrl('/')
      }
    )
  }

  payWithRazorPay(){
    console.log('hi')
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
              this.router.navigateByUrl(`paymentSuccessful/${this.paymentOrderId}`)
            }
            else{
              this.orderService.setPaymentDetails(false,'PAYMENT_FAILED')
              this.router.navigateByUrl(`paymentFailed/${this.paymentOrderId}`);
            }
          });
      }
    };
    options.modal.ondismiss = () => {
      alert('Transaction has been cancelled.');
      this.backToCart()
    };
    const rzp = new this.orderService.nativeWindow.Razorpay(options);
    rzp.open();
  }

  backToCart() {
    this.ngxUiLoaderService.start()
    this.orderService.deleteOrder(this.paymentOrderId).subscribe(
      (response)=>{
        this.router.navigateByUrl('/cart')
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }
}
