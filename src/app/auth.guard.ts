import { Injectable } from '@angular/core';
import { CanActivate, CanActivateChild, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthService } from './service/auth.service';

@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(public auth: AuthService, public router: Router) {
    //alert();
   }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    const url: string = state.url;
    return this.checkLogin(url);
  }

  canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
    return this.canActivate(route, state);
  }

  checkLogin(url: string): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['/user/login']);
      return false;
    }
      return true;
    
}
}
