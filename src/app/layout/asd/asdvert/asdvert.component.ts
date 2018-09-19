import { Component, OnInit, Inject, forwardRef } from '@angular/core';
import { FormGroup, AbstractControl, FormBuilder, Validators, FormControl } from '@angular/forms';
import { LoginService } from '../../../service/login.service';
import { Router } from '@angular/router';
class res {
  message:string;
}
@Component({
  selector: 'app-asdvert',
  templateUrl: './asdvert.component.html',
  styleUrls: ['./asdvert.component.css']
})
export class AsdvertComponent implements OnInit {
  
  searchFrm: FormGroup;
  platList:any[] = [];
  asdList:any[] = [];
  page:any = {
    recordTotal: 0,
    pageSize: 10,
    pageNum: 1
  }
  constructor(
  	@Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    private service: LoginService,
    private router: Router) { }

  ngOnInit() {
  	this.searchFrm = this.formBuilder.group({
  		comName: ['', this.comNameValidator],
  		keyword: ['', this.keywordValidator],
      platName: '',
  		pubStartDate: ['', this.pubStartDateValidator],
  		pubEndDate: ['', this.pubEndDateValidator],
  		dataCollectStartDate: ['', this.dataCollectStartDateValidator],
  		dataCollectEndDate: ['', this.dataCollectEndDateValidator]
  	})
    this.getPlatList()
  }

  handleDetail(scope:any) {
    let path = 'layout/advertmonitor/detail/' + scope.rowData.id
    this.router.navigate([path])
  }
  
  // 获取广告列表
  handleSearch() {
    if (this.searchFrm.valid) {
      this.getAsdvertList()
    }
  }

  getAsdvertList() {
    this.service.getAsdvertList(Object.assign(this.searchFrm.value, {
        pageNum: this.page.pageNum,
        pageSize: 10,
        exportType: '1'
      })).subscribe(result => {
        if (result.code === 200) {
          this.asdList = result.data.list
          this.page.recordTotal = result.data.recordTotal
          this.page.pageNum = result.data.pageNum
        }
      })
  }

  // 页码变化事件
  handlePageNum(e:any) {
    if (e === this.page.pageNum) return
    this.page.pageNum = e
    this.getAsdvertList()
  }
  // 日期控件清空事件
  handleClearDataStart(e:any) {
    this.searchFrm.setValue( Object.assign(this.searchFrm.value,{
      pubStartDate: ''
    }))
  } 
  handleClearDataEnd(e:any) {
    this.searchFrm.setValue( Object.assign(this.searchFrm.value,{
      pubEndDate: ''
    }))
  }
  handleClearDataColStart(e:any) {
    this.searchFrm.setValue( Object.assign(this.searchFrm.value,{
      dataCollectStartDate: ''
    }))
  }
  handleClearDataColEnd(e:any) {
    this.searchFrm.setValue( Object.assign(this.searchFrm.value,{
      dataCollectEndDate: ''
    }))
  }

  getPlatList() {
    this.service.getPlatList()
                .subscribe(result => {
                  if (result.code === 200) {
                    this.platList = result.data
                  }
                })
  }

  messageCtrl(item: string):string {
  	if(!this.searchFrm.controls[item]) return
  	const control:AbstractControl = this.searchFrm.controls[item];
    return control.dirty && control.hasError('message') ? control.errors.message : '';
  }

  private comNameValidator = (control:FormGroup): res => {
    if(control.value.length > 100) {
      return { message: '企业名称不能超过100位' }
    }
  }

  private keywordValidator = (control:FormGroup): res => {
  	if(control.value.length > 200) {
  	  return { message: '关键词不能超过200位' }
  	}
  }

  private pubStartDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['pubEndDate'].value) {
    	if (Date.parse(control.value.replace(/-/g, '/')) > Date.parse(this.searchFrm.controls['pubEndDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }

  private pubEndDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['pubStartDate'].value) {
    	if (Date.parse(control.value.replace(/-/g, '/')) < Date.parse(this.searchFrm.controls['pubStartDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }

  private dataCollectStartDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['dataCollectEndDate'].value) {
    	if (Date.parse(control.value.replace(/-/g, '/')) > Date.parse(this.searchFrm.controls['dataCollectEndDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }

   private dataCollectEndDateValidator = (control:FormGroup): res => {
    if (control.value && this.searchFrm.controls['dataCollectStartDate'].value) {
    	if (Date.parse(control.value.replace(/-/g, '/')) < Date.parse(this.searchFrm.controls['dataCollectStartDate'].value.replace(/-/g, '/'))) {
          return { message: '结束时间应大于起始时间'}
    	}
    }
  }
}
