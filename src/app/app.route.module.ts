import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { LoginComponent } from './login/login.component'
import { NotFoundComponent } from './not-found/not-found.component'

const whiteList:Routes = [{
	path: 'login', component: LoginComponent
},
{
   path: '', redirectTo: '/login', pathMatch: 'full'
},{
	path: '**', component: NotFoundComponent
}]
@NgModule({
  imports: [
    RouterModule.forRoot(whiteList)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
