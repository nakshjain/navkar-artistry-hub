import {Component, EventEmitter, Inject, Output} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../api/product.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";

@Component({
  selector: 'app-add-product-images',
  templateUrl: './add-product-images.component.html',
  styleUrls: ['./add-product-images.component.css']
})
export class AddProductImagesComponent {
  files:File[]=[]
  defaultImageUrl=''

  @Output() closeDialogEvent = new EventEmitter<void>();

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private productService:ProductService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data){
      this.defaultImageUrl=data.imageLinks[0]
    }
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

  addImages() {
    this.ngxUiLoaderService.start()
    const formData = new FormData();
    let i=0
    const existingImages=this.data.imageLinks

    if (existingImages && existingImages.length > 0) {
      for (const imageName of existingImages) {
        const extractedNumber = parseInt(imageName.split("-").pop().split(".")[0]);
        i = Math.max(i, extractedNumber);
      }
    }
    i++;
    const title = this.data.name.toLowerCase().replace(/\s+/g, '-');
    const productId=this.data.productId

    this.files.forEach(
      file => {
        let blob = file.slice(0, file.size, file.type);
        const mimeType = file.type;
        const fileExtension = mimeType.split('/')[1];
        const name=title+'-'+i+'.'+fileExtension
        let newFile = new File([blob], name, { type: file.type });
        formData.append('images', newFile);
        i++;
      }
    );
    formData.append('name', title);
    formData.append('productId', productId);

    this.productService.addProductImages(formData).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        this.closeDialog()
        this.openSnackBar('Image(s) added Successfully', 'Success');
      },(error)=>{
        this.ngxUiLoaderService.stop()
        this.openSnackBar(error.error.error, 'Error');
      }
    )
  }

  defaultImage(defaultImageUrl: string) {
    this.ngxUiLoaderService.start()
    this.productService.defaultProductImage(this.data.productId, defaultImageUrl).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        this.closeDialog()
        this.openSnackBar('Successfully Updated Default Image', 'Success');
      },(error)=>{
        this.ngxUiLoaderService.stop()
        this.openSnackBar(error.error.error, 'Error');
      }
    )
  }

  deleteImage(imageUrl: any) {
    this.ngxUiLoaderService.start()
    this.productService.deleteProductImage(imageUrl, this.data.productId).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        this.closeDialog()
        this.openSnackBar('Image removed Successfully', 'Success');
      },(error)=>{
        this.ngxUiLoaderService.stop()
        this.openSnackBar(error.error.error, 'Error');
      }
    )
  }
}
