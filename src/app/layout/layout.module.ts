import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ElModule } from 'element-angular';
 
import { LayoutService }    from './layout.service';
import { LayoutRoutingModule }    from './layout.route.module';

import { PasswordComponent }    from './password/password.component';
import { AuthoritionComponent }    from './auth/authorition/authorition.component';
import { AuthAddComponent } from './auth/auth-add/auth-add.component';
import { AsdvertComponent } from './asd/asdvert/asdvert.component';
import { AsdDetailComponent } from './asd/asd-detail/asd-detail.component';
import { ListComponent } from './special/list/list.component';
import { AddComponent } from './special/add/add.component';

 
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    LayoutRoutingModule,
    ElModule.forRoot()
  ],
  declarations: [
    PasswordComponent,
    AuthoritionComponent,
    AuthAddComponent,
    AsdvertComponent,
    AsdDetailComponent,
    ListComponent,
    AddComponent
  ],
  providers: [ LayoutService ]
})
export class LayoutModule {}