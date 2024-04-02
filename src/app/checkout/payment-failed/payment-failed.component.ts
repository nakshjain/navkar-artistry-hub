import {Component, OnInit} from '@angular/core';
import {OrderService} from "../../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ActivatedRoute, Router} from "@angular/router";
import {timeInterval} from "rxjs";

@Component({
  selector: 'app-payment-failed',
  templateUrl: './payment-failed.component.html',
  styleUrls: ['./payment-failed.component.css']
})
export class PaymentFailedComponent implements OnInit{
  remainingTime: number = 4;
  countdownInterval: any;

  constructor(private orderService:OrderService,
              private ngxUiLoaderService: NgxUiLoaderService,
              private router:Router,
              private route:ActivatedRoute) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      const paymentOrderId = params['paymentOrderId'];
      this.deleteOrder(paymentOrderId);
    });
  }

  deleteOrder(paymentOrderId: string) {
    this.ngxUiLoaderService.start()
    this.orderService.deleteOrder(paymentOrderId)
      .subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop();
        this.countdownInterval = setInterval(() => {
          this.remainingTime--;
          if (this.remainingTime <= 0) {
            clearInterval(this.countdownInterval);
            this.router.navigateByUrl('/cart');
          }
        }, 1000)
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }

  protected readonly timeInterval = timeInterval;
}
