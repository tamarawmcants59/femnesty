import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SignupComponent } from "./signup/signup.component";
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    component: SignupComponent,
    data: {
      title: 'User Profile'
    }
  }/*,
  
  {
    path: 'find_friends',
    canActivate: [AuthGuard],
    //component: FindfriendsComponent,
    data: {
      title: 'Find Friends'
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        loadChildren: './findfriends/findfriends.module#FindfriendsModule',
      }
    ]
  },
  {
    path: 'profile',
    //canActivate: [AuthGuard],
    //component: DashboardComponent,
    data: {
      title: 'Profile'
    },
    children: [
      {
        path: '',
        canActivateChild: [AuthGuard],
        loadChildren: './editprofile/editprofile.module#EditprofileModule',
      }
    ]
  },
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
