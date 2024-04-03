import {Component, OnInit} from '@angular/core';
import {ProductsByCategory} from "../models/products.types";
import {ProductService} from "../api/product.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  allProductsByCategory: ProductsByCategory[]=[]

  constructor(private productService:ProductService) {
  }

  ngOnInit(): void {
    this.productService.getAllProductsByCategory().subscribe(
      (allProductsByCategory)=>{
        this.allProductsByCategory=allProductsByCategory
      }
    )
  }
}
