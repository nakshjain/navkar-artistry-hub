import {Component, Input} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {WriteReviewsComponent} from "./write-reviews/write-reviews.component";
import {Router} from "@angular/router";

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  @Input()
  product: any

  constructor(private matDialog: MatDialog,
              private router:Router) {
  }

  openDialog(){
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
