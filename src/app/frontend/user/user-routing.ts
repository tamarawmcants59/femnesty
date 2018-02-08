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
import { NotificationComponent } from "./notification/notification.component";
import { GroupChatComponent } from "./group-chat/chat.component";
import { AllphotoComponent } from "./allphoto/allphoto.component";
import { TeamComponent } from './team/team.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ActivationlinkComponent } from './activationlink/activationlink.component';
import { BrowsehubComponent } from './browsehub/browsehub.component';
import { HubsComponent } from './hubs/hubs.component';
import { CreatehubComponent } from "./createhub/createhub.component";
import { GroupphotoComponent } from './groupphoto/groupphoto.component';
import { MycmplistComponent } from "./mycmplist/mycmplist.component";
import { MyconnectionComponent } from './myconnection/myconnection.component';
import {OtherAllphotoComponent} from './other-allphoto/other-allphoto.component';

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
    path: 'forgotpassword',
    component: LoginComponent,
    data: {
      title: 'Forgot Password'
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
    path: 'forgot_password/:uid',
    component: ForgotpasswordComponent,
    data: {
      title: 'Forgot Password'
    }
  },
  {
    path: 'group_all_photo/:gid',
    component: GroupphotoComponent,
    data: {
      title: 'Group All Photos'
    }
  },
  {
    path: 'account_verification/:uid',
    component: ActivationlinkComponent,
    data: {
      title: 'Account Verification'
    }
  },
  {
    path: 'team',
    component: TeamComponent,
    data: {
      title: 'Team'
    }
  },
  {
    path: 'hub_details/:slug',
    canActivate: [AuthGuard],
    component: HubsComponent,
    data: {
      title: 'Hub Details'
    }
  },
  {
    path: 'create_hub/:slug',
    canActivate: [AuthGuard],
    component: CreatehubComponent,
    data: {
      title: 'Create Hub'
    }
  },
  {
    path: 'hubs',
    canActivate: [AuthGuard],
    component: BrowsehubComponent,
    data: {
      title: 'Hubs'
    }
  },
  {
    path: 'myconnection',
    canActivate: [AuthGuard],
    component: MyconnectionComponent,
    data: {
      title: 'My connections'
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
    path: 'edit_profile/:type',
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
    path: 'all_photo',
    canActivate: [AuthGuard],
    component: AllphotoComponent,
    data: {
      title: 'All Photo'
    }
  },
  {
    path: 'other_all_photo',
    canActivate: [AuthGuard],
    component: OtherAllphotoComponent,
    data: {
      title: 'All Photo'
    }
  },
  {
    path: 'groupchat/:groupId',
    canActivate: [AuthGuard],
    component: GroupChatComponent,
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
    path: 'connections',
    canActivate: [AuthGuard],
    redirectTo: 'profile',
    data: {
      title: 'Connection'
    }
  },
  {
    path: 'group',
    canActivate: [AuthGuard],
    redirectTo: 'profile',
    data: {
      title: 'Group'
    }
  },
  {
    path: 'notification',
    canActivate: [AuthGuard],
    component: NotificationComponent,
    data: {
      title: 'Notification List'
    }
  },
  {
    path: 'shareyourstory',
    // canActivate: [AuthGuard],
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
  },
  {
    path: 'mycmplist',
    component: MycmplistComponent,
    data: {
      title: 'mycmplist'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRouting { }
