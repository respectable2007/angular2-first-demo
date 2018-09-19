import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorition',
  templateUrl: './authorition.component.html',
  styleUrls: ['./authorition.component.css']
})
export class AuthoritionComponent implements OnInit {
  
  authList:any[] = []

  page:any = {
    recordTotal: 0,
    pageNum: 1,
    pageSize: 10
  }
  constructor(private http:LoginService,
  	          private router:Router) { }

  ngOnInit() {
    this.getRoleList()
  }

  // 获取角色列表
  getRoleList() {
    this.http.getRoleList(this.page)
             .subscribe(res => {
             	if (res.code === 200) {
             	  this.authList = res.data.list
                this.page = {
                  recordTotal: res.data.recordTotal,
                  pageNum: res.data.pageNum
                }
             	}
             })
  }
  // 新增
  handleAdd() {
    this.router.navigate(['layout/authorition/editinfo/0'])
  }

  // 编辑
  handleEidt(scope:any) {
    let path = 'layout/authorition/editinfo/' + scope.rowData.id
    this.router.navigate([path])
  }
  
  // 删除
  handleDel(scope:any) {
    this.http.delRole({roleId:scope.rowData.id})
             .subscribe(res => {
               if (res.code === 200) {
                 this.getRoleList()
               }
             })
  }

  handleChange(e:any) {
     if (e === this.page.pageNum) return
    this.page.pageNum = e
    this.getRoleList()
  }
}
