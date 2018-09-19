import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';

import { AppComponent } from './app.component';


import { LoginService } from './service/login.service';
import { AuthService } from './service/auth.service';


import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';
import { LayoutModule } from './layout/layout.module';

import { AngularWebStorageModule } from 'angular-web-storage';

import { ElModule } from 'element-angular';

import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { MainComponent } from './layout/main/main.component';
import { AsideComponent } from './layout/aside/aside.component';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    LayoutComponent,
    NotFoundComponent,
    MainComponent,
    AsideComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    ElModule.forRoot(),
    AngularWebStorageModule
  ],
  providers: [
    LoginService,
    AuthService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public router: Router) {}
}
