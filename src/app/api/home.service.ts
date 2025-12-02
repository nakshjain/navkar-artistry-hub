import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {environment} from "src/environments/environment";
import {HomePageConfig} from "../models/home.model";

@Injectable({
  providedIn: 'root',
})
export class HomeService {
  private readonly baseUrl = environment.BASE_URL+'/home'

  constructor(private readonly http: HttpClient) {
  }

  getHomePageDetails(): Observable<HomePageConfig> {
    return this.http.get<HomePageConfig>(`${this.baseUrl}/getHomePageDetails`);
  }
}
