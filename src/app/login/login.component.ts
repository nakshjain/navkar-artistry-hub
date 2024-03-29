import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../api/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CartService} from "../api/cart.service";
import {NgxUiLoaderService} from "ngx-ui-loader";

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
  isRememberMeChecked=false
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

  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private authService: AuthService,
              private cartService: CartService,
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
    this.ngxUiLoaderService.start()
    this.authService.sendOTP(this.signUpForm.value).subscribe(
      (response)=>{
        this.responseText=response.message
        this.isSignUpFieldsLock=true
        this.isSignUpLock=false
        this.ngxUiLoaderService.stop()
      },(error)=>{
        console.log(error)
        this.responseText=error.error.message
        this.ngxUiLoaderService.stop()
      }
    )
  }
  editDetails(){
    this.isSignUpFieldsLock=false
    this.isSignUpLock=true
    this.responseText=''
  }

  onRegister() {
    this.ngxUiLoaderService.start(
    )
    this.authService.signUpUser(this.signUpForm.value).subscribe(
      (response)=>{
        this.responseText=response.message
        this.clearSignUpFormData()
        this.ngxUiLoaderService.stop()
      },error => {
        console.log(error)
        this.responseText=error.error.message
        this.ngxUiLoaderService.stop()
      }
    )
  }

  onLogin() {
    this.ngxUiLoaderService.start()
    this.authService.loginUser(this.loginForm.value, this.isRememberMeChecked).subscribe(
      (response)=>{
        this.setLoginDetails(response)
        this.mergeCart(this.loginForm.value.email)
        this.ngxUiLoaderService.stop()
      },error => {
        this.responseText=error.error.message
        this.ngxUiLoaderService.stop()
      }
    )
  }

  mergeCart(email: any){
    const cart=this.cartService.getCartProductsUserNotLogged()
    this.cartService.mergeCart(cart, email).subscribe(
      (response)=>{
      },(err)=>{
        console.log(err)
      }
    )
    localStorage.removeItem('cart')
  }
  updateRememberMe(){
    this.isRememberMeChecked=!this.isRememberMeChecked
  }

  toggleMobileView() {
    this.isMobileViewLogin=!this.isMobileViewLogin
  }

  toggleSignIn(){
    this.isSignInVisible = !this.isSignInVisible;
    this.responseText=''
  }

  setLoginDetails(response: any){
    sessionStorage.setItem('userDetails', JSON.stringify(response.user));
    this.authService.setToken()
    window.location.reload()
  }
}

