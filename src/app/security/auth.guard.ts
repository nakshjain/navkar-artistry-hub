import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../api/auth.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const authService=inject(AuthService)
  const router=inject(Router)
  return authService.isAuthenticated().pipe(
    map(res=>{
      if(res){
        return true
      }
      else{
        return router.createUrlTree(['/home'])
      }
    })
  )
};
