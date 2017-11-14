import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
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
//import { DashboardComponent } from './dashboard/dashboard.component';
//import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    UserRouting,
    FormsModule,
    ApplicationPipes,
    ReactiveFormsModule,
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
    UserComponent,
    LoginComponent, 
    SignupComponent, 
    EqualValidator, 
    DashboardComponent, 
    //ImageCropperComponent
  ],
  providers: [UserService]
})
export class UserModule { }
