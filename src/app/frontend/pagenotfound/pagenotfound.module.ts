import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from "@angular/router";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PagenotfoundRoute } from "./pagenotfound.route";
import { PagenotfoundComponent } from './pagenotfound.component';

@NgModule({
  imports: [
    CommonModule,
    PagenotfoundRoute,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PagenotfoundComponent]
})
export class PagenotfoundModule { }
