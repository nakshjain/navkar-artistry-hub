import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../../types/products.types";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../api/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  product: any;
  productsBycategory:Product[]=[]
  titleSimilar='Similar products'
  backgroundColor='#FFF0F5'

  constructor(private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  ngOnInit(){
    this.route.params.subscribe(params => {
      this.ngxService.start()
      const productId = params['id'];
      this.getproductById(productId);
    });
  }

  getproductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
        this.product=product;
        this.ngxService.stop()
        this.getproductsBycategory(this.product.category)
      }
    )
  }

  getproductsBycategory(category: string){
    this.productService.getProductsByCategory(category).subscribe(
      (productsBycategory)=>{
        this.productsBycategory=productsBycategory
      }
    )
  }
}
