import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthService } from './service/auth.service';

import { LoginComponent } from './login/login.component'
import { LayoutComponent } from './layout/layout.component'
import { NotFoundComponent } from './not-found/not-found.component'
// import { PasswordComponent } from './password/password.component'

const whiteList:Routes = [{
	path: 'login', component: LoginComponent
},{
   path: '', redirectTo: '/login', pathMatch: 'full'
},{
	path: '**', component: NotFoundComponent
}]

const controls:Routes = [{
	path: 'layout', component: LayoutComponent,
	canActivate: [AuthService],
	children: [{
	  // path: 'password', component: PasswordComponent
	}]
}]

@NgModule({
  imports: [
    RouterModule.forRoot(controls.concat(whiteList))
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
