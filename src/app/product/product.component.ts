import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Product} from "../models/products.types";
import {ProductService} from "../api/product.service";
import {categories, subCategories} from "../models/products-categories";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  product: any;
  mainImage=''
  aboutProduct: any
  quantityAvailable=1

  category: any;
  subCategory: any;

  similarProducts:Product[]=[]
  titleSimilar='You may also like'

  form = this.fb.group({
    quantity: [1, [Validators.required, Validators.max(this.quantityAvailable)]]
  });

  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private route: ActivatedRoute,
              private productService:ProductService,
              private fb:FormBuilder) {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      const productId = params['id'];
      this.getProductById(productId);
    });
  }

  getProductById(id: string){
    this.ngxUiLoaderService.start()
    this.productService.getProductById(id).subscribe(
      (product)=>{
        this.product=product;
        this.quantityAvailable=product.quantity
        this.form = this.fb.group({
          quantity: [1, [Validators.required, Validators.max(this.quantityAvailable)]]
        });
        this.getProductsByCategory(this.product.category)
        this.getCategory()
        this.getSubCategory()
        this.getAboutProduct()
        this.ngxUiLoaderService.stop()
        this.mainImage=this.product.imageLinks[0]
      },(error)=>{
        console.error(error)
        this.ngxUiLoaderService.stop()
      }
    )
  }

  changeMainImage(image: any){
    this.mainImage=image
  }

  getProductsByCategory(category: string){
    this.productService.getProductsByCategory(category).subscribe(
      (productsByCategory)=>{
        productsByCategory.forEach((product)=>{
          if(product.productId!==this.product.productId){
            this.similarProducts.push(product)
          }
        })
      }
    )
  }

  getCategory(){
    const category=categories.find(category => category.name === this.product.category);
    if(category) {
      this.category = category
    }
  }

  getSubCategory(){
    const subCategory = subCategories[this.category.name].find(subCategory=> subCategory.name===this.product.subCategory)
    if(subCategory){
      this.subCategory=subCategory
    }
  }

  getAboutProduct(){
    const sentences=this.product.about.split('.').filter((sentence: string) => sentence.trim() !== '');
    this.aboutProduct=sentences.map((sentence: string) => `${sentence.trim()}.`);
  }

  get quantityControl() {
    return this.form.get('quantity');
  }
  isInvalidAddress(controlName: string) {
    const control = this.form.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  decreaseQuantity() {
    let currentValue = this.quantityControl?.value;
    if (currentValue && currentValue > 1) {
      this.quantityControl?.setValue(currentValue - 1);
    }
  }

  increaseQuantity() {
    let currentValue = this.quantityControl?.value;
    if (currentValue && currentValue < this.quantityAvailable) {
      this.quantityControl?.setValue(currentValue + 1);
    }
  }
}
