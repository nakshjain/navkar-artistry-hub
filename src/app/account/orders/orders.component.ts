import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css']
})
export class OrdersComponent implements OnInit{
  constructor(private orderService:OrderService,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }
  ngOnInit(){
    this.getAllOrders()
  }
  getAllOrders(){
    // this.ngxUiLoaderService.start()
    this.orderService.getAllOrders().subscribe(
      (response)=>{
        console.log(response)
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.log(error)
        this.ngxUiLoaderService.stop()
      }
    )
  }
}
