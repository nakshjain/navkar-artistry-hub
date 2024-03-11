import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:3000'

  constructor(private http: HttpClient) {

  }
  signUpUser(user: any){
    return this.http.post<any>(`${this.baseUrl}/signUp`,user)
  }
  loginUser(user: any){
    return this.http.post<any>(`${this.baseUrl}/login`,user)
  }
}
