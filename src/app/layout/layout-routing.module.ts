import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
 
import { PasswordComponent }    from './password/password.component';

const layoutRoutes: Routes = [
  { path: 'password',  component: PasswordComponent }
];
 
@NgModule({
  imports: [
    RouterModule.forChild(layoutRoutes)
  ],
  exports: [
    RouterModule
  ]
})
export class LayoutRoutingModule { }