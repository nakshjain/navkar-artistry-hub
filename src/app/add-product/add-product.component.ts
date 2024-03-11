import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";
import {Observable, Subscriber} from "rxjs";
@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.css']
})
export class AddProductComponent{

  title='Add Product'

  backgroundColor='#FFF0F5'
  availabilityDropdown=['true', 'false']

  formData = {
    name: '',
    about:'',
    price:'',
    category: '',
    imageLink: '',
    availability:''
  };


  clearForm(){
    this.formData = {
      name: '',
      about:'',
      price:'',
      category: '',
      imageLink: '',
      availability:''
    };
  }
  submitForm() {
    // const jsonData=JSON.stringify(this.formData)
    this.productService.addProduct(this.formData)
    // this.clearForm()
  }

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }
}
