import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {Category, Product} from "../types/products.types";
import {ProductService} from "../api/product.service";
import {categories, subCategories} from "../types/products-categories";

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.css'],
})
export class ProductComponent implements OnInit{
  product: Product;
  quantity=1
  mainImage=''
  aboutProduct: any

  category: Category;
  subCategory: Category;

  productsByCategory:Product[]=[]
  titleSimilar='You may also like'

  constructor(private route: ActivatedRoute,
              private productService:ProductService) {
    this.product = {
      productId: "",
      name: "",
      about: "",
      imageLinks: [""],
      category: "",
      subCategory: "",
      availability: "",
      price: 0,
      quantity: 0
    };
    this.category={
      id:'',
      name:'',
      link:''
    };
    this.subCategory={
      id:'',
      name:'',
      link:''
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
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
        this.mainImage=this.product.imageLinks[0]
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
