import {Component, OnInit} from '@angular/core';
import {OrderService} from "../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  orderId=''
  order: any
  address: any
  subtotal=0
  constructor(private orderService:OrderService,
              private route:ActivatedRoute,
              private router:Router,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }

  ngOnInit() {
    this.verifyOrderId()
  }

  getOrderId(){
    this.orderId=this.route.snapshot.params['orderId']
  }

  verifyOrderId(){
    this.getOrderId()
    this.ngxUiLoaderService.start()
    this.orderService.getOrderDetails(this.orderId).subscribe(
      (response)=>{
        this.order=response.order
        this.address=this.order.deliveryAddress
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.log(error)
        this.ngxUiLoaderService.stop()
      }
    )
  }

  viewProductDetails(productId: string){
    this.router.navigate(['product', productId]);
  }
}
