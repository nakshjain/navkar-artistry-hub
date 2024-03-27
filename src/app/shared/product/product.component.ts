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
  mainImage=''
  aboutProduct: any

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
        this.getCategory()
        this.getSubCategory()
        this.getAboutProduct()
        console.log(product)
        this.mainImage=this.product.imageLinks[0]
        this.ngxService.stop()
      },(error)=>{
        console.log(error)
      }
    )
  }

  changeMainImage(image: any){
    this.mainImage=image
  }

  getProductsByCategory(category: string){
    this.productService.getProductsByCategory(category).subscribe(
      (productsByCategory)=>{
        this.productsByCategory=productsByCategory
      }
    )
  }

  getCategory(){
    this.category = categories.find(category => category.name === this.product.category);
  }

  getSubCategory(){
    this.subCategory = subCategories[this.category.name].find(subCategory=> subCategory.name===this.product.subCategory);
  }

  getAboutProduct(){
    const sentences=this.product.about.split('.').filter((sentence: string) => sentence.trim() !== '');
    this.aboutProduct=sentences.map((sentence: string) => `${sentence.trim()}.`);
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
