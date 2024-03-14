import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../api/user.service";
import {auto} from "@popperjs/core";
import {Product} from "../types/products.types";
import {Router} from "@angular/router";

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

  navbarHeader: any[] = [
    {
      id: 'home',
      name: 'Home',
      link: 'home',
    },
    {
      id: 'artists',
      name: 'Artists',
      link: 'artists',
    },
    {
      id: 'products',
      name: 'Products',
      link: 'products',
    },
    {
      id: 'archived-products',
      name: 'Archived',
      link: 'archived-products',
    },
  ];

  showOptions: boolean = false;

  onInputChange(): void {
    this.showOptions = this.searchQuery.trim().length > 0;
  }

  openLoginDialog() {
    if(!this.isUserLoggedIn){
      this.matDialog.open(LoginComponent,{
        // width:'350px',
      })
    }
    else{
      this.matDialog.closeAll()
    }
  }

  constructor(private matDialog: MatDialog,private userService: UserService,private router: Router) {
  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
      this.openLoginDialog()
    });
    this.userService.userLoggedIn.subscribe(
      (user)=>{
        this.user=user
      }
    )
    const token = localStorage.getItem('token')??'';
    if(token && Object.keys(this.user).length === 0){
      this.userService.getUserDetails().subscribe(
        (user)=>{
          this.user=user
          this.isUserLoggedIn=true;
          this.userService.setUserLoggedIn(user)
          this.userInitial=user.name[0]
          console.log(user)
          this.openLoginDialog()
        },(err)=>{
          this.isUserLoggedIn=false;
        }
      )
    }
  }

  logOut() {
    this.isUserLoggedIn=false
    this.openLoginDialog()
    localStorage.removeItem('token')
  }

  doSomethingElse() {
  }

  protected readonly auto = auto;

  onEnterSearchPressed() {
    const searchQuery=this.searchQuery
    this.searchQuery=''
    this.router.navigate(['/search-results'], { queryParams: { query: searchQuery } });
  }
}
