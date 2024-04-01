import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../api/user.service";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-my-account',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{
  userDetails: any;
  userDetailsArray: any

  userDetailForm =this.fb.group({
    'Name': ['', Validators.required],
    'Email': ['', [Validators.required, Validators.email]],
    'Phone Number': ['', [Validators.required, Validators.pattern(/^\d{10}$/)]],
    'Date of Birth': [null, Validators.required],
  });
  constructor(private fb: FormBuilder,
              private userService:UserService,
              private ngxUiLoaderService: NgxUiLoaderService,
              private snackBar: MatSnackBar) {
  }

  ngOnInit() {
    this.getUserDetails()
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';

    this.snackBar.open(message, action, config)
  }

  private initForm(userDetails: any){
    this.userDetailForm =this.fb.group({
      'Name': [userDetails.name || '', Validators.required],
      'Email': [userDetails.email || '', [Validators.required, Validators.email]],
      'Phone Number': [userDetails.contactNumber || '', [Validators.required, Validators.pattern(/^\d{10}$/)]],
      'Date of Birth': [userDetails.dob || null, Validators.required]
    });
  }

  getUserDetails(){
    const storedUserDetails = sessionStorage.getItem('userDetails');
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    this.setUserDetails(userDetails)
    this.initForm(userDetails)
  }

  getUserDetailsFromService(){
    this.ngxUiLoaderService.start()
    this.userService.getUserDetails().subscribe(
      (user)=>{
        sessionStorage.clear()
        sessionStorage.setItem('userDetails', JSON.stringify(user));
        this.getUserDetails()
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
        this.ngxUiLoaderService.stop()
      }
    )
  }

  setUserDetails(userDetails: any){
    this.userDetailsArray = [
      { key: 'Name', value: userDetails.name },
      { key: 'Email', value: userDetails.email },
      { key: 'Phone Number', value: userDetails.contactNumber },
      { key: 'Date of Birth', value: userDetails.dob.split('T')[0] }
    ];
  }

  isInvalidUserDetail(controlName: any) {
    const control = this.userDetailForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onUpdateDetails() {
    this.ngxUiLoaderService.start()
    this.userService.updateUserDetails(this.userDetailForm.value).subscribe(
      (response)=>{
        this.getUserDetailsFromService()
        this.ngxUiLoaderService.stop()
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
        this.ngxUiLoaderService.stop()
      }
    )
  }

  toggleEdit(detailDiv: HTMLElement, inputDiv: HTMLElement): void {
    detailDiv.style.display = detailDiv.style.display === 'none' ? 'block' : 'none';
    inputDiv.style.display = inputDiv.style.display === 'none' ? 'block' : 'none';
  }


}
