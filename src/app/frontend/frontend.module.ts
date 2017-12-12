import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ApplicationPipes } from "../application-pipe.module";
import { FrontendRoute  } from "./frontend.route";
import { HomeComponent } from "./home/home.component";
import { FrontendComponent } from "./frontend.component";
import { SearchComponent } from './search/search.component';
import { SharedModule } from "../components/shared.module";
import { CorporateComponent } from './corporate/corporate.component';
import { AdvisoryComponent } from './advisory/advisory.component';
@NgModule({
  imports: [
    FrontendRoute,
    SharedModule,
    CommonModule,
    ApplicationPipes
  ],
  //exports:[TruncatePipe, SafePipe],
  declarations: [
    HomeComponent, 
    FrontendComponent, 
    SearchComponent, CorporateComponent, AdvisoryComponent, 
    //TruncatePipe, 
    //SafePipe
  ],providers:[]
})

export class FrontendModule {
  
}
