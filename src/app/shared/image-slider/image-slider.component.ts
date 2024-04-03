import {Component, Input} from '@angular/core';
import {Product} from "../../models/products.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-image-slider',
  templateUrl: './image-slider.component.html',
  styleUrls: ['./image-slider.component.css']
})
export class ImageSliderComponent {
  @Input()
  category:any
  @Input()
  title: string=''
  @Input()
  products :Product[]=[]

  slideConfig={
    "slidesToShow": 7,
    "slidesToScroll": 1,
    "autoplay":true,
    "autoplaySpeed": 900,
    "pauseOnHover": true,
    "infinite": true,
    "responsive":[
      {
        "breakpoint": 768,
        "settings":{
          "slidesToShow": 3,
          "slidesToScroll": 1,
        }
      }
    ]
  }

  constructor(private router: Router){
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }

  viewAllSimilarProducts(){
    this.router.navigate([this.category.link]);
  }
}
