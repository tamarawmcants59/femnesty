import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditprofileComponent } from "./editprofile.component";
const routes: Routes = [
  {
    path: '',
    component: EditprofileComponent,
    data: {
      title: 'Edit Profile'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditprofileRouting { }
