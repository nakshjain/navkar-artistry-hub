import { Component } from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {LoginComponent} from "./login/login.component";
import {UserService} from "./api/user.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  isSearchBarOpen = false;
  searchQuery= '';
  isUserLoggedIn=false;
  user:any;

  toggleSearchBar() {
    this.isSearchBarOpen = !this.isSearchBarOpen;
  }
  title = 'NAH';
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

  search() {

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

  constructor(private matDialog: MatDialog,private userService: UserService) {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
      this.openLoginDialog()
    });
    const token = localStorage.getItem('token')??'';
    if(token){
      this.userService.isAuthenticated().subscribe(
        (res)=>{
          this.isUserLoggedIn=true;
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
}
