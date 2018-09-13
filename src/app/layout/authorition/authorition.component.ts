import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-authorition',
  templateUrl: './authorition.component.html',
  styleUrls: ['./authorition.component.css']
})
export class AuthoritionComponent implements OnInit {
  
  authList:any[] = []

  constructor(private http:LoginService,
  	          private router:Router) { }

  ngOnInit() {
    this.getRoleList()
  }

  // 获取角色列表
  getRoleList() {
    this.http.getRoleList()
             .subscribe(res => {
             	if (res.code === 200) {
             	  this.authList = res.data.list
             	}
             })
  }
  
  // 新增
  handleAdd() {
    this.router.navigate(['layout/auth/add'])
  }

  // 编辑
  handleEidt(scope:any) {

  }
  
  // 删除
  handleDel(scope:any) {

  }
}
