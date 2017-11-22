import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";
import { ProfileComponent } from "./profile/profile.component";
//import { EditprofileComponent } from "./editprofile/editprofile.component";
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    data: {
      title: 'Compant Signup'
    }
  },
  {
    path: 'profile',
    //canActivate: [AuthGuard],
    //component: DashboardComponent,
    data: {
      title: 'Company Profile'
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        loadChildren: './editprofile/editprofile.module#EditprofileModule',
      }
    ]
  }/*,
  {
    path: 'shareyourstory',
    canActivate: [AuthGuard],
    component: ShareyourstoryComponent,
    data: {
      title: 'Share your story'
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CompanyRouting { }
