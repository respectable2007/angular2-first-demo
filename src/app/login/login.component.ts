import { Component, forwardRef, Inject, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { ElNotificationService } from 'element-angular/release/element-angular.module';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MD5 } from '../../assets/md5';
import { ElModule } from 'element-angular';
import { LocalStorageService } from 'angular-web-storage';


class LoginForm {
  name: string;
  password: string;
}
class res{
  code: number;
  data: any
}
class validateResult {
  status: string;
  message?: string;
}
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  model = new LoginForm();

  constructor(public router: Router, 
              private loginService: LoginService,
              @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder,
              @Inject(forwardRef(() => ElNotificationService)) private notify: any,
              public local: LocalStorageService) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      password: [ '', [this.passwordValidator]],
      name: [ '', [this.nameValidator]]
    })
  }
  
  // 登录
  submit(): void{
    let user = new LoginForm();
    user.name = this.validateForm.value.name;
    user.password = MD5.hasString(this.validateForm.value.name + this.validateForm.value.password + 'adtime.com')
    this.loginService.login(user)
        .subscribe(user => {
          if (user.code === 200) {
            this.local.set('username', this.validateForm.value.name)
            this.local.set('isLogin', true)
            this.router.navigate(['/layout']);
          } else {
            this.notify.error('账号或密码错误', '提示')
          }
        })
  }
  
  // ctrl(item: string): AbstractControl {
  //   return this.validateForm.controls[item]
  // }
  
  // statusCtrl(item: string): string {
  //   if (!this.validateForm.controls[item]) return
  //   const control:AbstractControl = this.validateForm.controls[item]
  //   return control.dirty && control.hasError('status') ? control.errors.status: ''
  // }

  // messageCtrl(item: string): string {
  //   if (!this.validateForm.controls[item]) return
  //   const control: AbstractControl = this.validateForm.controls[item]
  //   return control.dirty && control.hasError('message') ? control.errors.message : ''
  // }
  
  private nameValidator = (control: FormControl): validateResult  => {
    // if (!control.value) {
    //   return { status: 'error', message: '账号是必填的'}
    // }

    // if (control.value.length < 4) {
    //   return { status: 'error', message: '账号位数不小于4'}
    // }

    // if (control.value.length > 10) {
    //   return { status: 'error', message: '账号位数不超过10'}
    // }

    return {status: 'success'}
  }

  private passwordValidator = (control: FormControl): validateResult => {
    // if (!control.value) {
    //   return { status: 'error', message: '密码是必填的'}
    // }

    // if (control.value.length < 8) {
    //   return { status: 'error', message: '密码位数不小于8'}
    // }

    // if (control.value.length > 16) {
    //   return { status: 'error', message: '密码位数不超过16'}
    // }

    return {status: 'success'}
  }
}
