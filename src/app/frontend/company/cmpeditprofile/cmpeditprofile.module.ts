import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpeditprofileRouting } from "./cmpeditprofile-routing";
import { CmpEditprofileComponent } from "./cmpeditprofile.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../../components/shared.module";
import { UserService } from "../../user/user.service";
//import { NgxCropperModule } from 'ngx-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CmpeditprofileRouting,
    SharedModule,
    //NgxCropperModule,
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
    CmpEditprofileComponent,
    ImageCropperComponent
  ],
  providers:[UserService]
})
export class CmpeditprofileModule { }
