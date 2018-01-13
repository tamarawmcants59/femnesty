import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TruncatePipe,SafePipe,DateFormatPipe,DateTimeFormatPipe } from "./exponential-strength.pipe";
import { CeiboShare } from 'ng2-social-share';
// import { ShareModule } from '@ngx-share/core';
//import { FrontendService } from "./components/frontend-app-header/frontend.service";
@NgModule({
  declarations: [
    TruncatePipe ,
    SafePipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    CeiboShare,
    //ShareModule
  ],
  imports: [
    CommonModule,
    //ShareModule
  ],
  exports:[
    TruncatePipe ,
    SafePipe,
    DateFormatPipe,
    DateTimeFormatPipe,
    CeiboShare,
    //ShareModule
  ]
})
export class ApplicationPipes { }
