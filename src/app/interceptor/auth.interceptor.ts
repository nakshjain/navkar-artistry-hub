import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, switchMap } from 'rxjs/operators';
import {UserService} from "../api/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private userService: UserService) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const accessToken = this.userService.getAccessToken();
    if (accessToken) {
      request = request.clone({
        setHeaders: {
          'x-access-token': accessToken
          // Authorization: `Bearer ${accessToken}`
        }
      });
    }

    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        if (error.status === 401) {
          // Token expired, try refreshing the token
          const refreshToken=localStorage.getItem('refreshToken') ?? '';
          return this.userService.refreshAccessToken(refreshToken).pipe(
            switchMap(() => {
              // Retry the original request with the new access token
              request = request.clone({
                setHeaders: {
                  Authorization: `Bearer ${this.userService.getAccessToken()}`
                }
              });
              return next.handle(request);
            }),
            catchError(() => {
              // Refresh token failed, logout user or redirect to login page
              // For simplicity, we'll just log the user out
              console.log('Token refresh failed');
              return throwError(error);
            })
          );
        }
        return throwError(error);
      })
    );
  }
}
