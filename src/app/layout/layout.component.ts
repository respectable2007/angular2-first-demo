import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';

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
	}];
  username:string = '';
  constructor(private router: Router,
  	          public local: LocalStorageService) { }

  ngOnInit() {
  	this.username = this.local.get('username')
  }
  
  handle(e:any): void {
  	if (e.value === '1') {

  	} else {
  		this.router.navigate(['login'])
  	}
  }
}
