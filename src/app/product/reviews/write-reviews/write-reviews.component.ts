import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ProductService} from "../../../api/product.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-write-reviews',
  templateUrl: './write-reviews.component.html',
  styleUrls: ['./write-reviews.component.css']
})
export class WriteReviewsComponent implements OnInit{
  rating=0
  title='';
  writtenReview='';
  files:File[]=[]
  user: any

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,
              private dialogRef:MatDialogRef<WriteReviewsComponent>,
              private productService:ProductService,
              private snackBar:MatSnackBar,
              private ngxUiLoaderService:NgxUiLoaderService) {
  }

  ngOnInit(){
    const storedUserDetails = sessionStorage.getItem('userDetails');
    this.user = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    if(this.user){
    }
    else{
    }
  }
  givenRating($event: number) {
    this.rating=$event
  }

  submitReview() {
    this.ngxUiLoaderService.start()
    const formData= new FormData()
    let i=0

    const title=this.user.userId.toLowerCase()

    this.files.forEach(
      (file)=>{
        let blob = file.slice(0, file.size, file.type);
        const mimeType = file.type;
        const fileExtension = mimeType.split('/')[1];
        const name=title+'-'+i+'.'+fileExtension
        let newFile = new File([blob], name, { type: file.type });
        formData.append('images', newFile);
        i++;
      }
    )
    const review={
      title: this.title,
      writtenReview: this.writtenReview,
      rating: this.rating
    }
    formData.append('title',this.title)
    formData.append('writtenReview',this.writtenReview)
    formData.append('rating',this.rating.toString())
    formData.append('productId', this.data.productId);

    this.productService.addReview(formData).subscribe(
      (response)=>{
        this.openSnackBar(response.message, 'Successful')
        this.dialogRef.close()
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.error(error)
        this.ngxUiLoaderService.stop()
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

  onSelect($event: any) {
    this.files.push(...$event.addedFiles)
  }

  onRemove(event: any){
    this.files.splice(this.files.indexOf(event),1)
  }
}
