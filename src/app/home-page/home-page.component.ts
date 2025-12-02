import {Component, OnInit} from '@angular/core';
import {ProductsByCategory, ProductsByCategoryString} from "../models/products.types";
import {ProductService} from "../api/product.service";
import {Router} from "@angular/router";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {categories} from "../models/products-categories";
import {HomeService} from "../api/home.service";
import {HomePageConfig} from "../models/home.model";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  homePageConfig : HomePageConfig | undefined

  allProductsByCategory:ProductsByCategory[]=[]

  constructor(
    private readonly homeService:HomeService,
    private readonly productService:ProductService,
    private readonly router: Router,
    private readonly dialog: MatDialog,
    private readonly titleService:  Title,
    private readonly ngxUiLoaderService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxUiLoaderService.start()
    this.homeService.getHomePageDetails().subscribe(
      (data)=>{
        console.log(data)
        this.homePageConfig = data
        if (this.homePageConfig?.branding?.brandName) {
          this.titleService.setTitle(this.homePageConfig.branding.brandName);
        }
      }
    )
    this.productService.getAllProductsByCategory().subscribe(
      (allProductsByCategory)=>{
        this.getAllProductsByCategory(allProductsByCategory)
        this.ngxUiLoaderService.stop()
      }
    )
    // this.demoAlert();
  }

  viewCategory(element: any) {
    this.router.navigate([element.link])
  }

  getAllProductsByCategory(allProductsByCategory: ProductsByCategoryString[]){
    categories.forEach(
      (category)=>{
        const products= allProductsByCategory.find(element=>element.category===category.name)?.products
        if(products){
          this.allProductsByCategory.push({category, products})
        }
      }
    )
  }

  demoAlert() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: '<strong>Notice:</strong> This is a demo environment. Any orders placed will not be fulfilled or processed.'
      }
    });
  }
}
