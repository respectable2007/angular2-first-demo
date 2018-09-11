import { Component, forwardRef, Inject, ViewEncapsulation, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl} from '@angular/forms';

class res {
  status: string;
  message?:string;
}

const pwd:RegExp = /^[0-9a-zA-Z]\{6,12}+$/

@Component({
  selector: 'app-password',
  templateUrl: './password.component.html',
  styleUrls: ['./password.component.css']
})
export class PasswordComponent implements OnInit {
  pwdFrm: FormGroup;
  constructor(
    @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  	this.pwdFrm = this.formBuilder.group({
  	  oldPassword: [ '', [this.oldPwdValidator]],
  	  newPassword: [ '', [this.newPwdValidator]],
  	  newCheckPassword: [ '', [this.toNewPwdValidator]]
  	})
  }
  
  submit(): void {
    console.log(this.pwdFrm.value)

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
    return { status: 'success'}
  }

  private newPwdValidator = (control: FormGroup): res => {
    if (!control.value) {
      return { status: 'error', message: '请输入新密码'}
    }
    if (!pwd.test(control.value)) {
      return { status: 'error', message: '新密码必须为英文或数字，长度为6-12位'}
    }
    return { status: 'success'}
  }

  private toNewPwdValidator = (control: FormGroup): res => {
    if (!control.value) {
      return { status: 'error', message: '请输入重复密码'}
    }
    if (!pwd.test(control.value)) {
      return { status: 'error', message: '新密码必须为英文或数字，长度为6-12位'}
    }
    if (control.value !== this.pwdFrm.controls['newPassword'].value) {
      return { status: 'error', message: '确认新密码与新密码不一致'}
    }
    return { status: 'success'}
  }
}
