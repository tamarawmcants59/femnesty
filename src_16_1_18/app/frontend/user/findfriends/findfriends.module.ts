import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FindfriendsComponent } from './findfriends.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../../components/shared.module";
import { FindfriendRouting } from "./findfriend-routing";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { ApplicationPipes } from "../../../application-pipe.module";

@NgModule({
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,
    FindfriendRouting,
    ApplicationPipes,
    LoadingModule.forRoot({
      animationType: ANIMATION_TYPES.wanderingCubes,
      backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
      backdropBorderRadius: '4px',
      primaryColour: '#bb1926', 
      secondaryColour: '#bb1926', 
      tertiaryColour: '#ffffff'
  })
  ],
  declarations: [FindfriendsComponent]
})
export class FindfriendsModule { }
