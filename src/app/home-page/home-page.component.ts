import {Component, OnInit} from '@angular/core';
import {ProductsByCategory} from "../models/products.types";
import {ProductService} from "../api/product.service";
import {Router} from "@angular/router";
import {AlertDialogComponent} from "./alert-dialog/alert-dialog.component";
import {MatDialog} from "@angular/material/dialog";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css'],
})
export class HomePageComponent implements OnInit{
  title='Navkar Artistry Hub'
  titleBackgroundImage='https://assets.navkarartistryhub.com/home-page/home-page-background.png'

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

  allProductsByCategory: ProductsByCategory[]=[]

  constructor(private productService:ProductService,
              private router: Router,
              private dialog: MatDialog,
              private titleService:  Title) {
  }

  ngOnInit(): void {
    this.productService.getAllProductsByCategory().subscribe(
      (allProductsByCategory)=>{
        this.allProductsByCategory=allProductsByCategory
      }
    )
    this.titleService.setTitle(this.title)
    // this.demoAlert();
  }

  viewCategory(element: any) {
    this.router.navigate([element.link])
  }

  demoAlert() {
    const dialogRef = this.dialog.open(AlertDialogComponent, {
      data: {
        message: '<strong>Notice:</strong> This is a demo environment. Any orders placed will not be fulfilled or processed.'
      }
    });
  }
}
