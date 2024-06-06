import {Component, OnInit} from '@angular/core';
import {OrderService} from "../api/order.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ActivatedRoute, Router} from "@angular/router";
import {Title} from "@angular/platform-browser";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MatDialog} from "@angular/material/dialog";
import {CancelOrderDialogComponent} from "./cancel-order/cancel-order-dialog.component";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit{
  orderId=''
  order: any
  address: any

  constructor(private orderService:OrderService,
              private route:ActivatedRoute,
              private router:Router,
              private ngxUiLoaderService:NgxUiLoaderService,
              private titleService: Title,
              private snackBar: MatSnackBar,
              private matDialog:MatDialog) {
  }

  ngOnInit() {
    this.titleService.setTitle('Order Details')
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
        this.openSnackBar(error.error.message, 'Failed')
        this.ngxUiLoaderService.stop()
      }
    )
  }

  viewProductDetails(productId: string){
    this.router.navigate(['product', productId]);
  }

  cancelOrder(orderItem: any) {
    this.ngxUiLoaderService.start()
    const productId=orderItem.product._id
    const quantityOrdered=orderItem.quantity
    this.orderService.cancelOrder(this.orderId, productId, quantityOrdered).subscribe(
      (response)=>{
        this.openSnackBar(response.message, 'Success')
        this.verifyOrderId()
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
        this.verifyOrderId()
      }
    )
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';

    this.snackBar.open(message, action, config)
  }

  openDialog(orderItem: any){
    const dialogRef=this.matDialog.open(CancelOrderDialogComponent,{
      data:  orderItem
    })

    dialogRef.afterClosed().subscribe(
      (result)=>{
        if(result==='CONFIRM'){
          this.cancelOrder(orderItem)
        } else{
          this.verifyOrderId()
        }
      }
    )
  }
}
