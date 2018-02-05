import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TimeAgoPipe } from 'time-ago-pipe';
import { UserComponent } from './user.component';
import { UserRouting } from "./user-routing";
import { LoginComponent } from "./login/login.component";
import { UserService } from "./user.service";
import { ApplicationPipes } from "../../application-pipe.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SignupComponent } from './signup/signup.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { EqualValidator } from '../../validator.directive';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ChatComponent } from './chat/chat.component';
import { ChatListComponent } from './chat-list/chat-list.component';
import { SharedModule } from "../../components/shared.module";
import { ProfileComponent } from './profile/profile.component';
import { ShareyourstoryComponent } from './shareyourstory/shareyourstory.component';
import { MentorComponent } from './mentor/mentor.component';
import { NotificationComponent } from './notification/notification.component';
import { GroupChatComponent } from "./group-chat/chat.component";
import { AgmCoreModule } from '@agm/core';
import { SelectModule } from "../../../../node_modules/ng2-select";
import { DateTimePickerModule } from 'ngx-datetime-picker';

import {
  SocialLoginModule, 
  AuthServiceConfig,
  GoogleLoginProvider, 
  FacebookLoginProvider, 
  LinkedinLoginProvider
} from 'ng4-social-login';
import { AllphotoComponent } from './allphoto/allphoto.component';
import { TeamComponent } from './team/team.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { ActivationlinkComponent } from './activationlink/activationlink.component';
import { BrowsehubComponent } from './browsehub/browsehub.component';
import { HubsComponent } from './hubs/hubs.component';
import { CreatehubComponent } from './createhub/createhub.component';
import { GroupphotoComponent } from './groupphoto/groupphoto.component';
import { MycmplistComponent } from './mycmplist/mycmplist.component';
import { MyconnectionComponent } from './myconnection/myconnection.component';

const CONFIG = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('AIzaSyBuZJ4SSMACOsfR4GjjOICS2K-zp8nKyI4')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    //provider: new FacebookLoginProvider('150470825593599')
    provider: new FacebookLoginProvider('1504708255935990')
  },
  {
    id: LinkedinLoginProvider.PROVIDER_ID,
    provider: new LinkedinLoginProvider('8102vegvhysdby')
  }
]);

export function provideConfig() {
  return CONFIG;
}

@NgModule({
  imports: [
    CommonModule,
    UserRouting,
    FormsModule,
    ApplicationPipes,
    ReactiveFormsModule,
    SharedModule,
    SocialLoginModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#bb1926',
      secondaryColour: '#bb1926',
      tertiaryColour: '#ffffff'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDYFY2fp_meJiSEKve5pDJk9Kzr_oDOlPk'
    }),
    SelectModule,
    DateTimePickerModule
  ],
  declarations: [
    TimeAgoPipe,
    UserComponent,
    LoginComponent,
    SignupComponent,
    EqualValidator,
    DashboardComponent,
    ChatComponent, 
    ChatListComponent, 
    ProfileComponent,
    ShareyourstoryComponent, 
    MentorComponent, 
    NotificationComponent,
    GroupChatComponent,
    AllphotoComponent,
    TeamComponent,
    ForgotpasswordComponent,
    ActivationlinkComponent,
    BrowsehubComponent,
    HubsComponent,
    CreatehubComponent,
    GroupphotoComponent,
    MycmplistComponent,
    MyconnectionComponent
    //ImageCropperComponent
  ],
  providers: [
    UserService,
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
  exports: [CommonModule]
})
export class UserModule { }

