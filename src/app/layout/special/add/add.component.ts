import { Component, OnInit, forwardRef, Inject } from '@angular/core';
import { FormGroup, Validators, FormBuilder, FormControl, AbstractControl} from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from '../../../service/login.service';
import { ElMessageService } from 'element-angular/release/element-angular.module';
const upload = 'dmss/specialMonitorCfg/upload' // 上传文件
class res{
  message:string	
}
@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})
export class AddComponent implements OnInit {
  taskFrm: FormGroup;

  plateList:any[] = [];
  groupList:any[] = [];
  keywordList:any[] = [];
  
  upload = upload;
  constructor(@Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
              private service: LoginService,
  	          private router: Router,
  	          @Inject(forwardRef(() => ElMessageService)) private message: ElMessageService) { }

  ngOnInit() {
  	this.getPlatList()
  	this.getAllGroup()
  	this.getKeywordList()
    this.taskFrm = this.formBuilder.group({
      taskName: ['', this.taskNameValidator],
      dataCollectStartDate: ['', this.dataCollectStartDateValidator],
      dataCollectEndDate: ['', this.endValidator],
      comGroupId: ['', this.comGroupIdValidator],
      platCd: [[], this.platCdValidator],
      kwNameId: [[], this.kwNameIdValidator]
    })
  }
  // 返回
  handleBack() {
    this.router.navigate(['layout/special/list'])
  }
  // 平台列表
  getPlatList() {
  	this.service.getPlatList()
  	            .subscribe(result => {
  	              if (result.code === 200) {
  	              	this.plateList = result.data
  	              }
  	            })
  }
  // 企业组列表
  getAllGroup() {
  	this.service.getAllGroup()
  	            .subscribe(result => {
  	              if (result.code === 200) {
  	              	this.groupList = result.data
  	              }
  	            })
  }
  // 关键词列表
  getKeywordList() {
  	this.service.getKeywordList()
  	            .subscribe(result => {
  	              if (result.code === 200) {
  	              	this.keywordList = result.data
  	              }
  	            })
  }
  // 提交
  handleSubmit() {
    if (this.taskFrm.valid) {
      this.service.addTask(Object.assign({}, this.taskFrm.value, {
      	platCd: this.taskFrm.value.platCd.join(','),
      	kwNameId: this.taskFrm.value.kwNameId.join(','),
      	attachFileIds: ''
      })).subscribe(result => {
      	if (result.code === 200) {
      	  this.router.navigate(['layout/special/list'])
      	}
      })
    }
  }
  // 上传前文件过滤
  beforeUpload(file: File): boolean {
  	let is50:boolean = true
  	if(file.size/1024/1024 > 50) {
  	  this.message.error('上传文件大小不能超过50MB!')
      return is50
  	}
  	// return is50
  }
  handleFileSuccess(e:any) {
    console.log(e)
  }
  // 日期控件清空事件
  handleClearStart(e:any) {
    this.taskFrm.setValue(Object.assign(this.taskFrm.value,{
      dataCollectStartDate: ''
    }))
  }

  handleClearEnd(e:any) {
    this.taskFrm.setValue(Object.assign(this.taskFrm.value,{
      dataCollectEndDate: ''
    }))
  }
  // 企业组改变事件
  handleGroupChange(e:any) {
    this.taskFrm.setValue(Object.assign(this.taskFrm.value,{
      comGroupId: e
    }))
  }
  // 平台改变事件
  handlePlatChange(e:any) {
    this.taskFrm.setValue(Object.assign(this.taskFrm.value,{
      platCd: e
    }))
  }
  // 关键词改变事件
  handleKeywordChange(e:any) {
    this.taskFrm.setValue(Object.assign(this.taskFrm.value,{
      kwNameId: e
    }))
  }
  // 验证
  messageCtrl(item: string):string {
    if(!this.taskFrm.controls[item]) return
    const control:AbstractControl = this.taskFrm.controls[item]
    return control.invalid ? control.errors.message : ''
  }

  private taskNameValidator = (control:FormGroup):res => {
    if(control.value.length > 100) {
      return { message: '任务名称不超过100位'}
    }
  }
  private dataCollectStartDateValidator = (control:FormGroup):res => {
  	if (control.value && this.taskFrm.controls['dataCollectEndDate'].value) {
  		let start = control.value.replace(/-/g, '/')
  		let end = this.taskFrm.controls['dataCollectEndDate'].value.replace(/-/g, '/')
  		if (Date.parse(start) > Date.parse(end)) {
  		  return { message: '结束时间应大于起始时间'}
  		}
  	}
  }
  private endValidator = (control:FormGroup):res => {
  	if (control.value && this.taskFrm.controls['dataCollectStartDate'].value) {
  		let end = control.value.replace(/-/g, '/')
  		let start = this.taskFrm.controls['dataCollectStartDate'].value.replace(/-/g, '/')
  		if (Date.parse(start) > Date.parse(end)) {
  		  return { message: '结束时间应大于起始时间'}
  		}
  	}
  }
  private comGroupIdValidator = (control:FormGroup):res => {
  	if (this.taskFrm) {
  	  if (!control.value && !this.taskFrm.value.platCd.length) {
        return { message: '监测企业组和监测平台至少要填一项'}
      }
  	}
  }
  private platCdValidator = (control:FormGroup):res => {
  	if (this.taskFrm) {
  	  if (!control.value.length && !this.taskFrm.value.comGroupId) {
        return { message: '监测企业组和监测平台至少要填一项'}
      }
  	}
  }
  private kwNameIdValidator = (control:FormGroup):res => {
  	if (this.taskFrm) {
	   if (!control.value.length) {
	     return { message: '关键词名称不可为空'}
	   }	
    }
  }
}
