import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupComponent } from './group.component';
import { GroupRouting } from "./group-routing";

@NgModule({
  imports: [
    CommonModule,
    GroupRouting
  ],
  declarations: [GroupComponent]
})
export class GroupModule { }
