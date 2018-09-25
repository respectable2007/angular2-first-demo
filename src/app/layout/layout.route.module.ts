import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthService } from '../service/auth.service';

import { LayoutComponent } from './layout.component';
import { PasswordComponent } from './password/password.component';
import { AuthoritionComponent } from './auth/authorition/authorition.component';
import { AuthAddComponent } from './auth/auth-add/auth-add.component';
import { AsdvertComponent } from './asd/asdvert/asdvert.component'
import { AsdDetailComponent } from './asd/asd-detail/asd-detail.component';
import { ListComponent } from './special/list/list.component';
import { AddComponent } from './special/add/add.component';

const layoutRoutes: Routes = [{
  path: 'layout',
  component: LayoutComponent,
  canActivate: [AuthService],
  children:[{ path: 'password',  component: PasswordComponent },
  { path: 'authorition',  component: AuthoritionComponent},
  { path: 'authorition/editinfo/:id',  component: AuthAddComponent},
  { path: 'advertmonitor',  component: AsdvertComponent},
  { path: 'advertmonitor/detail/:id',  component: AsdDetailComponent},
  { path: 'special/list',  component: ListComponent},
  { path: 'special/add',  component: AddComponent}]
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