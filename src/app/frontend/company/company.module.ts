import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRouting } from "./company.rouiting";
import { SignupComponent } from './signup/signup.component';
import { CompanyService } from "./company.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { EditprofileComponent } from './editprofile/editprofile.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../components/shared.module";
@NgModule({
  imports: [
    CommonModule,
    CompanyRouting,
    FormsModule,
    ReactiveFormsModule,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)',
      backdropBorderRadius: '4px',
      primaryColour: '#bb1926',
      secondaryColour: '#bb1926',
      tertiaryColour: '#ffffff'
    }),
    SharedModule
  ],
  declarations: [SignupComponent, ProfileComponent, EditprofileComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
