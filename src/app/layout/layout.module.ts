    import { NgModule }       from '@angular/core';
    import { CommonModule }   from '@angular/common';
    import { FormsModule }    from '@angular/forms';
     
    import { PasswordComponent }    from './password/password.component';
    import { LayoutService }    from './layout.service';
    import { LayoutRoutingModule }    from './layout-routing.module';
     
     
    @NgModule({
      imports: [
        CommonModule,
        FormsModule,
        LayoutRoutingModule
      ],
      declarations: [
        PasswordComponent
      ],
      providers: [ LayoutService ]
    })
    export class LayoutModule {}