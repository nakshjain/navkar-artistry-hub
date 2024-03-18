import {Component, HostListener, OnInit} from '@angular/core';
import {UserService} from "../api/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface LoginFormData {
  email: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  isMobileViewLogin=true
  isMobileView=false
  isSignUpFieldsLock=false
  isSignUpLock=true
  isSignInVisible: boolean  = true;
  responseText=''
  signUpForm =this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    otp: ['']
  });
  loginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  constructor(private ngxService:NgxUiLoaderService,
              private userService: UserService,
              private fb:FormBuilder) {
    this.checkViewPort()
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewPort();
  }
  ngOnInit() {
    this.checkViewPort()
    this.initForms()
  }
  private initForms(): void {
    this.signUpForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      otp: ['']
    });

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  private checkViewPort(){
    this.isMobileView=window.innerWidth<768
  }

  isInvalidLogin(controlName: string) {
    const control = this.loginForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  isInvalidSignUp(controlName: string) {
    const control = this.signUpForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }
  clearSignUpFormData(){
    this.signUpForm.reset()
    this.isSignUpFieldsLock=false
    this.isSignUpLock=true
  }


  onGenerateOTP(){
    this.ngxService.start()
    console.log(this.signUpForm.value)
    console.log(this.signUpForm.valid)
    this.userService.sendOTP(this.signUpForm.value).subscribe(
      (response)=>{
        console.log(response)
        this.responseText=response.message
        this.isSignUpFieldsLock=true
        this.ngxService.stop()
        this.isSignUpLock=false
      },(error)=>{
        console.log(error)
        this.responseText=error.error.message
        this.ngxService.stop()
      }
    )
  }
  editDetails(){
    this.isSignUpFieldsLock=false
    this.isSignUpLock=true
    this.responseText=''
  }

  onRegister() {
    this.ngxService.start()
    this.userService.signUpUser(this.signUpForm.value).subscribe(
      (response)=>{
        this.ngxService.stop()
        console.log(response)
        this.responseText=response.message
        this.clearSignUpFormData()
      },error => {
        this.ngxService.stop()

        console.log(error)
        this.responseText=error.error.message
      }
    )
  }

  onLogin() {
    this.ngxService.start()
    this.userService.loginUser(this.loginForm.value).subscribe(
      (response)=>{
        this.ngxService.stop()
        this.userService.setToken()
        this.userService.setUserLoggedIn(response.user)
        this.userService.setLoggedIn(true)
        this.userService.setAdmin(response.user.role.includes('admin'))
      },error => {
        this.ngxService.stop()
        this.responseText=error.error.message
      }
    )
  }

  toggleMobileView() {
    this.isMobileViewLogin=!this.isMobileViewLogin
    console.log(this.isMobileViewLogin)
  }

  toggleSignIn(){
    this.isSignInVisible = !this.isSignInVisible;
    this.responseText=''
  }
}

