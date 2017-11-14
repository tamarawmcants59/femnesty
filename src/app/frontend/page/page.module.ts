import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageComponent } from './page.component';
import { PageRouting } from "./page-routing";

@NgModule({
  imports: [
    CommonModule,
    PageRouting
  ],
  declarations: [PageComponent]
})
export class PageModule { }
