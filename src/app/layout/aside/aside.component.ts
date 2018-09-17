import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../service/login.service';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-aside',
  templateUrl: './aside.component.html',
  styleUrls: ['./aside.component.css']
})
export class AsideComponent implements OnInit {
  
  menu:any[] = [];
  constructor(private service:LoginService,
  	          private local:LocalStorageService) { }

  ngOnInit() {
	this.menu = this.local.get('menu');
	console.log(this.menu)
  }

}
