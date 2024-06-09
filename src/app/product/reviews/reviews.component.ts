import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WriteReviewDialogComponent} from "./write-reviews/write-review-dialog.component";
import {ReadReviewDialogComponent} from "./read-review-dialog/read-review-dialog.component";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input()
  product: any

  constructor(private matDialog: MatDialog) {
  }

  openDialog(){
    console.log(this.product)
    const dialogRef=this.matDialog.open(WriteReviewDialogComponent,{
      data:this.product
    })
    dialogRef.afterClosed().subscribe(
      ()=>{
        window.location.reload()
      }
    )
  }

  writeReview() {
    this.openDialog()
  }

  customizeReviews() {
  }

  readReview(review: any) {
    review['productName']= this.product.name
    review['subCategory']=this.product.subCategory
    this.matDialog.open(ReadReviewDialogComponent,{
      data: review
    })
  }
}
