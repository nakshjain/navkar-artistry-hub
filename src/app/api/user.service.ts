import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, tap} from "rxjs";
import {BASE_URL} from "./config";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl =BASE_URL
  private userDetails: BehaviorSubject<any> = new BehaviorSubject<any>({});
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private isAdminSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenKey = '';

  constructor(private http: HttpClient) {
  }

  setToken() {
    localStorage.setItem("token", this.tokenKey);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUserLoggedIn(userDetails: any){
    this.userDetails.next(userDetails)
  }

  get userLoggedIn(){
    return this.userDetails.asObservable()
  }

  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }
  get isAdmin() {
    return this.isAdminSubject.asObservable();
  }
  setAdmin(value: boolean) {
    this.isAdminSubject.next(value);
  }

  signUpUser(user: any){
    console.log(user)
    return this.http.post<any>(`${this.baseUrl}/signUp`,user)
  }
  sendOTP(user: any){
    return this.http.post<any>(`${this.baseUrl}/sendOTP`,user)
  }

  loginUser(user: any, rememberMe: boolean){
    return this.http.post<any>(`${this.baseUrl}/login?rememberMe=${rememberMe}`,user,{withCredentials:true}).pipe(
      tap((res)=>{
        this.tokenKey=res.token;
        this.setToken()
      })
    )
  }
  getUserDetails(){
    return this.http.get<any>(`${this.baseUrl}/getUserDetails`)
  }
}
