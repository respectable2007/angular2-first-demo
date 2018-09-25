import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(public router:Router,
  	          public local:LocalStorageService,
  	          public loginService:LoginService) { }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean {
  	if (!this.local.get('isLogin')) {
      this.router.navigate(['login'])
      return false;
  	}
  	this.loginService.menu()
        .subscribe(user => {
          if (user.code === 200) {
            this.local.set('menu', user.data);
            let path = 'layout' + user.data[0].menuUrl
            this.router.navigate([path]);
          } 
        })
  	return true;
  }
}
