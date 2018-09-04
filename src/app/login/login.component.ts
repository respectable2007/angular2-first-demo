import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from '../login.service';

// export class  MyErrorStateMatcher implements ErrorStateMatcher {
// 	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean{
// 		const isSubmitted = form && form.submitted;
// 		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
// 	}
// }

class LoginForm {
  name: string;
  password: string;
}

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  model = new LoginForm();

  // matcher = new MyErrorStateMatcher();
  constructor(public router: Router, 
              private loginService: LoginService) { }

  ngOnInit() {
  }
  
  submit(): void{
  	this.loginService.login(this.model)
        .subscribe(user => {
          console.log(user)
        })
  	// this.router.navigate(['/layout']);
  	// console.log(this.router)
  }
}
