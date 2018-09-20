import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  
  specialList:any[] = [];
  page:any = {
  	recordTotal: 0,
  	pageNum: 1,
  	pageSize: 10
  }

  constructor(private service: LoginService,
  	          private router: Router) { }

  ngOnInit() {
  	this.getTaskList()
  }
  
  // 新增
  handleAdd() {
    this.router.navigate(['layout/special/add'])
  }

  // 获取任务列表
  getTaskList() {
  	this.service.getTaskList({
  	  pageNum: this.page.pageNum,
  	  pageSize: this.page.pageSize
  	}).subscribe(result => {
  	  if (result.code === 200) {
  	  	this.specialList = result.data.list
  	  	this.page = {
  	  	  recordTotal: result.data.recordTotal,
  	      pageNum: result.data.pageNum,
  	      pageSize: result.data.pageSize
  	  	}
  	  }
  	})
  }
  
  handlePageNum(e: any) {
  	if (e === this.page.pageNum) return
  	this.page.pageNum = e
  	this.getTaskList()
  }
}
