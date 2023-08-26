import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../types/products.types";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  @Input()
  title=''
  @Input()
  category=''
  @Input()
  hideFilterBar: boolean=false
  @Input()
  hideSelectBar: boolean=false
  @Input()
  hideSearchBar: boolean=false
  @Input()
  backgroundColor: string='lightblue'

  products: Product[]=[]
  searchText=''
  categorySelect=''
  categories: string[]=[]

  onSearchTextEntered(searchValue: string){
    this.searchText=searchValue
  }

  onCategorySelected(selectValue: string){
    this.categorySelect=selectValue
  }

  getProducts(): void {
    if(this.title==='Archived Products'){
      this.productService.getAllArchivedProducts().subscribe(
        (products)=>{
          this.products=products
          console.log(this.products)
          this.ngxService.stop()
        }
      )
    }
    else{
      this.productService.getAllAvailableProducts().subscribe(
        (products)=>{
          this.products=products
          console.log(this.products)
          this.ngxService.stop()
        }
      )
    }
  }

  getCategories(){
    this.productService.getAllCategories().subscribe(
      (categories)=>{
        this.categories=categories
        console.log(categories)
      }
    )
  }

  constructor(private ngxService:NgxUiLoaderService, private productService: ProductService) {
  }
  ngOnInit(): void {
    this.ngxService.start()
    this.getCategories()
    this.getProducts()
    this.onSearchTextEntered(this.searchText)
    this.onCategorySelected(this.categorySelect)
  }
}
