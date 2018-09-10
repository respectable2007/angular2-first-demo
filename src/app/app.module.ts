import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';


import { LoginService } from './login.service';


import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { Guard } from './app.guard';

import { AngularWebStorageModule } from 'angular-web-storage';

import { ElModule } from 'element-angular';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PasswordComponent } from './password/password.component';
import { MainComponent } from './layout/main/main.component';
import { AsideComponent } from './layout/aside/aside.component';


@NgModule({
  declarations: [
    AppComponent,
    // HeroesComponent,
    // HeroDetailComponent,
    // MessagesComponent,
    // DashboardComponent,
    // HeroSearchComponent,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    PasswordComponent,
    MainComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    // FormControl,
    // FormGroupDirective,
    // NgForm,
    // Validators,
    ReactiveFormsModule,
    FormsModule,
    // HttpModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    BrowserAnimationsModule,
    ElModule.forRoot(),
    AngularWebStorageModule
    // MatButtonModule,
    // MatCheckboxModule,
    // MatFormFieldModule,
    // MatInputModule
  ],
  providers: [
    // HeroService,
    // MessageService,
    // InMemoryDataService
    LoginService,
    Guard
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public router: Router) {}
}
