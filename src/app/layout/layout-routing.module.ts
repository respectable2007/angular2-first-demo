import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { LayoutComponent }    from './layout.component';
import { PasswordComponent }    from './password/password.component';
import { AuthoritionComponent }    from './authorition/authorition.component';
import { AuthAddComponent } from './auth-add/auth-add.component';
import { AsdvertComponent } from './asdvert/asdvert.component'

const layoutRoutes: Routes = [{
  path: 'layout',
  component: LayoutComponent,
  canActivate: [AuthService],
  children:[{ path: 'password',  component: PasswordComponent },
  { path: 'authorition',  component: AuthoritionComponent},
  { path: 'authorition/editinfo/:id',  component: AuthAddComponent},
  { path: 'advertmonitor',  component: AsdvertComponent}]
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