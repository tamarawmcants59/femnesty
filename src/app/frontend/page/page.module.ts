import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRouting } from "./page-routing";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    PageRouting,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [PageComponent]
})
export class PageModule { }
