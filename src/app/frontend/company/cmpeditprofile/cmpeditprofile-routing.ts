import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CmpeditprofileComponent } from "./cmpeditprofile.component";
const routes: Routes = [
  {
    path: '',
    component: CmpeditprofileComponent,
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
