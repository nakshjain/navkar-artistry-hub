import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WriteReviewsComponent} from "./write-reviews/write-reviews.component";

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
    const dialogRef=this.matDialog.open(WriteReviewsComponent,{
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
}
