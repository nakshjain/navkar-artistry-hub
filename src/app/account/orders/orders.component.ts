import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  title='My Orders'
  subTitle='Browse Your Order History'
  orders: any
  constructor(private orderService:OrderService,
              private ngxUiLoaderService:NgxUiLoaderService,
              private router:Router) {
  }
  ngOnInit(){
    this.getAllOrders()
  }
  getAllOrders(){
    this.ngxUiLoaderService.start()
    this.orderService.getAllOrders().subscribe(
      (response)=>{
        this.orders=response.orders
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.log(error)
        this.ngxUiLoaderService.stop()
      }
    )
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }
}
