import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import {AuthService} from "../api/auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: AuthService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = this.userService.getToken();
    if (token) {
      request = request.clone({
        setHeaders: {
          Authorization: token
        }
      });
    }

    return next.handle(request);
  }
}
