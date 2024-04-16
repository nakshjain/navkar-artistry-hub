import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {MatDialog} from "@angular/material/dialog";
import {AddAddressComponent} from "./add-address/add-address.component";
import {UserService} from "../../api/user.service";
import {MatSnackBar, MatSnackBarConfig} from "@angular/material/snack-bar";
import {NgxUiLoaderService} from "ngx-ui-loader";
import {Title} from "@angular/platform-browser";

@Component({
  selector: 'app-my-addresses',
  templateUrl: './address-book.component.html',
  styleUrls: ['./address-book.component.css']
})
export class AddressBookComponent implements OnInit{
  @Input()
  isSelectAddress=false;
  @Input()
  title='Your Addresses';
  @Input()
  subTitle='Add or manage addresses that you often use'
  @Output() selectedAddressEvent: EventEmitter<any> = new EventEmitter<any>();

  userDetails: any;
  addresses:any;
  selectedAddressId:any

  constructor(private ngxUiLoaderService: NgxUiLoaderService,
              private matDialog: MatDialog,
              private userService: UserService,
              private snackBar: MatSnackBar,
              private titleService: Title) {
  }

  ngOnInit() {
    this.titleService.setTitle('Your Addresses')
    this.getUserDetails()
  }

  openSnackBar(message: string, action: string): void {
    const config = new MatSnackBarConfig();
    config.duration = 3000;
    config.horizontalPosition = 'center';
    config.verticalPosition = 'bottom';

    this.snackBar.open(message, action, config)
  }

  openDialog(address?: any){
    this.matDialog.open(AddAddressComponent,{
      data: address
    })
  }

  sendSelectedAddress(addressId: any) {
    this.selectedAddressId=addressId
    const selectedAddress=this.getAddress(addressId)
    this.selectedAddressEvent.emit(selectedAddress);
  }

  getAddress(addressId: string){
    return this.userDetails.addresses.find((address: any)=>address._id===addressId)
  }
  getUserDetails(){
    const storedUserDetails = sessionStorage.getItem('userDetails');
    const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
    this.addresses=userDetails.addresses
    this.userDetails=userDetails
    this.selectedAddressId=this.userDetails.defaultAddress
    if(this.isSelectAddress){
      this.sendSelectedAddress(this.selectedAddressId)
    }
    this.sortAddresses()
  }

  removeAddress(address: any){
    this.userService.removeAddress(address).subscribe(
      (response)=>{
        this.getUserDetailsFromService()
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
      }
    )
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

  editAddress(address: any) {
    this.openDialog(address)
  }

  setDefaultAddress(address: any){
    this.userService.setDefaultAddress(address._id).subscribe(
      (response)=>{
        this.getUserDetailsFromService()
      },(error)=>{
        this.openSnackBar(error.error.message, 'Failed')
      }
    )
  }

  sortAddresses(): void {
    if (this.userDetails.defaultAddress) {
      this.addresses.sort((a: any, b:any) => {
        if (a._id === this.userDetails.defaultAddress) {
          return -1;
        } else if (b._id === this.userDetails.defaultAddress) {
          return 1;
        } else {
          return 0;
        }
      });
    }
  }
}
