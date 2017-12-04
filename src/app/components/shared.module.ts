import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
//import { HttpClientModule, HttpClientJsonpModule } from '@angular/common/http';
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { SocialService } from '../frontend/socialhome/social.service';

import { UserSidebar } from "./user-sidebar/user-sidebar.component";
import { PostCardComponent } from './post-card/post-card.component';
import { PostCreateComponent } from './post-create/post-create.component';

import { ApplicationPipes } from "../application-pipe.module";
import { GroupCreateComponent } from './group-create/group-create.component';
import { UserPrfrsidebarComponent } from './user-prfrsidebar/user-prfrsidebar.component';
import { GroupLeftbarComponent } from './group-leftbar/group-leftbar.component';
import { GroupRightbarComponent } from './group-rightbar/group-rightbar.component';
import { CompanyRightbarComponent } from './company-rightbar/company-rightbar.component';
import { ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
//import { CeiboShare } from 'ng2-social-share';
import { CeiboShare } from 'ng2-social-share';

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
        CeiboShare
    ],
    imports: [
        CommonModule,
        RouterModule,
        FormsModule,
        ReactiveFormsModule,
        ApplicationPipes,
        //ShareButtonModule.forRoot(),
        //CeiboShare,
        NgbModule
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
        CeiboShare
    ],
    providers: [
        SocialService
    ]
})
export class SharedModule { }
