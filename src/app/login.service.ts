import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
};

@Injectable()
export class LoginService {
  private loginUrl = '/dmss/login/authenticate' + '?t=' + new Date().getTime()
  constructor(private http: HttpClient) { }
  login(user: any): Observable<any> {
  	let data:string ='username=' + user.name + '&password=' + user.password
  	return this.http.post(this.loginUrl, data, httpOptions)
  }
}
