import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
};
const httpJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' })
};
httpJson.headers.append('t', (new Date().getTime()).toString())
const API = {
  POST_LOGIN: '/dmss/login/authenticate', // 登录
  GET_MENU_LIST: '/dmss/user/menu/list', // 获取用户菜单
  UPDATE_USER_PASSWORD: '/dmss/user/password/update', // 修改密码
  
  // 权限管理
  GET_ROLE_LIST: '/dmss/role/list', // 角色列表// 活动列表
  GET_USER_LIST: '/dmss/user/list', // 用户列表
  ADD_ROLE: '/dmss/role/add', // 新增角色
  DEL_ROLE: '/dmss/role/delete', // 删除角色
  UPDATE_ROLE: '/dmss/role/update', // 修改角色信息

   // 广告监测
  GET_ADVERT_LIST: '/dmss/advMonitor/pageAdvList', // 广告监测列表
  GET_ADVERT_DETAIL: '/dmss/advMonitor/advDtl', // 获取广告详情
  GET_ADVERT_SETTLE_LIST: '/dmss/advMonitor/pageSettledList', // 企业广告处理历史列表
  POST_ADVERT_SETTLE: '/dmss/advMonitor/settle', // 处理广告
  EXPORT_ADVERT: '/dmss/advMonitor/export'// 广告导出
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
  updatePassword(data:any): Observable<any> {
    return this.http.post(API.UPDATE_USER_PASSWORD, data, httpJson)
  }
  getRoleList(): Observable<any> {
    return this.http.get(API.GET_ROLE_LIST)
  }
}
