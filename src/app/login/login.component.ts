import {Component, HostListener, OnInit} from '@angular/core';
import {AuthService} from "../api/auth.service";
import {FormBuilder, Validators} from "@angular/forms";
import {CartService} from "../api/cart.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {WishlistService} from "../api/wishlist.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

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
  isForgotPassword=false
  resetPasswordOtpSent=false
  showPassword=false
  signUpForm =this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    otp: ['', Validators.required]
  });
  loginForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });
  forgotPasswordForm=this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required],
    otp: ['', Validators.required]
  })
  constructor(private ngxUiLoaderService:NgxUiLoaderService,
              private authService: AuthService,
              private cartService: CartService,
              private wishlistService: WishlistService,
              private fb:FormBuilder,
              private snackBar:MatSnackBar) {
    this.checkViewPort()
  }
  ngOnInit() {
    this.checkViewPort()
    this.initForms()
  }
  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkViewPort();
  }
  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'top';
    this.snackBar.open(message, action, config)
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
  togglePasswordVisibility(){
    this.showPassword=!this.showPassword
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
        this.openSnackBar(response.message,'Success!')
        this.isSignUpFieldsLock=true
        this.isSignUpLock=false
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.openSnackBar(error.error.message,'Failed!')
        this.ngxUiLoaderService.stop()
      }
    )
  }
  editDetails(){
    this.isSignUpFieldsLock=false
    this.isSignUpLock=true
  }

  onRegister() {
    this.ngxUiLoaderService.start(
    )
    this.authService.signUpUser(this.signUpForm.value).subscribe(
      (response)=>{
        this.openSnackBar(response.message,'Success!')
        this.clearSignUpFormData()
        this.ngxUiLoaderService.stop()
      },error => {
        this.openSnackBar(error.error.message,'Failed!')
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
        this.mergeWishlist(this.loginForm.value.email)
        this.ngxUiLoaderService.stop()
      },error => {
        this.openSnackBar(error.error.message,'Failed!')
        this.ngxUiLoaderService.stop()
      }
    )
  }

  setLoginDetails(response: any){
    sessionStorage.setItem('userDetails', JSON.stringify(response.user));
    this.authService.setToken()
    window.location.reload()
  }

  mergeCart(email: any){
    const cart=this.cartService.getCartProductsUserNotLogged()
    this.cartService.mergeCart(cart, email).subscribe(
      (response)=>{
      },(error)=>{
      }
    )
    localStorage.removeItem('cart')
  }

  mergeWishlist(email: any){
    const wishlist=this.wishlistService.getWishlistUserNotLogged()
    this.wishlistService.mergeWishlist(wishlist, email).subscribe(
      (response)=>{
      },(error)=>{
      }
    )
    localStorage.removeItem('wishlist')
  }

  updateRememberMe(){
    this.isRememberMeChecked=!this.isRememberMeChecked
  }

  toggleMobileView() {
    this.isMobileViewLogin=!this.isMobileViewLogin
  }

  toggleSignIn(){
    this.isSignInVisible = !this.isSignInVisible;
    this.showPassword = false
  }

  toggleForgotPassword() {
    this.isForgotPassword=!this.isForgotPassword
    this.showPassword = false
    this.resetPasswordOtpSent=false
  }

  resetPasswordSendOTP(){
    this.ngxUiLoaderService.start()
    const email= this.forgotPasswordForm.value.email
    if(email){
      this.authService.resetPasswordSendOTP(email).subscribe(
        (response)=>{
          this.ngxUiLoaderService.stop()
          this.openSnackBar(response.message,'Success!')
          this.resetPasswordOtpSent=true
        },(error)=>{
          this.openSnackBar(error.error.message,'Failed!')
          this.ngxUiLoaderService.stop()
        }
      )
    }
  }

  resetPassword() {
    this.ngxUiLoaderService.start()
    this.authService.resetPassword(this.forgotPasswordForm.value).subscribe(
      (response)=>{
        this.ngxUiLoaderService.stop()
        this.openSnackBar(response.message,'Success!')
        this.resetPasswordForm()
      },(error)=>{
        console.log(error)
        this.openSnackBar(error.error.message,'Failed!')
        this.ngxUiLoaderService.stop()
      }
    )
  }

  resetPasswordForm(){
    this.toggleForgotPassword()
    this.forgotPasswordForm=this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      otp: ['', Validators.required]
    })
  }
}

