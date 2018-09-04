import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';
import { Hero } from './hero';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable()
export class LoginService {
  private loginUrl = '/dmss/login/authenticate' + '?t=' + new Date().getTime()
  constructor(private http: HttpClient) { }
  login(user: any): Observable<Hero> {
  	return this.http.post<Hero>(this.loginUrl, user, httpOptions)
  }
}
