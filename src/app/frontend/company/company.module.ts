import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CompanyRouting } from "./company.rouiting";
import { SignupComponent } from './signup/signup.component';
import { CompanyService } from "./company.service";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProfileComponent } from './profile/profile.component';
import { LoadingModule, ANIMATION_TYPES } from 'ngx-loading';
import { SharedModule } from "../../components/shared.module";
//import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";

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
      tertiaryColour: '#ffffff',
      
    }),
    //Ng4GeoautocompleteModule.forRoot(),
        //MatDialogModule  
        
    SharedModule,  
  ],
  declarations: [SignupComponent, ProfileComponent],
  providers: [CompanyService]
})
export class CompanyModule { }
