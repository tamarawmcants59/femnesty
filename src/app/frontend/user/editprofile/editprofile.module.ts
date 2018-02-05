import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditprofileComponent } from './editprofile.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
//import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { EditprofileRouting } from "./editprofile-routing";
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../../components/shared.module";
import { ApplicationPipes } from "../../../application-pipe.module";
import { DateTimePickerModule } from 'ngx-datetime-picker';
@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    EditprofileRouting,
    SharedModule,
    ApplicationPipes,
    LoadingModule.forRoot({
        animationType: ANIMATION_TYPES.wanderingCubes,
        backdropBackgroundColour: 'rgba(0,0,0,0.1)', 
        backdropBorderRadius: '4px',
        primaryColour: '#bb1926', 
        secondaryColour: '#bb1926', 
        tertiaryColour: '#ffffff'
    }),
    DateTimePickerModule
  ],
  declarations: [
    EditprofileComponent
    //ImageCropperComponent
  ]
})
export class EditprofileModule { }
