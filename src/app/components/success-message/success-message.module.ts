import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SuccessMessageComponent } from './success-message.component';
import { AlertModule } from 'ngx-bootstrap/alert';


@NgModule({
  declarations: [
    SuccessMessageComponent
  ],
  imports: [
    CommonModule,
    AlertModule.forRoot()
  ],
  exports: [
    SuccessMessageComponent
  ]
})
export class SuccessMessageModule { }
