import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from '../../auth.guard';
import { ChatComponent } from "./chat/chat.component";
import { ChatListComponent } from './chat-list/chat-list.component';
//import { FindfriendsComponent } from './findfriends/findfriends.component';
const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    data: {
      title: 'User Profile'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login'
    }
  },
  {
    path: 'signup',
    component: SignupComponent,
    data: {
      title: 'Signup'
    }
  },
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
    path: 'chat/list',
    canActivate: [AuthGuard],
    component: ChatListComponent,
    data: {
      title: 'Unread Messages'
    }
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent,
    data: {
      title: 'Chat'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
