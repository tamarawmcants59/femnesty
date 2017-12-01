import { Component, ElementRef, OnInit } from '@angular/core';
import { NgZone } from "@angular/core";
import { FrontendService } from "../frontend-app-header/frontend.service";
import { Router, ActivatedRoute } from '@angular/router';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html'
})
export class UserSidebar implements OnInit {
  public userloggedIn: string = '';
  public currentUserDet: Object = {};
  public currentUserLoginDet: Object = {};
  public unreadMessages: number = 0;
  public userFrndList = [];
  constructor(
    private el: ElementRef,
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService,
    private db: AngularFirestore
  ) {
    this.userloggedIn = localStorage.getItem("isLoggedIn");
    const getUserDet = localStorage.getItem("currentUser");
    this.currentUserDet = JSON.parse(getUserDet);
    //console.log(this.currentUserDet);
  }

  ngOnInit(): void {
    //console.log(currentUserDet);
    //localStorage.removeItem("isLoggedIn");
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    this.getUserDetails();
    this.getConnectionList();

    //firebase.auth().getOnlineUserCount();
    /*firebase.auth().onAuthStateChanged(function(user) {
      if (user) {
        //console.log(user);

        



        // User is signed in.
      } else {
        // No user is signed in.
      }
    });*/
    
  }

  public getUserDetails() {
    const loginUserId = parseInt(localStorage.getItem("loginUserId"), 0) || 0;
    if (loginUserId != 0) {
      const dataUserDet = {
        "id": loginUserId
      };
      this.getUnreadMessageCount(loginUserId);
      this._service.getUserDetById(dataUserDet).subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.currentUserLoginDet = details.UserDetails[0];
            //console.log(this.currentUserLoginDet);
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }

  getUnreadMessageCount(user_id: number) {
    const messages = this.db.collection('Messages', ref => {
      return ref.where('to_user_id', '==', user_id).where('is_read', '==', false);
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    messages.subscribe(message => {
      this.unreadMessages = message.length;
    });
  }

  public getConnectionList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId
      };
      this._service.getUserFrndListById(dataUserDet).subscribe(data => {
          const details = data;
          //console.log(details);
          // let SuccessPageData = details.ContentAllBySlug;
          // SuccessPageData = SuccessPageData.filter(item => item.id == 1);
          if (details.Ack == "1") {
            this.userFrndList = details.FriendListById;
          } else {
          }
        },
        error => {
        });
    } else {
    }
  }

  public userLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("loginUserId");
    //this.router.navigate(['/']);
    this.router.navigateByUrl('/');
    //return false;
  }

}
