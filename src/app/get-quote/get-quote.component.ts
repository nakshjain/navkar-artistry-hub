import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";
import {Product} from "../types/products.types";

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit{
  yourInfo='Your Information'
  yourBudget='Your Budget'
  caption='Unlock the Beauty of Artistry: Discover Your Canvas\'s Worth with a Custom Quote!'

  title='Get Quote'
  product: Product={
    id:'',
    name:'',
    about:'',
    imageUrl:'',
    category:'',
    available: '0'
  };

  backgroundColor='#FFF0F5'

  titleDropdown=['Mr', 'Mrs', 'Miss']
  budgetDropdown=['100-1000', '1000-2000', '2000-3000']

  formData = {
    title: '',
    lastName:'',
    firstName:'',
    email: '',
    contactNumber: '',
    communicationMethod:'',
    budget:''
  };

  submitForm() {
    console.log('Form data submitted:', this.formData);
  }

  getProductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
        if(product)
        this.product=product;
        this.ngxService.stop()
      }
    )
  }

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ngxService.start()
      const productId = params['id'];
      this.getProductById(productId);
    });
  }
}
