import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../auth.guard';
import { GroupComponent } from "./group.component";
import { GrouplistComponent } from './grouplist/grouplist.component';
const routes: Routes = [
  {
    path: '',
    component: GrouplistComponent,
    canActivate: [AuthGuard],
    data: {
      title: 'Group List'
    }
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
