import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Product} from "../../../models/products.types";
import {ProductService} from "../../../api/product.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-write-reviews',
  templateUrl: './write-reviews.component.html',
  styleUrls: ['./write-reviews.component.css']
})
export class WriteReviewsComponent {
  rating=0
  title='';
  writtenReview='';

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef:MatDialogRef<WriteReviewsComponent>,
              private productService:ProductService,
              private snackBar:MatSnackBar) {
  }

  givenRating($event: number) {
    this.rating=$event
  }

  submitReview() {
    const review={
      title: this.title,
      writtenReview: this.writtenReview,
      rating: this.rating
    }
    this.productService.addReview(this.data.productId, review).subscribe(
      (response)=>{
        this.openSnackBar(response.message, 'Successful')
        this.dialogRef.close()
      },(error)=>{
        console.error(error)
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
}
