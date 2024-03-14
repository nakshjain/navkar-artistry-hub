import {AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Product} from "../../types/products.types";
import {Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ProductService} from "../../api/product.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-products-display',
  templateUrl: './products-display.component.html',
  styleUrls: ['./products-display.component.css']
})
export class ProductsDisplayComponent implements OnInit, OnChanges{
  @Input()
  searchText=''
  @Input()
  category=''

  products: any[]=[]
  categories:string[]=[]
  areProductsFound=true
  isFilterHidden=true
  showOutOfStock=false
  isToSortOpen=false
  selectedSortingOption={
    name:'Sort',
    value:''
  }

  sortingOptions=[
    {
      name:'Price, low to high',
      value:'price: 1',
    },
    {
      name:'Price, high to low',
      value:'price: -1',
    },
    {
      name:'',
      value:'',
    },
  ]

  selectOption(option: any){
    this.selectedSortingOption=option
    this.isToSortOpen=false
    this.getProducts()
  }

  constructor(private ngxService:NgxUiLoaderService, private router: Router, private productService:ProductService) {
    this.getProducts()
    this.getCategories()
  }
  getProducts(){
    this.ngxService.start()
    if (!this.category) {
      this.category = ''
    }
    this.productService.getProducts(this.selectedSortingOption.value, '', this.searchText, this.category, !this.showOutOfStock).subscribe(
      (products) => {
        this.products = products
        this.ngxService.stop()
        console.log(products)
        this.areProductsFound=true
      },(error)=>{
        console.log(error)
      }
    )
  }
  getCategories(){
    this.productService.getAllCategories().subscribe(
      (categories)=>{
        this.categories=categories
      },(err)=>{
        console.log(err)
      }
    )
  }
  ngOnInit() {
    this.getProducts()
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes){
      this.getProducts()
    }
  }
  onCategorySelectChanged(event: any){
    this.category=event.value
    console.log(this.category)
  }
  onShowOutOfStockChange(event: MatCheckboxChange) {
    this.showOutOfStock = event.checked;
    this.getProducts()
  }

  viewProductDetails(productId: string): void {
    this.router.navigate(['product', productId]);
  }

  toggleFilterVisibility() {
    this.isFilterHidden=!this.isFilterHidden
  }

  toggleSortingDropdown() {
    this.isToSortOpen = !this.isToSortOpen;
  }
  toggleCategoriesDropdown() {
    this.isCategoriesOpen = !this.isCategoriesOpen;
  }
  isCategoriesOpen=false
}
