import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MentorshipComponent } from "./mentorship.component";
import { MentorshipdetailsComponent } from "./mentorshipdetails/mentorshipdetails.component";

const routes: Routes = [
  {
    path: '',
    component: MentorshipComponent,
    data: {
      title: 'Mentorship List'
    }
  },
  {
    path: 'details/:id',
    component: MentorshipdetailsComponent,
    data: {
      title: 'Mentorship Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MentorshipRouting { }
