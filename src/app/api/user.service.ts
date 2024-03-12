import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'
  private isLoggedInSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private userSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(private http: HttpClient) {
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
    return this.http.post<any>(`${this.baseUrl}/login`,user)
  }
}
