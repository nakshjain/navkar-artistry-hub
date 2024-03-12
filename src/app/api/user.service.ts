import {Injectable} from "@angular/core";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {BehaviorSubject, Observable, tap} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  private accessTokenKey = 'accessToken';
  private refreshTokenKey = 'refreshToken';

  constructor(private http: HttpClient) {
  }

  setTokens(): void {
    localStorage.setItem("accessToken", this.accessTokenKey);
    localStorage.setItem("refreshToken", this.refreshTokenKey);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.accessTokenKey);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  logOutUser(refreshToken: String){
    return this.http.delete<any>(`${this.baseUrl}/logout`,{ body: { refreshToken } })
  }

  setUser(user: any) {
    this.userSubject.next(user);
  }

  getUser() {
    return this.userSubject.asObservable();
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
        this.accessTokenKey=res.accessToken;
        this.refreshTokenKey=res.refreshToken;
        this.setTokens()
      })
    )
  }

  refreshAccessToken(refreshToken: String) {
    return this.http.post<any>(`${this.baseUrl}/refreshToken`,refreshToken)
  }

  isAuthenticated(){
    return this.http.get<any>(`${this.baseUrl}/isAuthenticated`)
  }
}
