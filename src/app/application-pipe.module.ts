import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TruncatePipe,SafePipe,DateFormatPipe,DateTimeFormatPipe } from "./exponential-strength.pipe";

//import { FrontendService } from "./components/frontend-app-header/frontend.service";
@NgModule({
  declarations: [
    TruncatePipe ,
    SafePipe,
    DateFormatPipe,
    DateTimeFormatPipe
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TruncatePipe ,
    SafePipe,
    DateFormatPipe,
    DateTimeFormatPipe
  ]
})
export class ApplicationPipes { }
