import { Component, OnInit } from '@angular/core';
import { LocalStorageService } from 'angular-web-storage';

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor(private local: LocalStorageService) { }

  ngOnInit() {
  	this.local.set('isLogin', false)
  	this.local.set('username', '')
  	this.local.set('menu', [])
  }

}
