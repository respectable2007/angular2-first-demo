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
  activeIndex:number = 0;
  constructor(private service:LoginService,
  	          private local:LocalStorageService) { }

  ngOnInit() {
	  this.menu = this.local.get('menu');
	  if (!this.menu || !this.menu.length) {
	    this.service.menu()
        .subscribe(user => {
          if (user.code === 200) {
            this.menu = user.data
            this.activeIndex = user.data[0].id
          } 
        })
	  } else {
      this.activeIndex = this.local.get('menu')[0].id
    }
  }

}
