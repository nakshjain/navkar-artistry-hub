import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {AuthService} from "../api/auth.service";
import {auto} from "@popperjs/core";
import {Product} from "../types/products.types";
import {Router} from "@angular/router";
import {categories, subCategories} from "../types/products-categories";
import {UserService} from "../api/user.service";

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
  isUserAdmin=false

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
      id: 'my-profile',
      name:'My Profile',
      link:'my-profile',
    },
    {
      id: 'add-product',
      name:'Add Product',
      link:'add-product'
    }
  ]

  showOptions: boolean = false;

  onInputChange(): void {
    this.showOptions = this.searchQuery.trim().length > 0;
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

  constructor(private matDialog: MatDialog,
              private authService: AuthService,
              private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {
    this.authService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
      this.openLoginDialog()
    });
    this.userService.userLoggedIn.subscribe(
      (user)=>{
        this.user=user
        if(user.name){
          this.userInitial=user.name[0]
        }
      }
    )
    const token = localStorage.getItem('token')??'';
    if(token && Object.keys(this.user).length === 0){
      this.userService.getUserDetails().subscribe(
        (user)=>{
          this.user=user
          this.isUserLoggedIn=true;
          this.userService.setUserLoggedIn(user)
          this.authService.setLoggedIn(true)
          this.isUserAdmin=this.user.role.includes('admin')
          this.authService.setAdmin(this.user.role.includes('admin'))
          this.userInitial=this.user.name[0]
          this.openLoginDialog()
        },(err)=>{
          this.isUserLoggedIn=false;
        }
      )
    }
  }

  logOut() {
    this.isUserLoggedIn=false
    this.authService.setLoggedIn(false)
    const currentUrl=this.router.url
    this.matDialog.closeAll()
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
      this.router.navigate([currentUrl]);
    });
    this.openLoginDialog()
    localStorage.removeItem('token')
  }

  protected readonly auto = auto;

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

  setAdmin(){

  }

  goToCart() {
    this.router.navigate(['/cart'])
  }
}
