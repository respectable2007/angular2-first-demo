import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  
  userList:any[] = [{
	  value: '1',
	  label: '修改密码',
	}, {
	  value: '2',
	  label: '退出登录',
	}]
  constructor(private router: Router) { }

  ngOnInit() {
  }
  
  handle(e:any): void {
  	if (e.value === '1') {

  	} else {
  		this.router.navigate(['login'])
  	}
  }
}
