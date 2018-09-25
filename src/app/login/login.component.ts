import { Component, forwardRef, Inject, OnInit, ViewEncapsulation, ViewChild } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms'
import { ElNotificationService } from 'element-angular/release/element-angular.module';
import { Router } from '@angular/router';
import { LoginService } from '../service/login.service';
import { MD5 } from '../../assets/md5';
// import { ElModule } from 'element-angular';
import { LocalStorageService } from 'angular-web-storage';

// @ViewChild('input') input;
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
    this.local.set('isLogin', false)
    this.local.set('username', '')
  }
  ngAfterViewInit() {
    // console.log(document.getElementsByClassName('el-input__inner')[0])
    // let input = document.querySelector('.el-input__inner')
    // input.focus()
    // this.input.nativeElement.focus()
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
  handleLogin(e:any):void{
    if (e.keyCode === 13) {
      if (!this.validateForm.value.name) {
        this.notify.error('请输入账号名', '提示')
        return
      }
      if (!this.validateForm.value.password) {
        this.notify.error('请输入密码', '提示')
      }
      if (this.validateForm.value.password && this.validateForm.value.name) {
        this.submit()
      }
    }
  }
  private nameValidator = (control: FormControl): validateResult  => {
    return {status: 'success'}
  }

  private passwordValidator = (control: FormControl): validateResult => {
    return {status: 'success'}
  }
}
