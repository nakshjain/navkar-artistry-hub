import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {Product} from "../models/products.types";
import {Router} from "@angular/router";
import {categories, subCategories} from "../models/products-categories";
import {UserService} from "../api/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  title = 'NAH';
  searchQuery= '';
  isUserLoggedIn=false;
  user:any;
  userInitial=''
  products: Product[]=[]
  categorySelected:any
  isCategorySelected=false
  subCategories=subCategories
  subCategoryNavbarHeader:any

  shopHeader: any[] = [
    {
      id: 'shop',
      name: 'Shop',
      link: 'shop',
    },
  ];

  navbarHeader=this.shopHeader.concat(categories)

  userOptions: any[]=[
    {
      id: 'your-orders',
      name:'Your Orders',
      link:'your-account/orders',
    },
    {
      id: 'your-account',
      name:'Your Account',
      link:'your-account/profile',
    },
    {
      id: 'your-addresses',
      name:'Your Addresses',
      link:'your-account/address-book',
    },
  ]

  options: Product[] = [];
  filteredOptions: Product[] = [];

  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private matDialog: MatDialog,
              private userService: UserService,
              private productService:ProductService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.getProducts()
    const storedUserDetails = sessionStorage.getItem('userDetails');
    this.user = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    if(this.user){
      this.initializeNavbar(this.user)
    }
    else{
      this.isUserLoggedIn=false;
    }
    const token = localStorage.getItem('token')??'';
    if(token && !this.user){
      this.ngxUiLoaderService.start()
      this.userService.getUserDetails().subscribe(
        (user)=>{
          sessionStorage.setItem('userDetails', JSON.stringify(user));
          this.initializeNavbar(user)
          this.ngxUiLoaderService.stop()
        },(error)=>{
          this.isUserLoggedIn=false;
          sessionStorage.removeItem('userDetails');
          this.ngxUiLoaderService.stop()
        }
      )
    }
  }

  logOut() {
    this.isUserLoggedIn=false
    localStorage.removeItem('token')
    sessionStorage.removeItem('userDetails');
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload()
    });
  }

  initializeNavbar(user: any){
    this.user=user
    this.isUserLoggedIn=true;
    this.userInitial=this.user.name[0]
    const isUserAdmin=this.user.role.includes('admin')
    if(isUserAdmin){
      this.userOptions.push(
        {
          id: 'manage-products',
          name:'Manage Products',
          link:'manage-products'
        })
    }
    this.openLoginDialog()
  }

  openLoginDialog() {
    if(!this.isUserLoggedIn){
      this.matDialog.open(LoginComponent,{
      })
    }
    else{
      this.matDialog.closeAll()
    }
  }

  onEnterSearchPressed() {
    const searchQuery=this.searchQuery
    this.searchQuery=''
    this.router.navigate(['/search'], { queryParams: { query: searchQuery } });
  }

  setCategory(inputCategory: string){
    this.categorySelected=categories.find(category=>category.name===inputCategory)
    this.subCategoryNavbarHeader=this.subCategories[this.categorySelected.name]
    this.isCategorySelected=true
  }

  resetCategory(){
    this.categorySelected=undefined
    this.isCategorySelected=false
  }

  goToCart() {
    this.router.navigate(['/cart'])
  }

  goToWishlist() {
    this.router.navigate(['/wishlist'])
  }

  getProducts(){
    this.ngxUiLoaderService.start()
    this.productService.getAllProducts().subscribe(
      (response)=>{
        this.options = response
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.ngxUiLoaderService.stop()
      }
    )
  }

  onInputChange(): void {
    if (this.searchQuery.length >= 3) {
      this.filteredOptions = this.options.filter(option =>
        option.name.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        option.category.toLowerCase().includes(this.searchQuery.toLowerCase()) ||
        option.subCategory.toLowerCase().includes(this.searchQuery.toLowerCase())
      ).slice(0, 10)
    } else {
      this.filteredOptions = [];
    }
  }

  goToProduct(productId: any){
    this.searchQuery=''
    this.router.navigate(['/product',productId])
  }
}
