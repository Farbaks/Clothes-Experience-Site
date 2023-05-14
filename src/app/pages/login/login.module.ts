import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { LoginRoutingModule } from './login-routing.module';
import { LoginComponent } from './login.component';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { SuccessMessageModule } from 'src/app/components/success-message/success-message.module';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginRoutingModule,
    ReactiveFormsModule,
    ErrorMessageModule,
    SuccessMessageModule,
    LaddaModule.forRoot({
        style: "zoom-out",
        spinnerSize: 35,
        spinnerColor: "white",
        spinnerLines: 12
    }),
  ]
})
export class LoginModule { }
