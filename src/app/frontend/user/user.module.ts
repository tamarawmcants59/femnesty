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
//import { DashboardComponent } from './dashboard/dashboard.component';
//import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    UserRouting,
    FormsModule,
    ApplicationPipes,
    ReactiveFormsModule,
    SharedModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#bb1926',
      secondaryColour: '#bb1926',
      tertiaryColour: '#ffffff'
    })
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
    GroupChatComponent
    //ImageCropperComponent
  ],
  providers: [UserService],
  exports: [CommonModule]
})
export class UserModule { }
