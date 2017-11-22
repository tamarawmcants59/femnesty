import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserComponent } from './user.component';
import { LoginComponent } from "./login/login.component";
import { SignupComponent } from "./signup/signup.component";
import { DashboardComponent } from "./dashboard/dashboard.component";
import { AuthGuard } from '../../auth.guard';
import { ChatComponent } from "./chat/chat.component";
import { ChatListComponent } from './chat-list/chat-list.component';
import { ProfileComponent } from "./profile/profile.component";
import { ShareyourstoryComponent } from "./shareyourstory/shareyourstory.component";
import { MentorComponent } from "./mentor/mentor.component";
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
    path: 'profile/:uname',
    //canActivate: [AuthGuard],
    component: ProfileComponent,
    data: {
      title: 'Other Profile'
    }
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
    path: 'chat/:userId',
    canActivate: [AuthGuard],
    component: ChatComponent,
    data: {
      title: 'Messages'
    }
  },
  {
    path: 'chat',
    canActivate: [AuthGuard],
    component: ChatComponent,
    data: {
      title: 'Chat'
    }
  },
  {
    path: 'shareyourstory',
    canActivate: [AuthGuard],
    component: ShareyourstoryComponent,
    data: {
      title: 'Share your story'
    }
  },
  {
    path: 'mentor',
    component: MentorComponent,
    data: {
      title: 'Mentor'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
