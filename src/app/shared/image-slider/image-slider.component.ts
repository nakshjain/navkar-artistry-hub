import {Component, Input} from '@angular/core';
import {Product} from "../../types/products.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @Input()
  slideConfigDesktop={
    "slidesToShow": 10,
    "slidesToScroll": 1,
    "autoplay":true,
    "autoplaySpeed": 900,
    "infinite": true
  }
  @Input()
  slideConfigMobile={
    "slidesToShow": 3,
    "slidesToScroll": 1,
    "autoplay":true,
    "autoplaySpeed": 900,
    "infinite": true
  }
  @Input()
  category: string=''
  @Input()
  title: string=''
  @Input()
  products :Product[]=[]

  constructor(private router: Router){
  }

  viewProductDetails(productId: string): void {
    console.log(this.products)
    this.router.navigate(['product', productId]); // Navigate to detail page with product ID
  }
}
