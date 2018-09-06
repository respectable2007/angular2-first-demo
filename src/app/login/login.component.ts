import { Component, forwardRef, Inject, OnInit, ViewEncapsulation } from '@angular/core'
import { FormBuilder, Validators, FormGroup, FormControl, AbstractControl } from '@angular/forms'
// import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';
import { MD5 } from '../../assets/md5';
import { ElModule } from 'element-angular';


class LoginForm {
  name: string;
  password: string;
}
class res{
  code: number;
  data: any
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  validateForm: FormGroup;

  model = new LoginForm();

  // matcher = new MyErrorStateMatcher();
  constructor(public router: Router, 
              private loginService: LoginService,
              @Inject(forwardRef(() => FormBuilder)) private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.validateForm = this.formBuilder.group({
      password: [ '', [this.passwordValidator]],
      mail: [ '', [this.emailValidator]]
    })
  }
  
  // 登录
  submit(): void{
    console.log(this.validateForm.value)
    let user = new LoginForm();
    user.name = this.model.name;
    user.password = MD5.hasString(this.model.name + this.model.password + 'adtime.com')
  	this.loginService.login(user)
        .subscribe(user => {
          if (user.code === 200) {
            this.router.navigate(['/layout']);
          }
        })
  }
  
  ctrl(item: string): AbstractControl {
    return this.validateForm.controls[item]
  }
  
  messageCtrl(item: string): string {
    if (!this.validateForm.controls[item]) return
    const control: AbstractControl = this.validateForm.controls[item]
    return control.dirty && control.hasError('message') ? control.errors.message : ''
  }
  
  private emailValidator = (control: FormControl): validateResult  => {
    if (!control.value) {
      return { status: 'error', message: '用户名是必填的'}
    }

    if (control.value.length < 4) {
      return { status: 'error', message: '用户名位数不小于4'}
    }

    if (control.value.length > 10) {
      return { status: 'error', message: '用户名位数不超过10'}
    }
  }
}
