import {Component, Input, OnInit} from '@angular/core';
import {Product} from "../types/products.types";
import {NgxUiLoaderService} from "ngx-ui-loader";

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

  onSearchTextEntered(searchValue: string){
    this.searchText=searchValue
  }

  onCategorySelected(selectValue: string){
    this.categorySelect=selectValue
  }

  constructor(private ngxService:NgxUiLoaderService) {
  }
  ngOnInit(): void {
    this.onSearchTextEntered(this.searchText)
    this.onCategorySelected(this.categorySelect)
    this.ngxService.start()
    setTimeout(()=>{
      this.ngxService.stop()
    })
  }
}
