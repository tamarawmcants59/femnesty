import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SocialhomeComponent } from './socialhome.component';
import { SocialRouting } from "./social-routing";
import { SocialService } from "./social.service";
import { ApplicationPipes } from "../../application-pipe.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../components/shared.module";
import { UserService } from '../user/user.service';
import {RatingModule} from "ng2-rating";

@NgModule({
  imports: [
    CommonModule,
    RatingModule,
    SocialRouting,
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
  declarations: [SocialhomeComponent],
  providers: [SocialService, UserService]
})
export class SocialhomeModule { }
