import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {Product} from "../../types/products.types";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../api/product.service";
import {categories, subCategories} from "../../types/products-categories";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  product: any
  quantity=1

  category:any;
  subCategory:any;

  productsByCategory:Product[]=[]
  titleSimilar='You may also like'

  categories=categories
  subCategories=subCategories

  constructor(private router: Router,
              private route: ActivatedRoute,
              private ngxService: NgxUiLoaderService,
              private productService:ProductService) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.ngxService.start()
      const productId = params['id'];
      this.getProductById(productId);
    });
  }

  getProductById(id: string){
    this.productService.getProductById(id).subscribe(
      (product)=>{
        this.product=product;
        this.getProductsByCategory(this.product.category)
        this.getCategory(this.product.category)
        this.ngxService.stop()
      },(error)=>{
        console.log(error)
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

  getCategory(categoryReceived: string){
    this.category = categories.find(category => category.name === categoryReceived);
  }

  decreaseQuantity() {
    if(this.quantity > 0){
      this.quantity-=1
    }
  }

  onInputQuantity(){
    if(this.quantity < 0){
      this.quantity=0
    }
  }
  increaseQuantity() {
    this.quantity+=1
  }
}
