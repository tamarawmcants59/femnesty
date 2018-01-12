import { ChatListnerService } from './service/chat.listner.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule, LocationStrategy, HashLocationStrategy } from '@angular/common';
import { Http, HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { ApiService } from './service/api.service';
import { JwtService } from './service/jwt.service';
import * as firebase from 'firebase';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
//import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
//import { PopupmodalComponent } from './components/post-card/popupmodal.component';

// import { TruncatePipe ,SafePipe} from './exponential-strength.pipe';
import { FrontendService } from './components/frontend-app-header/frontend.service';
import { UserService } from './frontend/user/user.service';
import { AuthGuard } from './auth.guard';
import { AuthService } from './service/auth.service';
// import { UserSidebar } from "./components/user-sidebar";
// Import containers
//import {MatDialogModule} from '@angular/material/dialog';

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
    ...APP_COMPONENTS,
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    HttpModule,
    ReactiveFormsModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    AngularFireAuthModule, // imports firebase/auth, only needed for auth features
    NgbModule.forRoot(),
    FormsModule,
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    //MatDialogModule
    
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
    },
    ChatListnerService,
    UserService
  ],
  bootstrap: [AppComponent],
  //entryComponents: [PopupmodalComponent]
})
export class AppModule { }

//platformBrowserDynamic().bootstrapModule(AppModule);