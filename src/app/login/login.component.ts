import { Component } from '@angular/core';
import {UserService} from "../api/user.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
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

  isSignInVisible: boolean  = true;

  responseText=''
  responseTextHidden: boolean=true;

  constructor(private userService: UserService){}

  onRegister() {
    this.userService.signUpUser(this.signUpFormData).subscribe(
      (response)=>{
        this.responseText=response.message
        this.responseTextHidden=false
        this.clearSignUpFormData()
      },error => {
        this.responseText=error.error.message
        this.responseTextHidden=false
      }
    )
  }

  onLogin() {
    this.userService.loginUser(this.loginFormData).subscribe(
      (response)=>{
        this.userService.setToken()
        this.userService.setUserLoggedIn(response.user)
        this.userService.setLoggedIn(true)
        this.userService.setAdmin(response.user.role.includes('admin'))
      },error => {
        this.responseText=error.error.message
        this.responseTextHidden=false
      }
    )
  }
}

