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
    console.log(this.signUpFormData)
    this.userService.signUpUser(this.signUpFormData).subscribe(
      (response)=>{
        this.responseText=response.message
        this.responseTextHidden=false
        this.clearSignUpFormData()
      },error => {
        console.log(error)
        this.responseText=error.error.message
        this.responseTextHidden=false
      }
    )
  }

  onLogin() {
    console.log(this.loginFormData)
    this.userService.loginUser(this.loginFormData).subscribe(
      (response)=>{
        this.userService.setToken()
        this.userService.setUserLoggedIn(response.user)
        this.userService.setLoggedIn(true)
      },error => {
        this.responseText=error.error.error
        this.responseTextHidden=false
        console.log(error)
      }
    )
  }
}

