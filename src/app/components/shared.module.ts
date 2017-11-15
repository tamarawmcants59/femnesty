import { RouterModule } from "@angular/router";
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidebar } from "./user-sidebar/user-sidebar.component";
import { PostCardComponent } from './post-card/post-card.component';

@NgModule({
    declarations: [
        UserSidebar,
        PostCardComponent
    ],
    imports: [CommonModule, RouterModule],
    exports: [
        UserSidebar,
        PostCardComponent
    ],
})
export class SharedModule { }
