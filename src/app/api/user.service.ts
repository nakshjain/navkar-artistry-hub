import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private tokenKey = '';
  private userDetails: any;

  constructor(private http: HttpClient) {
  }

  setToken() {
    localStorage.setItem("token", this.tokenKey);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  setUser(userDetails: any){
    this.userDetails=userDetails
  }

  getUser(){
    return this.userDetails
  }

  get isLoggedIn() {
    return this.isLoggedInSubject.asObservable();
  }
  setLoggedIn(value: boolean) {
    this.isLoggedInSubject.next(value);
  }

  signUpUser(user: any){
    return this.http.post<any>(`${this.baseUrl}/signUp`,user)
  }
  loginUser(user: any){
    return this.http.post<any>(`${this.baseUrl}/login`,user,{withCredentials:true}).pipe(
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
