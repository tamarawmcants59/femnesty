import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { FindfriendsComponent } from "./findfriends.component";
const routes: Routes = [
  {
    path: '',
    component: FindfriendsComponent,
    data: {
      title: 'Find Friends'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FindfriendRouting { }
