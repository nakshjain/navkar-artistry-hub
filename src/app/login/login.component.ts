import { Component } from '@angular/core';
import {UserService} from "../api/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  isMobileViewLogin=true
  isMobileView=false
  signUpFormData = {
    name: '',
    email:'',
    password:'',
    otp:''
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
      otp:'',
    };
  }

  isSignInVisible: boolean  = true;

  responseText=''
  responseTextHidden: boolean=true;

  constructor(private ngxService:NgxUiLoaderService, private userService: UserService){
    this.checkViewPort()
  }

  checkViewPort(){
    this.isMobileView=window.innerWidth<768
    console.log(this.isMobileView)
  }
  onRegister() {
    this.ngxService.start()
    this.userService.signUpUser(this.signUpFormData).subscribe(
      (response)=>{
        this.ngxService.stop()
        this.responseText=response.message
        this.responseTextHidden=false
        this.clearSignUpFormData()
      },error => {
        this.ngxService.stop()
        this.responseText=error.error.message
        this.responseTextHidden=false
      }
    )
  }

  onLogin() {
    this.ngxService.start()
    this.userService.loginUser(this.loginFormData).subscribe(
      (response)=>{
        this.ngxService.stop()
        this.userService.setToken()
        this.userService.setUserLoggedIn(response.user)
        this.userService.setLoggedIn(true)
        this.userService.setAdmin(response.user.role.includes('admin'))
      },error => {
        this.ngxService.stop()
        this.responseText=error.error.message
        this.responseTextHidden=false
      }
    )
  }

  toggleMobileView() {
    this.isMobileViewLogin=!this.isMobileViewLogin
  }
}

