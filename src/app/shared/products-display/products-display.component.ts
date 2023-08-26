import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../types/products.types";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit{
  @Input()
  products: Product[]=[]
  @Input()
  searchText=''
  @Input()
  category=''

  constructor(private router: Router) {
  }

  ngOnInit(): void {
  }
  viewProductDetails(productId: string): void {
    this.router.navigate(['product', productId]); // Navigate to detail page with product ID
  }
}
