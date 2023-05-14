import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SignupRoutingModule } from './signup-routing.module';
import { SignupComponent } from './signup.component';
import { ErrorMessageModule } from 'src/app/components/error-message/error-message.module';
import { SuccessMessageModule } from 'src/app/components/success-message/success-message.module';
import { ReactiveFormsModule } from '@angular/forms';
import { LaddaModule } from 'angular2-ladda';

@NgModule({
  declarations: [
    SignupComponent
  ],
  imports: [
    CommonModule,
    SignupRoutingModule,
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
export class SignupModule { }
