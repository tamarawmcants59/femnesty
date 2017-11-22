import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpeditprofileComponent } from './cmpeditprofile.component';
import { CmpeditprofileRouting } from "./cmpeditprofile-routing";

@NgModule({
  imports: [
    CommonModule,
    CmpeditprofileRouting
  ],
  declarations: [CmpeditprofileComponent]
})
export class CmpeditprofileModule { }
