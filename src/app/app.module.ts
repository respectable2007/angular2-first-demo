import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule} from '@angular/forms';
// import { HttpModule } from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
// import { InMemoryDataService } from './in-memory-data.service';

import { AppComponent } from './app.component';

// import { HeroesComponent } from './heroes/heroes.component';
// import { HeroDetailComponent } from './hero-detail/hero-detail.component';
// import { MessagesComponent } from './messages/messages.component';
// import { DashboardComponent } from './dashboard/dashboard.component';
// import { HeroSearchComponent } from './hero-search/hero-search.component';

// import { HeroService } from './hero.service';
// import { MessageService } from './message.service';
import { LoginService } from './login.service';


// import { Router } from '@angular/router';
import { AppRoutingModule } from './/app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatCheckboxModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { LoginComponent } from './login/login.component';
import { LayoutComponent } from './layout/layout.component';
import { NotFoundComponent } from './not-found/not-found.component';


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
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    // FormControl,
    // FormGroupDirective,
    // NgForm,
    // Validators,
    // ReactiveFormsModule,
    FormsModule,
    // HttpModule,
    AppRoutingModule,
    HttpClientModule,
    // HttpClientInMemoryWebApiModule.forRoot(
    //   InMemoryDataService, { dataEncapsulation: false }
    // ),
    BrowserAnimationsModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatInputModule
  ],
  providers: [
    // HeroService,
    // MessageService,
    // InMemoryDataService
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
  // constructor(public router: Router) {}
}
