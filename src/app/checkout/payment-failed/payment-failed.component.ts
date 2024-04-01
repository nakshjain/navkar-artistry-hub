import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit{

  constructor(private orderService:OrderService) {
  }

  ngOnInit(){
  }

  // deleteOrderId(){
    // this.orderService.deleteOrderId().subscribe(
    //   (response)=>{
    //     console.log(response)
    //   },(error)=>{
    //     console.log(error)
    //   }
    // )
  // }
}
