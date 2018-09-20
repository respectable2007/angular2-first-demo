import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { of } from 'rxjs/observable/of';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8' })
};
const httpJson = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json;charset=utf-8' }),
  params: {}
};
httpJson.headers.append('t', (new Date().getTime()).toString())
const API = {
  POST_LOGIN: '/dmss/login/authenticate', // 登录
  GET_MENU_LIST: '/dmss/user/menu/list', // 获取用户菜单
  UPDATE_USER_PASSWORD: '/dmss/user/password/update', // 修改密码
  
  GET_PLAT_LIST: '/dmss/resource/getPlatList', //获取平台列表

  // 权限管理
  GET_ROLE_LIST: '/dmss/role/list', // 角色列表// 活动列表
  ADD_ROLE: '/dmss/role/add', // 新增角色
  DEL_ROLE: '/dmss/role/delete', // 删除角色
  GET_AUTH_BY_ID: '/dmss/menu/list_by_role', // 根据id获取角色列表
  UPDATE_ROLE: '/dmss/role/update', // 修改角色信息

   // 广告监测
  GET_ADVERT_LIST: '/dmss/advMonitor/pageAdvList', // 广告监测列表
  GET_ADVERT_DETAIL: '/dmss/advMonitor/advDtl', // 获取广告详情
  GET_ADVERT_SETTLE_LIST: '/dmss/advMonitor/pageSettledList', // 企业广告处理历史列表
  POST_ADVERT_SETTLE: '/dmss/advMonitor/settle', // 处理广告
  EXPORT_ADVERT: '/dmss/advMonitor/export', // 广告导出

  // 专项监测
  SPECIAL_DETAIL: '/dmss/specialMonitorCfg/detail', // 专项监测配置-任务详情
  SPECIAL_INSERT: '/dmss/specialMonitorCfg/insert', // 专项监测配置-新增任务
  SPECIAL_PAGE_SELECT_ADV: '/dmss/specialMonitorCfg/pageSelectAdv', // 专项监测结果-分页查询广告监测结果
  SPECIAL_PAGE_SELECT_CFG: '/dmss/specialMonitorCfg/pageSelectCfg', // 专项监测配置-分页查询任务列表
  SPECIAL_UPDATE: '/dmss/specialMonitorCfg/update', // 专项监测配置-修改任务
  DEL_TASK_FILE: '/dmss/specialMonitorCfg/delMonitorTaskFile', // 专项监测配置-删除任务文件数据
  HAS_DATA_FILE: '/dmss/specialMonitorCfg/hasDataFile', // 专项监测配置-查看任务配置是否有数据文件，0：无，1：有
  SPECIAL_RLTS_EXPORT: '/dmss/specialMonitorCfg/export', // 专项监测结果-广告监测结果导出
  DOWN_MONITOR_TASK_FILE: '/dmss/specialMonitorCfg/downloadMonitorTaskFile', // 专项监测配置-下载任务文件数据
  SPECIAL_UPLOAD: '/dmss/specialMonitorCfg/upload' // 上传文件监测任务附件或数据文件
}
@Injectable()
export class LoginService {
  constructor(private http: HttpClient) { }

  handleObject(data:any):any {
    for(let i in data) {
     if (!data[i]) {
       delete data[i]
     } 
    }
    return data
  }

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

  // 平台列表
  getPlatList(): Observable<any> {
    httpJson.params = {}
    return this.http.get(API.GET_PLAT_LIST, httpJson)
  }

  // 权限管理
  getRoleList(data:any): Observable<any> {
    httpJson.params = data
    return this.http.get(API.GET_ROLE_LIST,httpJson)
  }
  addRole(data:any): Observable<any> {
    return this.http.post(API.ADD_ROLE, data, httpJson)
  }
  delRole(data:any): Observable<any> {
    httpJson.params = data
    return this.http.get(API.DEL_ROLE,httpJson)
  }
  roleDetail(data:any): Observable<any> {
    httpJson.params = data
    return this.http.get(API.GET_AUTH_BY_ID, httpJson)
  }
  updateRole(data:any): Observable<any> {
    return this.http.post(API.UPDATE_ROLE, data, httpJson)
  }

  // 广告监测
  getAsdvertList(data:any): Observable<any> {
    httpJson.params = this.handleObject(data)
    return this.http.get(API.GET_ADVERT_LIST, httpJson)
  }
  getAsdDetail(data:any): Observable<any> {
    httpJson.params = data
    return this.http.get(API.GET_ADVERT_DETAIL, httpJson)
  }
  asdExport(data:any): Observable<any> {
    httpJson.params = data
    return this.http.get(API.EXPORT_ADVERT, httpJson)
  }

  // 专项监测
  getTaskList(data:any): Observable<any> {
    httpJson.params = {}
    return this.http.post(API.SPECIAL_PAGE_SELECT_CFG, data, httpJson)
  }
}
