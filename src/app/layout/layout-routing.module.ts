import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { LayoutComponent }    from './layout.component';
import { PasswordComponent }    from './password/password.component';

const layoutRoutes: Routes = [{
  path: 'layout', component: LayoutComponent,
  canActivate: [AuthService],
  children:[{ path: 'password',  component: PasswordComponent }]
}];
 
@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }