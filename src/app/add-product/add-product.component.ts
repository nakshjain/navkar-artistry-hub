import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";
import {categories, subCategories} from "../types/products-categories";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  title='Add Product'

  backgroundColor='#FFF0F5'
  availabilityDropdown=['true', 'false']
  categories=categories
  subCategories=subCategories

  categorySelected=''

  formData = {
    name: '',
    about:'',
    price:'',
    category: '',
    subCategory: '',
    imageLink: '',
    availability:''
  };

  clearForm(){
    this.formData = {
      name: '',
      about:'',
      price:'',
      category: '',
      subCategory: '',
      imageLink: '',
      availability:''
    };
  }

  submitForm() {
    // const jsonData=JSON.stringify(this.formData)
    console.log(this.formData)
    this.productService.addProduct(this.formData).subscribe(
      (response)=>{
        console.log(response)
        this.clearForm()
      },error => {
        console.log(error)
      }
    )
    // this.clearForm()
  }

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  onCategorySelected($event: any) {
    this.categorySelected=$event.target.value
  }
}
