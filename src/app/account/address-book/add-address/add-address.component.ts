import {Component, Inject} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {UserService} from "../../../api/user.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";

@Component({
  selector: 'app-add-address',
  templateUrl: './add-address.component.html',
  styleUrls: ['./add-address.component.css']
})
export class AddAddressComponent {
  isSpinner=false
  isEditForm=false
  updateAddressId=''

  addressForm =this.fb.group({
    name: ['', Validators.required],
    contactNumber: ['', Validators.required],
    streetAddress: ['', Validators.required],
    locality: ['', Validators.required],
    region: ['', Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    pinCode: ['', Validators.required],
  });

  constructor(private fb: FormBuilder,
              private userService:UserService,
              public dialogRef: MatDialogRef<AddAddressComponent>,
              private snackBar: MatSnackBar,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    if(data){
      this.initForm(data)
      this.isEditForm=true
      this.updateAddressId=data._id
    }
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';

    this.snackBar.open(message, action, config)
  }
  private initForm(address: any){
    this.addressForm =this.fb.group({
      name: [address.name, Validators.required],
      contactNumber: [address.contactNumber, Validators.required],
      streetAddress: [address.streetAddress, Validators.required],
      locality: [address.locality, Validators.required],
      region: [address.region, Validators.required],
      state: [address.state, Validators.required],
      country: [address.country, Validators.required],
      pinCode: [address.pinCode, Validators.required],
    });
  }
  isInvalidAddress(controlName: string) {
    const control = this.addressForm.get(controlName);
    return control?.invalid && (control?.touched || control?.dirty);
  }

  onAddAddress() {
    this.isSpinner=true
    this.userService.addAddress(this.addressForm.value).subscribe(
      (response)=>{
        this.openSnackBar('Address added successfully', 'Success')
        this.addressForm.reset()
        this.dialogRef.close()
        this.getUserDetails()
        this.isSpinner=false
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
        this.isSpinner=false
      }
    )
  }

  onUpdateAddress() {
    this.isSpinner=true
    this.userService.updateAddress(this.addressForm.value, this.updateAddressId).subscribe(
      (response)=>{
        this.openSnackBar('Address updated successfully', 'Success')
        this.addressForm.reset()
        this.dialogRef.close()
        this.getUserDetails()
        this.isSpinner=false
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
        this.isSpinner=false
      }
    )
  }

  getUserDetails(){
    this.userService.getUserDetails().subscribe(
      (user)=>{
        sessionStorage.clear()
        sessionStorage.setItem('userDetails', JSON.stringify(user));
        window.location.reload()
      },(error)=>{
      }
    )
  }

}
