import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipRouting } from "./mentorship-routing";
import { MentorshipComponent } from './mentorship.component';
import { MentorshipdetailsComponent } from './mentorshipdetails/mentorshipdetails.component';
import { UserService } from "../user/user.service";
import { ApplicationPipes } from "../../application-pipe.module";
//import { CeiboShare } from 'ng2-social-share';
import { SharedModule } from "../../components/shared.module";
@NgModule({
  imports: [
    CommonModule,
    MentorshipRouting,
    ApplicationPipes,
    SharedModule
  ],
  declarations: [
    MentorshipComponent, 
    MentorshipdetailsComponent,
    //CeiboShare
  ],
  providers: [UserService]
})
export class MentorshipModule { }
