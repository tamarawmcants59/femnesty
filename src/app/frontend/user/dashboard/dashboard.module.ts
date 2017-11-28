import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from '../dashboard/dashboard.component';
import {ImageCropperComponent, CropperSettings} from 'ng2-img-cropper';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    //ApplicationPipes,
    ReactiveFormsModule,
    
  ],
  declarations: [
    DashboardComponent,
    ImageCropperComponent
  ],
  providers: []
})
export class DashboardModule { }
