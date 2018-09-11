import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { LoginService } from '../service/login.service';

@Injectable()
export class AuthService implements CanActivate {

  constructor(public router:Router,
  	          public local:LocalStorageService,
  	          public http:HttpClient,
  	          public loginService:LoginService) { }
  canActivate(): boolean {
  	if (!this.local.get('isLogin')) {
      this.router.navigate(['login'])
      return false;
  	}
  	this.loginService.menu()
        .subscribe(user => {
          if (user.code === 200) {
          	console.log(user)
            this.router.navigate(['/layout/password']);
          } 
        })
  	return true;
  }
}
