import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CmpeditprofileRouting } from "./cmpeditprofile-routing";
import { CmpEditprofileComponent } from "./cmpeditprofile.component";

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../../components/shared.module";
import { UserService } from "../../user/user.service";
//import { ApplicationPipes } from "../../../application-pipe.module";
//import { NgxCropperModule } from 'ngx-cropper';
import {  SelectModule } from "../../../../../node_modules/ng2-select";
//import { Ng4GeoautocompleteModule } from "../../../../../node_modules/ng4-geoautocomplete";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CmpeditprofileRouting,
    SharedModule,
    SelectModule,
    //NgxCropperModule,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#bb1926', 
        secondaryColour: '#bb1926', 
        tertiaryColour: '#ffffff'
    }),
    //Ng4GeoautocompleteModule.forRoot(),
        //MatDialogModule  
        
  ],
  declarations: [
    CmpEditprofileComponent,
    //ImageCropperComponent
  ],
  providers:[UserService]
})
export class CmpeditprofileModule { }
