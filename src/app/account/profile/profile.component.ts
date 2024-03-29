import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

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
    'Email': ['', Validators.required],
    'Phone Number': ['', Validators.required],
    'Date of Birth': ['', Validators.required],
  });
  constructor(private fb: FormBuilder) {
  }

  ngOnInit() {
    this.getUserDetails()
  }

  private initForm(userDetails: any){
    this.userDetailForm =this.fb.group({
      'Name': [userDetails.name || '', Validators.required],
      'Email': [userDetails.email || '', Validators.required],
      'Phone Number': [userDetails.phone || ''],
      'Date of Birth': [userDetails.dob || '']
    });
  }
  getUserDetails(){
    const storedUserDetails = sessionStorage.getItem('userDetails');
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    this.setUserDetails(userDetails)
    this.initForm(userDetails)
  }

  setUserDetails(userDetails: any){
    this.userDetailsArray = [
      { key: 'Name', value: userDetails.name },
      { key: 'Email', value: userDetails.email },
      { key: 'Phone Number', value: userDetails.contactNumber },
      { key: 'Date of Birth', value: userDetails.dob }
    ];
  }

  isInvalidUserDetail(controlName: any) {
    const control = this.userDetailForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onUpdateDetails() {
  }

  toggleEdit(detailDiv: HTMLElement, inputDiv: HTMLElement): void {
    detailDiv.style.display = detailDiv.style.display === 'none' ? 'block' : 'none';
    inputDiv.style.display = inputDiv.style.display === 'none' ? 'block' : 'none';
  }
}
