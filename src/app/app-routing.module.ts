import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

// import { HeroesComponent } from './heroes/heroes.component'
// import { DashboardComponent } from './dashboard/dashboard.component'
// import { HeroDetailComponent } from './hero-detail/hero-detail.component'
import { LoginComponent } from './login/login.component'
import { LayoutComponent } from './layout/layout.component'
import { NotFoundComponent } from './not-found/not-found.component'

const routes:Routes = [{
	path: 'login', component: LoginComponent
},{
	path: 'layout', component: LayoutComponent
},{
   path: '', redirectTo: '/login', pathMatch: 'full'
},{
	path: '**', component: NotFoundComponent
}
// ,
// {
// 	path: 'dashboard', component: DashboardComponent
// },{
// 	path: 'detail/:id', component: HeroDetailComponent
// }
]
@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
