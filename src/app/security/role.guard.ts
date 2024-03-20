import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {AuthService} from "../api/auth.service";
import {map} from "rxjs";

export const roleGuard: CanActivateFn = (route, state) => {
  const userService=inject(AuthService)
  const router=inject(Router)
  return userService.isAdmin.pipe(
    map(res=>{
      if(res){
        return true
      }
      return router.createUrlTree(['/'])
    })
  )
};
