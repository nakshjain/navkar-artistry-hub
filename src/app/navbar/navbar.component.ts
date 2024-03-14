import {Component, OnInit} from '@angular/core';
import {LoginComponent} from "../login/login.component";
import {MatDialog} from "@angular/material/dialog";
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  searchQuery= '';
  isUserLoggedIn=false;
  user:any;
  userInitial=''

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
  }

  ngOnInit(): void {
    this.userService.isLoggedIn.subscribe((loggedIn: boolean) => {
      this.isUserLoggedIn = loggedIn;
      this.openLoginDialog()
    });

    this.user=this.userService.getUser()
    const token = localStorage.getItem('token')??'';
    if(token && !this.user){
      this.userService.getUserDetails().subscribe(
        (user)=>{
          this.user=user
          this.isUserLoggedIn=true;
          this.userService.setUser(user)
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

  openShoppingCart() {

  }

}
