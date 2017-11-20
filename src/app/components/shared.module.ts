import { NgModule } from '@angular/core';
import { RouterModule } from "@angular/router";
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SocialService } from '../frontend/socialhome/social.service';

import { UserSidebar } from "./user-sidebar/user-sidebar.component";
import { PostCardComponent } from './post-card/post-card.component';
import { PostCreateComponent } from './post-create/post-create.component';

import { ApplicationPipes } from "../application-pipe.module";
import { GroupCreateComponent } from './group-create/group-create.component';
import { UserPrfrsidebarComponent } from './user-prfrsidebar/user-prfrsidebar.component';
@NgModule({
    declarations: [
        UserSidebar,
        PostCardComponent,
        PostCreateComponent,
        GroupCreateComponent,
        UserPrfrsidebarComponent
    ],
    imports: [
        CommonModule, 
        RouterModule,
        FormsModule, 
        ReactiveFormsModule,
        ApplicationPipes
    ],
    exports: [
        UserSidebar,
        PostCardComponent,
        PostCreateComponent,
        GroupCreateComponent,
        UserPrfrsidebarComponent
    ],
    providers: [
        SocialService
    ]
})
export class SharedModule { }
