import {
  Component,
  Input,
  OnInit,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ProductService} from "../api/product.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {categories, subCategories} from "../types/products-categories";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit{
  title='Shop'
  subTitle=''
  @Input()
  searchText=''
  @Input()
  category:any
  subCategory:any
  showOutOfStock=false

  products: any[]=[]
  categoriesToDisplay:string[]=[]
  categories=categories
  subCategories=subCategories
  areProductsFound=true
  isFilterHidden=true
  isToSortOpen=false
  isCategoriesOpen=false

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

  selectSortingOption(option: any){
    this.selectedSortingOption=option
    this.isToSortOpen=false
    this.getProducts()
  }

  constructor(private ngxService:NgxUiLoaderService, private router: Router, private productService:ProductService, private activatedRoute: ActivatedRoute) {
    console.log(this.category)
  }

  getProducts(){
    this.ngxService.start()
    if(!this.category){
      this.category={
        id: '',
        name: '',
        link: '',
      }
    }
    this.productService.getProducts(this.selectedSortingOption.value, '', this.searchText, this.category.name, !this.showOutOfStock).subscribe(
      (products) => {
        this.products = products
        this.ngxService.stop()
        console.log(products)
        this.areProductsFound=true
      },(error)=>{
        console.log(error)
      }
    )
    this.getCategories()
  }
  getCategories(){
    if(this.category.name===''){
      this.categoriesToDisplay=this.categories.map(catergory=>catergory.name)
    }
    else{
      this.categoriesToDisplay=this.subCategories[this.category.name].map(subCategory=>subCategory.name)
    }
  }

  onShowOutOfStockChange(event: MatCheckboxChange) {
    this.showOutOfStock = event.checked;
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

  selectCategoryOption(category: string) {
    if(this.category.name===''){
      this.category=this.categories.find(item=>item.name===category)
    }
    if(this.category.name!==''){
      this.subCategory=this.subCategories[this.category.name].find(item=>item.name===category)
    }
    this.toggleFilterVisibility()
    this.router.navigate([`/${this.category.link}/${this.subCategory.link}`]);
  }

  ngOnInit() {
    this.ngxService.start()
    this.handleRouting()
  }

  handleRouting(){
    let categoryReceived=''
    let subCategoryReceived=''
    this.activatedRoute.params.subscribe(
      (params) => {
        categoryReceived= params['category'];
        subCategoryReceived=params['subCategory']
        if(categoryReceived) {
          this.category = this.categories.find(category => category.id === categoryReceived)
          this.handleTitle(this.category.name)
          if(subCategoryReceived){
            this.subCategory=this.subCategories[this.category.name].find(subCategory => subCategory.id === subCategoryReceived)
            this.handleTitle(this.category.name, this.subCategory.name)
          }
        }
        this.getProducts()
      })
  }

  handleTitle(title?: string, subTitle?: string){
    this.title=title || 'Shop'
    this.subTitle=subTitle || ''
  }
}
