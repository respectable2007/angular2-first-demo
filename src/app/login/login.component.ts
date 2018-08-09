import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
// import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';

// export class  MyErrorStateMatcher implements ErrorStateMatcher {
// 	isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean{
// 		const isSubmitted = form && form.submitted;
// 		return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
// 	}
// }

export class LoginForm {
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
  constructor(public router: Router) { }

  ngOnInit() {
  }
  
  submit(): void{
  	
  	this.router.navigate(['/layout']);
  	// console.log(this.router)
  }
}
