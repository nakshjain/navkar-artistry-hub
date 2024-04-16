import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Router} from "@angular/router";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  title='Your Orders'
  subTitle='Browse Your Order History'
  orders: any
  constructor(private orderService:OrderService,
              private ngxUiLoaderService:NgxUiLoaderService,
              private router:Router,
              private titleService: Title) {
  }
  ngOnInit(){
    this.titleService.setTitle('Your Orders')
    this.getAllOrders()
  }
  getAllOrders(){
    this.ngxUiLoaderService.start()
    this.orderService.getAllOrders().subscribe(
      (response)=>{
        this.orders=response.orders
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.error(error)
        this.ngxUiLoaderService.stop()
      }
    )
  }

  viewProductDetails(productId: string){
    this.router.navigate(['product', productId]);
  }

  viewOrderDetails(orderId: string) {
    this.router.navigate((['order-details', orderId]))
  }
}
