import { Component, forwardRef, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';
import { LoginService } from '../../service/login.service';
import { Router } from '@angular/router';
import { LocalStorageService } from 'angular-web-storage';
import { MD5 } from '../../../assets/md5';
import { ElNotificationService } from 'element-angular/release/element-angular.module';
class res {
  status: string;
  message?:string;
}
class result{
  code: number;
  data: any
}
const pwd:RegExp = /^[0-9a-zA-Z]+$/

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  pwdFrm: FormGroup;
  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
    @Inject(forwardRef(() => ElNotificationService)) private notify: any,
    private http:LoginService,
    private router:Router,
    private local:LocalStorageService
  ) { }

  ngOnInit() {
    this.pwdFrm = this.formBuilder.group({
      oldPassword: [ '', [this.oldPwdValidator]],
      newPassword: [ '', [this.newPwdValidator]],
      newCheckPassword: [ '', [this.toNewPwdValidator]]
    })
  }
  // 修改密码
  submit(): void {
    if (this.pwdFrm.valid) {
      const username = this.local.get('username')
      let data:any = {
        newCheckPassword: MD5.hasString( username + this.pwdFrm.value.newCheckPassword + 'adtime.com'),
        newPassword: MD5.hasString( username + this.pwdFrm.value.newPassword + 'adtime.com'),
        oldPassword: MD5.hasString( username + this.pwdFrm.value.oldPassword + 'adtime.com')
      }
      this.http.updatePassword(data)
               .subscribe(result => {
                 if (result.code === 200) {
                   this.router.navigate(['layout'])
                 } else {
                   this.notify.error(result.msg, '提示')
                 }
               })
    }
  }
  ctrl(item: string): AbstractControl {
    return this.pwdFrm.controls[item]
  }
  // 状态
  statusCtrl(item: string): string {
    if (!this.pwdFrm.controls[item]) return
    const control: AbstractControl = this.pwdFrm.controls[item]
    return control.dirty && control.hasError('status') ? control.errors.status : ''
  }
  // 验证信息
  messageCtrl(item: string): string {
    if (!this.pwdFrm.controls[item]) return
    const control: AbstractControl = this.pwdFrm.controls[item]
    return control.dirty && control.hasError('message') ? control.errors.message : ''
  }
  // 验证规则
  private oldPwdValidator = (control: FormGroup): res => {
    if (!control.value) {
      return { status: 'error', message: '请输入旧密码'}
    }
    // return { status: 'success'}
  }

  private newPwdValidator = (control: FormGroup): res => {
    if (!control.value) {
      return { status: 'error', message: '请输入新密码'}
    }
    if (!pwd.test(control.value)) {
      return { status: 'error', message: '新密码必须为英文或数字'}
    }
    if(control.value.length < 6) {
      return { status: 'error', message: '长度不大于6位'}
    }
    if (control.value.length > 12) {
      return { status: 'error', message: '长度不小于12位'}
    } 
    // return { status: 'success'}
  }

  private toNewPwdValidator = (control: FormGroup): res => {
    if (!control.value) {
      return { status: 'error', message: '请输入重复密码'}
    }
    if (!pwd.test(control.value)) {
      return { status: 'error', message: '新密码必须为英文或数字'}
    }
    if(control.value.length < 6) {
      return { status: 'error', message: '长度不大于6位'}
    }
    if (control.value.length > 12) {
      return { status: 'error', message: '长度不小于12位'}
    }
    if (control.value !== this.pwdFrm.controls['newPassword'].value) {
      return { status: 'error', message: '确认新密码与新密码不一致'}
    }
    // return { status: 'success'}
  }
}
