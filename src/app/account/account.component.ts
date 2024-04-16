import {Component} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent{
  isMenuHidden=false
  constructor(private router: Router) {
  }
  navHeaders: any[]=[
    {
      id: 'your-account',
      name:'Personal Information',
      link:'profile',
    },
    {
      id: 'address-book',
      name:'Address Book',
      link:'address-book',
    },
    {
      id: 'orders',
      name:'Your Orders',
      link:'orders',
    },
  ]

  logOut(){
    localStorage.removeItem('token')
    sessionStorage.removeItem('userDetails');
    this.router.navigateByUrl('/home').then(() => {
      window.location.reload()
    });
  }

  toggleMenuVisibility() {
    this.isMenuHidden=!this.isMenuHidden
  }
}
