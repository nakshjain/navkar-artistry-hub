import { Component } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {ProductService} from "../api/product.service";
import {UserService} from "../api/user.service";
import {User} from "../types/user.types";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  user: User={
    name:'',
    email:'',
    password:''
  };

  signUpFormData = {
    name: '',
    email:'',
    password:'',
  };

  loginFormData = {
    email:'',
    password:'',
  };

  clearSignUpFormData(){
    this.signUpFormData = {
      name: '',
      email:'',
      password:'',
    };
  }

  isSignDivVisiable: boolean  = true;

  responseText=''
  responseTextHidden: boolean=true;

  constructor(private userService: UserService){}

  onRegister() {
    console.log(this.signUpFormData)
    this.userService.signUpUser(this.signUpFormData).subscribe(
      (response)=>{
        this.responseText=response.message
        this.responseTextHidden=false
        this.clearSignUpFormData()
      },error => {
        this.responseText=error.error.error
        this.responseTextHidden=false
      }
    )
  }

  onLogin() {
    console.log(this.loginFormData)
    this.userService.loginUser(this.loginFormData).subscribe(
      (response)=>{
        console.log(response)
        this.user=response.user
        this.userService.setLoggedIn(true)
        this.userService.setUser(this.user)
      },error => {
        this.responseText=error.error.error
        this.responseTextHidden=false
        console.log(error)
      }
    )
  }
}

