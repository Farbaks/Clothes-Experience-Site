import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SearchModule } from 'src/app/components/search/search.module';
import { ProductModule } from 'src/app/components/product/product.module';
import { FormsModule } from '@angular/forms';


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    HomeRoutingModule,
    FormsModule,
    SearchModule,
    ProductModule
  ]
})
export class HomeModule { }
