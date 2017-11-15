import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
// import { LoadingModule } from 'ngx-loading';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
// import { LocationStrategy, HashLocationStrategy } from '@angular/common';
// import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { JwtService } from './service/jwt.service';
import * as firebase from 'firebase';

// import { TruncatePipe ,SafePipe} from './exponential-strength.pipe';
import { FrontendService } from './components/frontend-app-header/frontend.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
// import { UserSidebar } from "./components/user-sidebar";
// Import containers
import {
  FrontendLayout
} from './containers';

const APP_CONTAINERS = [
  FrontendLayout
];

// Import components
import {
  FrontendAppHeader,
  FrontendAppFooter
} from './components';

const APP_COMPONENTS = [
  FrontendAppHeader,
  FrontendAppFooter
];

const config = {
  apiKey: 'AIzaSyCBG0msyUgcLXPjSptsr-z6-wfPq9_fThM',
  authDomain: 'femnesty-natit.firebaseapp.com',
  databaseURL: 'https://femnesty-natit.firebaseio.com',
  projectId: 'femnesty-natit',
  storageBucket: 'femnesty-natit.appspot.com',
  messagingSenderId: '833178589421'
};
firebase.initializeApp(config);

// Import routing module
import { AppRoutingModule } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    ...APP_CONTAINERS,
    ...APP_COMPONENTS
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule
  ],
  exports: [],
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
