import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmpEditprofileComponent } from "./cmpeditprofile.component";
const routes: Routes = [
  {
    path: '',
    component: CmpEditprofileComponent,
    data: {
      title: 'Edit Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CmpeditprofileRouting { }
