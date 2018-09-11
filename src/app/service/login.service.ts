import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
};
const API = {
  POST_LOGIN: '/dmss/login/authenticate?t=' + new Date().getTime(), // 登录
  GET_MENU_LIST: '/dmss/user/menu/list', // 获取用户菜单
}
@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }
  login(user: any): Observable<any> {
  	let data:string ='username=' + user.name + '&password=' + user.password
  	return this.http.post(API.POST_LOGIN, data, httpOptions)
  }
  menu(): Observable<any> {
  	return this.http.get(API.GET_MENU_LIST)
  }
}
