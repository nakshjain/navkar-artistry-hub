import {Component} from '@angular/core'
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

  availabilityDropdown=['true', 'false']
  categories=categories
  subCategories=subCategories

  categorySelected=''
  responseText=''
  responseTextColor='green'

  formData = {
    name: '',
    about:'',
    price:'',
    category: '',
    subCategory: '',
    imageLink: '',
    availability:'',
    quantity:''
  };

  clearForm(){
    this.formData = {
      name: '',
      about:'',
      price:'',
      category: '',
      subCategory: '',
      imageLink: '',
      availability:'',
      quantity:''
    };
  }

  submitForm() {
    console.log(this.formData)
    this.ngxService.start()
    const imageUrl=this.formData.imageLink
    const imageId = imageUrl.split("/").pop();
    this.formData.imageLink=`https://i.imgur.com/${imageId}.jpeg`
    this.productService.addProduct(this.formData).subscribe(
      (response)=>{
        this.responseTextColor='green'
        this.responseText=response.message
        this.ngxService.stop()
        this.clearForm()
      },error => {
        console.log(error)
        this.responseTextColor='red'
        this.responseText=error.error.error
        this.ngxService.stop()
      }
    )
  }

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  onCategorySelected($event: any) {
    this.categorySelected=$event.target.value
  }
}
