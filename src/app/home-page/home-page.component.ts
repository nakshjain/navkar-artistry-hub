import {Component, OnInit} from '@angular/core';
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductsByCategory} from "../types/products.types";
import {ProductService} from "../api/product.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  allProductsByCategory: ProductsByCategory[]=[]

  constructor(private ngxService: NgxUiLoaderService, private productService:ProductService) {
  }

  ngOnInit(): void {
    this.ngxService.start()
    this.productService.getAllProductsByCategory().subscribe(
      (allProductsByCategory)=>{
        console.log()
        this.allProductsByCategory=allProductsByCategory
        this.ngxService.stop()
      }
    )
  }
}
