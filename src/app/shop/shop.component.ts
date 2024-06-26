import {
  Component, HostListener,
  Input, OnChanges,
  OnInit, SimpleChanges,
} from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {MatCheckboxChange} from "@angular/material/checkbox";
import {ProductService} from "../api/product.service";
import {categories, subCategories} from "../models/products-categories";
import {Product} from "../models/products.types";
import {WishlistService} from "../api/wishlist.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit, OnChanges{
  heading='Shop'
  subHeading=''
  @Input()
  searchText=''
  @Input()
  category:any
  subCategory:any

  showOutOfStock=false

  maxPrice=15999
  minPrice=0
  selectedMinPrice=this.minPrice;
  selectedMaxPrice=this.maxPrice;
  priceRange=''

  products: Product[]=[]
  categoriesToDisplay:string[]=[]
  categories=categories
  subCategories=subCategories
  areProductsFound=true
  isFilterHidden=true
  isToSortOpen=false
  isCategoriesOpen=true
  isPriceRangeOpen=true

  selectedSortingOption={
    name:'Sort',
    value:''
  }

  sortingOptions=[
    {
      name:'Price: Low to High',
      value:'price: 1',
    },
    {
      name:'Price: High to Low',
      value:'price: -1',
    },
    {
      name:'',
      value:'',
    },
  ]


  currentPage = 1;
  pageSize = 25;
  totalPages = 0;
  pageNumbers: number[] = [];
  visiblePageNumbers: number[] = [];
  totalProducts=0
  isMobileView=false

  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private router: Router,
              private productService:ProductService,
              private activatedRoute: ActivatedRoute,
              private wishlistService: WishlistService,
              private titleService: Title) {
  }

  ngOnInit() {
    this.handleRouting()
    this.checkMobileView()
    this.wishlistService.fetchWishlist()
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['searchText']) {
      this.getProducts()
    }
  }

  @HostListener('window:resize', ['$event'])
  onResize() {
    this.checkMobileView();
  }

  private checkMobileView() {
    this.isMobileView = window.innerWidth <= 768;
    if(this.isMobileView){
      this.pageSize=12
    }
    else{
      this.pageSize=25
    }
  }

  selectSortingOption(option: any){
    this.selectedSortingOption=option
    this.isToSortOpen=false
    this.currentPage=1
    this.getProducts()
  }

  getProducts(){
    this.ngxUiLoaderService.start()
    if(!this.category){
      this.category={
        id: '',
        name: '',
        link: '',
      }
    }
    if(!this.subCategory){
      this.subCategory={
        id: '',
        name: '',
        link: '',
      }
    }
    this.productService.getProductsByPagination(
      this.selectedSortingOption.value,
      this.priceRange,
      this.searchText,
      this.category.name,
      this.subCategory.name,
      !this.showOutOfStock,
      this.currentPage,
      this.pageSize).subscribe(
      (data) => {
        this.totalProducts=data.totalProducts
        this.products = data.products
        this.totalPages=data.totalPages
        this.areProductsFound=true
        this.generatePageNumbers()
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.error(error)
        this.ngxUiLoaderService.stop()
      }
    )
    this.getCategories()
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.getProducts();
    }
  }

  prevPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.getProducts();
    }
  }

  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.getProducts();
    }
  }

  generatePageNumbers() {
    this.pageNumbers = Array.from({ length: this.totalPages }, (_, i) => i + 1);
    this.calculateVisiblePageNumbers();
  }

  calculateVisiblePageNumbers() {
    const visiblePages: number[] = [];
    const totalVisiblePageNumbers = 4; // Number of visible page numbers
    const totalPages = this.totalPages;
    const currentPage = this.currentPage;

    if (totalPages <= totalVisiblePageNumbers) {
      visiblePages.push(...this.pageNumbers);
    } else {
      const halfVisiblePageNumbers = Math.floor(totalVisiblePageNumbers / 2);
      let startPage = currentPage - halfVisiblePageNumbers;
      let endPage = currentPage + halfVisiblePageNumbers;

      if (startPage <= 1) {
        startPage = 1;
        endPage = totalVisiblePageNumbers;
        for (let i = startPage; i <= endPage; i++) {
          visiblePages.push(i);
        }
        visiblePages.push(-1, totalPages);
      } else if (endPage >= totalPages) {
        startPage = totalPages - totalVisiblePageNumbers + 1;
        endPage = totalPages;
        if (startPage > 2) {
          visiblePages.push(1, -1);
        }
        for (let i = startPage; i <= endPage; i++) {
          visiblePages.push(i);
        }
      } else {
        if (startPage > 2) {
          visiblePages.push(1, -1);
        }
        if (endPage < totalPages - 1) {
          visiblePages.push(...Array.from({ length: totalVisiblePageNumbers - 2 }, (_, i) => startPage + i));
          visiblePages.push(-1, totalPages);
        } else {
          visiblePages.push(...Array.from({ length: totalPages - startPage + 1 }, (_, i) => startPage + i));
        }
      }
    }
    this.visiblePageNumbers = visiblePages;
  }

  getCategories(){
    if(this.category.name===''){
      this.categoriesToDisplay=this.categories.map(category=>category.name)
    }
    else{
      this.categoriesToDisplay=this.subCategories[this.category.name].map(subCategory=>subCategory.name)
    }
  }

  containerStyles: any = {
    'overflow-y': 'hidden',
    'height': 'auto'
  };

  stylesApplied: boolean = false;

  toggleStyles() {
    if(!this.isMobileView){
      if (this.stylesApplied) {
        this.containerStyles['overflow-y'] = 'hidden';
        this.containerStyles['height'] = 'auto';
      } else {
        this.containerStyles['overflow-y'] = 'auto';
        this.containerStyles['height'] = '75vh';
      }
      this.stylesApplied = !this.stylesApplied;
    }
  }

  onShowOutOfStockChange(event: MatCheckboxChange) {
    this.showOutOfStock = event.checked;
    this.currentPage=1
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

  togglePriceRangeDropdown() {
    this.isPriceRangeOpen = !this.isPriceRangeOpen;
  }

  selectCategoryOption(category: string) {
    if(this.category.name===''){
      this.category=this.categories.find(item=>item.name===category)
    }
    if(this.category.name!==''){
      this.subCategory=this.subCategories[this.category.name].find(item=>item.name===category)
    }
    this.toggleFilterVisibility()
    if(this.subCategory){
      this.router.navigate([`/${this.category.link}/${this.subCategory.link}`]);
    }
    else{
      this.router.navigate([`/${this.category.link}`]);
    }
  }

  selectPriceRange(){
    this.priceRange=this.selectedMinPrice+'-'+this.selectedMaxPrice;
    this.getProducts()
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
          this.handleHeading(this.category.name)
          if(subCategoryReceived){
            this.subCategory=this.subCategories[this.category.name].find(subCategory => subCategory.id === subCategoryReceived)
            this.handleHeading(this.category.name, this.subCategory.name)
          }
        }
        this.setTitle()
        this.getProducts()
      })
  }

  handleHeading(title?: string, subTitle?: string){
    this.heading=title || 'Shop'
    this.subHeading=subTitle || ''
  }

  setTitle(){
    this.titleService.setTitle(this.heading+ ' | Navkar Artistry Hub')
  }
}
