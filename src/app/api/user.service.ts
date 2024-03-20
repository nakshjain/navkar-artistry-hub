import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {BASE_URL} from "./config";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private baseUrl =BASE_URL+'/user'
  private userDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpClient) {
  }

  setUserLoggedIn(userDetails: any){
    this.userDetails.next(userDetails)
  }

  get userLoggedIn(){
    return this.userDetails.asObservable()
  }

  getUserDetails(){
    return this.http.get<any>(`${this.baseUrl}/getUserDetails`)
  }
}
