import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";
import { TruncatePipe,SafePipe } from "./exponential-strength.pipe";
//import { FrontendService } from "./components/frontend-app-header/frontend.service";
@NgModule({
  declarations: [
    TruncatePipe ,
    SafePipe,
    //FrontendService
  ],
  imports: [
    CommonModule
  ],
  exports:[
    TruncatePipe ,
    SafePipe
  ]
})
export class ApplicationPipes { }
