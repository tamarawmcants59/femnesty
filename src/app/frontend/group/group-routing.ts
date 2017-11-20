import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { GroupComponent } from "./group.component";
const routes: Routes = [
  {
    path: '',
    redirectTo: 'details/:gname',
  },
  {
    path: 'details/:gname',
    canActivate: [AuthGuard],
    component: GroupComponent,
    data: {
      title: 'Group Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class GroupRouting { }
