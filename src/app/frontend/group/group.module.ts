import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GroupRouting } from "./group-routing";
import { GroupComponent } from './group.component';
import { ApplicationPipes } from "../../application-pipe.module";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from "../../components/shared.module";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { UserService } from "../user/user.service";

@NgModule({
  imports: [
    CommonModule,
    GroupRouting,
    FormsModule,
    ReactiveFormsModule,
    ApplicationPipes,
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
  declarations: [GroupComponent],
  providers: [UserService]
})
export class GroupModule { }
