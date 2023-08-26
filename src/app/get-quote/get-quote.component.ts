import {Component, OnInit} from '@angular/core'
import {ActivatedRoute} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";

@Component({
  selector: 'app-get-quote',
  templateUrl: './get-quote.component.html',
  styleUrls: ['./get-quote.component.css']
})
export class GetQuoteComponent implements OnInit{
  formData = {
    title: '',
    lastName:'',
    firstName:'',
    email: '',
    contactNumber: ''
  };

  submitForm() {
    console.log('Form data submitted:', this.formData);
  }

  title='Get Quote'
  product: any;
  backgroundColor='#FFF0F5'

  getproductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
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
      this.getproductById(productId);
    });
  }
}
