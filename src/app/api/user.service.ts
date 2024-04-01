import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl =BASE_URL+'/user'

  constructor(private http: HttpClient) {
  }

  getUserDetails(){
    return this.http.get<any>(`${this.baseUrl}/getUserDetails`)
  }

  updateUserDetails(userDetails: any){
    return this.http.put<any>(`${this.baseUrl}/updateUserDetails`, {userDetails: userDetails})
  }

  addAddress(address: any){
    return this.http.post<any>(`${this.baseUrl}/addAddress`, {address: address})
  }

  updateAddress(address: any, updateAddressId:string){
    return this.http.put<any>(`${this.baseUrl}/updateAddress`, {address: address, updateAddressId: updateAddressId})
  }

  removeAddress(address: any){
    const toRemove=address._id
    return this.http.delete<any>(`${this.baseUrl}/removeAddress?addressId=${toRemove}`)
  }

  setDefaultAddress(addressId: string){
    return this.http.post<any>(`${this.baseUrl}/setDefaultAddress`, {addressId: addressId})
  }
}
