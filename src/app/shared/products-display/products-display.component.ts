import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../../types/products.types";
import {Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../../api/product.service";

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit{
  products: Product[]=[]
  @Input()
  searchText=''
  @Input()
  category=''

  constructor(private router: Router, private ngxService: NgxUiLoaderService, private productService: ProductService) {
  }

  ngOnInit(): void {
    this.getproducts();
  }

  getproducts(): void {
    this.productService.getProductsAll().subscribe(
      (products)=>{
        this.products=products
      }
    )
  }
  viewproductDetails(productId: string): void {
    this.router.navigate(['product', productId]); // Navigate to detail page with product ID
  }
}
