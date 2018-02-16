import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
//import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialService } from '../frontend/socialhome/social.service';
import { AgmCoreModule } from '@agm/core';

import { UserSidebar } from "./user-sidebar/user-sidebar.component";
import { PostCardComponent } from './post-card/post-card.component';
import { PostCreateComponent } from './post-create/post-create.component';

import { ApplicationPipes } from "../application-pipe.module";
import { GroupCreateComponent } from './group-create/group-create.component';
import { UserPrfrsidebarComponent } from './user-prfrsidebar/user-prfrsidebar.component';
import { OtherUserPrfrsidebarComponent } from './othet-user-prfrsidebar/other-user-prfrsidebar.component';
import { GroupLeftbarComponent } from './group-leftbar/group-leftbar.component';
import { GroupRightbarComponent } from './group-rightbar/group-rightbar.component';
import { CompanyRightbarComponent } from './company-rightbar/company-rightbar.component';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { EmojiPickerModule } from 'angular2-emoji-picker';
import { HubCreateComponent } from './hub-create/hub-create.component';
import { HubService } from "./hub-create/hub.service";
import { SelectModule } from "../../../node_modules/ng2-select";
import { Ng4GeoautocompleteModule } from "../../../node_modules/ng4-geoautocomplete";
//import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { PopupmodalComponent } from './post-card/popupmodal.component';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
// import { AmazingTimePickerModule } from 'amazing-time-picker';
// import { OwlDateTimeModule, OwlNativeDateTimeModule } from 'ng-pick-datetime';
import { DateTimePickerModule } from 'ngx-datetime-picker';
import { BetaRestrictionComponent } from './beta-restriction/beta-restriction.component';
import { PostListnerService } from './../service/post.listner.service';
import { AboutCompanyComponent } from './about-company/about-company.component';
@NgModule({ 
    declarations: [
        UserSidebar,
        PostCardComponent,
        PostCreateComponent,
        GroupCreateComponent,
        UserPrfrsidebarComponent,
        GroupLeftbarComponent,
        GroupRightbarComponent,
        CompanyRightbarComponent,
        ImageCropperComponent,
        HubCreateComponent,
       PopupmodalComponent,
       BetaRestrictionComponent,
       OtherUserPrfrsidebarComponent,
       AboutCompanyComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ApplicationPipes,
        EmojiPickerModule.forRoot(),
        NgbModule,
        SelectModule,
        Ng4GeoautocompleteModule.forRoot(),
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDYFY2fp_meJiSEKve5pDJk9Kzr_oDOlPk',
            libraries: ['places']
          }),
          DateTimePickerModule
    ],
    exports: [
        UserSidebar,
        PostCardComponent,
        PostCreateComponent,
        GroupCreateComponent,
        UserPrfrsidebarComponent,
        GroupLeftbarComponent,
        GroupRightbarComponent,
        CompanyRightbarComponent,
        ImageCropperComponent,
        HubCreateComponent,
        PopupmodalComponent,
        Ng4GeoautocompleteModule,
        BetaRestrictionComponent,
        OtherUserPrfrsidebarComponent,
        AboutCompanyComponent
    ],
    providers: [
        HubService,
        SocialService,
        PostListnerService
    ],
    entryComponents: [PopupmodalComponent]
})
export class SharedModule { }
