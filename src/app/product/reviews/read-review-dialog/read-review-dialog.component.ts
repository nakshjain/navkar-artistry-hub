import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-read-review-dialog',
  templateUrl: './read-review-dialog.component.html',
  styleUrls: ['./read-review-dialog.component.css']
})
export class ReadReviewDialogComponent {
  review: any
  selectedImageLink:any
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.review=data
    if(this.review.images.length!==0){
      this.selectedImageLink=this.review.images[0]
    }
  }

  changeImage(image: Element) {
    this.selectedImageLink=image
  }
}
