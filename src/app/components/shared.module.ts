import { RouterModule } from "@angular/router";
//import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FormsModule} from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserSidebar } from "./user-sidebar/user-sidebar.component";

@NgModule({
    declarations:[
        UserSidebar
    ],
    imports: [CommonModule, RouterModule],
    exports:[
        UserSidebar
    ],

})
export class SharedModule{

}