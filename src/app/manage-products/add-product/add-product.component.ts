import {Component, EventEmitter, Inject, Output} from '@angular/core'
import {ProductService} from "../../api/product.service";
import {categories, subCategories} from "../../types/products-categories";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {FormArray, FormBuilder, Validators} from "@angular/forms";
import {Product} from "../../types/products.types";

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{
  title='Add Product'
  isEditForm=false
  productId='aaaaa'

  availabilityDropdown=['true', 'false']
  categories=categories
  subCategories=subCategories

  categorySelected=''
  responseText=''
  responseTextColor='green'

  productForm=this.fb.group({
    name: ['', Validators.required],
    about:['', Validators.required],
    price:[0, Validators.required],
    category: ['', Validators.required],
    subCategory: ['', Validators.required],
    imageLinks: this.fb.array([['', Validators.required]]),
    availability:['', Validators.required],
    quantity:[0, Validators.required]
  })

  getControls() {
    return (this.productForm.get('imageLinks') as FormArray).controls;
  }

  @Output() closeDialogEvent = new EventEmitter<void>();

  closeDialog() {
    this.closeDialogEvent.emit();
  }

  constructor(private fb: FormBuilder,
              private productService:ProductService,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data){
      this.isEditForm=true
      this.initForm(data)
    }
  }

  private initForm(product: Product){
    this.productId=product.productId
    this.categorySelected=product.category
    this.title='Update Product Details'
    this.productForm=this.fb.group({
      name: [product.name, Validators.required],
      about:[product.about, Validators.required],
      price:[product.price, Validators.required],
      category: [product.category, Validators.required],
      subCategory: [product.subCategory, Validators.required],
      imageLinks: this.fb.array(product.imageLinks),
      availability:[product.availability.toString(), Validators.required],
      quantity:[product.quantity, Validators.required]
    })
  }

  addImageLink() {
    const imageLinksArray = this.productForm.get('imageLinks') as FormArray;
    imageLinksArray.push(this.fb.control(''));
  }

  addProduct() {
    this.productService.addProduct(this.productForm.value).subscribe(
      (response)=>{
        this.openSnackBar(this.productForm.value.name+' added successfully!', 'Success');
        this.closeDialog()
      },error => {
        console.log(error)
        this.openSnackBar(error.error.error, 'Error');
        this.responseTextColor='red'
        this.responseText=error.error.error
      }
    )
  }
  updateProduct() {
    const productFormUpdate={...this.productForm.value, productId: this.productId};
    this.productService.updateProduct(productFormUpdate).subscribe(
      (response)=>{
        this.openSnackBar(productFormUpdate.name+' updated successfully!', 'Success');
        this.closeDialog()
      },error => {
        console.log(error)
        this.responseTextColor='red'
        this.responseText=error.error.error
        this.openSnackBar(error.error.error, 'Error');
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
  onCategorySelected(category: string) {
    this.categorySelected=category
  }
}
