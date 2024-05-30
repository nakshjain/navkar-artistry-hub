import {Component, OnInit} from '@angular/core';
import {ProductsByCategory, ProductsByCategoryString} from "../models/products.types";
import {ProductService} from "../api/product.service";
import {Router} from "@angular/router";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {categories} from "../models/products-categories";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  title='Navkar Artistry Hub'
  titleBackgroundImage='https://assets.navkarartistryhub.com/home-page/home-page-background.png'
  titleBackgroundImageMobile='https://assets.navkarartistryhub.com/home-page/home-page-background-mobile.png'

  elements=[
    {
      alt:'home-page-paintings',
      heading:'Paintings',
      imageLink:'https://assets.navkarartistryhub.com/home-page/home-page-paintings.png',
      link:'shop/paintings'
    },
    {
      alt:'home-page-home-decor',
      heading:'Home Decor',
      imageLink:'https://assets.navkarartistryhub.com/home-page/home-page-home-decor.png',
      link:'shop/home-decor'
    },
    {
      alt:'home-page-jewellery',
      heading:'Jewellery',
      imageLink:'https://assets.navkarartistryhub.com/home-page/home-page-jewellery.png',
      link:'shop/jewellery'
    },
  ]

  allProductsByCategory:ProductsByCategory[]=[]

  constructor(private productService:ProductService,
              private router: Router,
              private dialog: MatDialog,
              private titleService:  Title,
              private ngxUiLoaderService: NgxUiLoaderService) {
  }

  ngOnInit(): void {
    this.ngxUiLoaderService.start()
    this.productService.getAllProductsByCategory().subscribe(
      (allProductsByCategory)=>{
        this.getAllProductsByCategory(allProductsByCategory)
        this.ngxUiLoaderService.stop()
      }
    )
    this.titleService.setTitle(this.title)
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
