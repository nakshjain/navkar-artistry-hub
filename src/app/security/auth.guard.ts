import {CanActivateFn, Router} from '@angular/router';
import {inject} from "@angular/core";
import {UserService} from "../api/user.service";
import {map} from "rxjs";

export const authGuard: CanActivateFn = (route, state) => {
  const userService=inject(UserService)
  const router=inject(Router)
  return userService.isLoggedIn.pipe(
    map(res=>{
      if(res){
        return true
      }
      return router.createUrlTree(['/'])
    })
  )
};
