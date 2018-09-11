import { NgModule }       from '@angular/core';
import { CommonModule }   from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule }    from '@angular/forms';
import { ElModule } from 'element-angular';
 
import { PasswordComponent }    from './password/password.component';
import { LayoutService }    from './layout.service';
import { LayoutRoutingModule }    from './layout-routing.module';
 
 
@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    ReactiveFormsModule,
    FormsModule,
    LayoutRoutingModule,
    ElModule.forRoot()
  ],
  declarations: [
    PasswordComponent
  ],
  providers: [ LayoutService ]
})
export class LayoutModule {}