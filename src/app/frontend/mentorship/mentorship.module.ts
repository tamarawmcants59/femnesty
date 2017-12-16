import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MentorshipRouting } from "./mentorship-routing";
import { MentorshipComponent } from './mentorship.component';
import { MentorshipdetailsComponent } from './mentorshipdetails/mentorshipdetails.component';
import { UserService } from "../user/user.service";
import { CeiboShare } from 'ng2-social-share';

@NgModule({
  imports: [
    CommonModule,
    MentorshipRouting
  ],
  declarations: [
    MentorshipComponent, 
    MentorshipdetailsComponent,
    CeiboShare
  ],
  providers: [UserService]
})
export class MentorshipModule { }
