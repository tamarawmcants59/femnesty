import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//import { LoadingModule } from 'ngx-loading';
import { CommonModule, LocationStrategy, HashLocationStrategy } from "@angular/common";
import { Http,HttpModule } from "@angular/http";
//import { LocationStrategy, HashLocationStrategy } from '@angular/common';
//import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiService } from "./service/api.service";
import { JwtService} from "./service/jwt.service";
//import { TruncatePipe ,SafePipe} from './exponential-strength.pipe';
import { FrontendService } from "./components/frontend-app-header/frontend.service";
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
//import { UserSidebar } from "./components/user-sidebar";
// Import containers
import {
  //FullLayout,
  FrontendLayout
} from './containers';

const APP_CONTAINERS = [
  //FullLayout,
  FrontendLayout
]

// Import components
import {
  FrontendAppHeader,
  FrontendAppFooter
  //TruncatePipe,
  //SafePipe
} from './components';

const APP_COMPONENTS = [
  FrontendAppHeader,
  FrontendAppFooter
  //TruncatePipe,
  //SafePipe
]

// Import routing module
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS,
    //UserSidebar
    //TruncatePipe ,
    //SafePipe
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    //LoadingModule,
    HttpModule
     /*,
    ApiService*/
   
  ],
  exports:[],
  providers: [
      FrontendService,
      ApiService,
      JwtService, 
      AuthGuard, 
      AuthService, {
      provide: LocationStrategy,
      useClass: HashLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
