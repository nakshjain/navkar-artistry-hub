import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-browse-by-category',
  templateUrl: './available-products.component.html',
  styleUrls: ['./available-products.component.css']
})
export class AvailableProductsComponent implements OnInit{
  categoryHeading='All Products'
  category: any;
  bgColor='lightbrown'

  constructor(private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      this.category= params['category'];
    });
    if(this.category){
      this.categoryHeading=this.category
    }
  }
}
