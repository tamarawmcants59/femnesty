import { Component, ElementRef, OnInit } from '@angular/core';
import { NgZone } from "@angular/core";
import { FrontendService } from "../frontend-app-header/frontend.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { forEach } from '@angular/router/src/utils/collection';

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
  public currentFireUserId: string;
  public onlineUserList = [];
  public firebasOnlineUserList: any;
  public HeaderNavCls: string = '';
  connectionsCount:any;
  constructor(
    private el: ElementRef,
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {
    this.userloggedIn = localStorage.getItem("isLoggedIn");
    const getUserDet = localStorage.getItem("currentUser");
    this.currentUserDet = JSON.parse(getUserDet);
    //console.log(this.currentUserDet);
    this.afAuth.authState.do(user => {
      if (user) {
        this.currentFireUserId = user.uid;
      }
    }).subscribe();

    window.onscroll = () => {
      //let st = window.pageYOffset;
      let st = (window.innerHeight + window.scrollY);
      //let clientHeight = document.getElementById('footerSec').clientHeight;
      //console.log('footer'+clientHeight);
      let dir = '';
      if (st < document.body.scrollHeight- 620) {
        dir = "fix-to-top";
      } else {
        dir = "";
      }
      //let mobHeight = (window.screen.height) + "px";
     
      lc.run(() => {
        this.HeaderNavCls = dir;
      });

    };
    
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
    this.getConnectionCount();
  }
getConnectionCount()
{
  const loginUserId = localStorage.getItem("loginUserId");
  this._service.getConnectionsCount({user_id:loginUserId}).subscribe(data => {
    const details = data;
    if (details.Ack == "1") {
      this.connectionsCount = details.FriendCount.count;
      //console.log(this.currentUserLoginDet);
    } else {

    }
  },
    error => {

    }
  );
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
      let onlineUsersRef = firebase.database().ref('presence/');
      const dataUserDet = {
        "user_id": loginUserId
      };
      this._service.getUserFrndListById(dataUserDet).subscribe(data => {
        const details = data;
        if (details.Ack == "1") {
          this.userFrndList = details.FriendListById;
          onlineUsersRef.on('value', (snapshot)=> {
            for (let key in snapshot.val()) {
                if (snapshot.val()[key].online && snapshot.val()[key].userid!=loginUserId) {
                  let onlineUserDet = details.FriendListById.filter(item => item.friend_id == snapshot.val()[key].userid);
                  let checkOnlineUserlist = this.onlineUserList.filter(item => item.friend_id == snapshot.val()[key].userid);
                  if(onlineUserDet.length>0 && checkOnlineUserlist.length==0){
                    //console.log(onlineUserDet[0]);
                    this.onlineUserList.push(onlineUserDet[0]);
                  }
                }
            }
          });

        } else {
        }

      },
        error => {
        });
    } else {
    }
    //console.log(this.onlineUserList);
  }

  public userLogout() {
    let usersRef = firebase.database().ref('presence/'+this.currentFireUserId);
    let connectedRef = firebase.database().ref('.info/connected');
    let fUserId = parseInt(localStorage.getItem("loginUserId"));
    connectedRef.on('value', function(snapshot) {
      usersRef.set({ online: false, userid:fUserId});
      //usersRef.onDisconnect().remove();
    });   

    firebase.auth().signOut().then(function() {
    }, function(error) {
    });

    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("loginUserId");
    localStorage.removeItem("groupAdmin");
    //this.router.navigate(['/']);
    this.router.navigateByUrl('/');
    //return false;
  }

}
