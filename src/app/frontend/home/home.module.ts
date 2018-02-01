import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import {RatingModule} from "ng2-rating";
@NgModule({
  imports: [
    CommonModule,
    RatingModule
  ],
  declarations: [HomeComponent]
})
export class HomeModule { 
  
}
