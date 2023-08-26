import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../types/products.types";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../api/product.service";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  product: Product={
    id:'',
    name:'',
    about:'',
    imageUrl:'',
    category:'',
    available: '0'
  };
  productsByCategory:Product[]=[]
  titleSimilar='Similar Items'
  backgroundColor='#FFF0F5'

  getQuote(): void {
    this.router.navigate(['get-quote', this.product.id]); // Navigate to detail page with product ID
  }

  getProductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
        if(product){
          this.product=product;
          this.getProductsByCategory(this.product.category)
        }
        this.ngxService.stop()
      }
    )
  }

  getProductsByCategory(category: string){
    this.productService.getProductsByCategory(category).subscribe(
      (productsByCategory)=>{
        this.productsByCategory=productsByCategory
      }
    )
  }


  constructor(private router: Router, private route: ActivatedRoute, private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ngxService.start()
      const productId = params['id'];
      this.getProductById(productId);
    });
  }
}
