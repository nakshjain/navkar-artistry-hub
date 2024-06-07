import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {tap} from "rxjs";
import {environment} from "src/environments/environment";


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl =environment.BASE_URL+'/auth'
  private tokenKey = '';

  constructor(private http: HttpClient) {
    console.log(this.baseUrl)
  }

  setToken() {
    localStorage.setItem("token", this.tokenKey);
  }

  getToken() {
    return localStorage.getItem("token");
  }

  signUpUser(user: any){
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

  isAuthenticated(){
    return this.http.get<any>(`${this.baseUrl}/isAuthenticated`)
  }

  isAdminBackend(){
    return this.http.get<any>(`${this.baseUrl}/isAdmin`)
  }

  resetPassword(user: any){
    return this.http.post<any>(`${this.baseUrl}/resetPassword`,user)
  }

  resetPasswordSendOTP(email: string){
    return this.http.post<any>(`${this.baseUrl}/resetPassword/sendOTP`, {email: email})
  }
}
