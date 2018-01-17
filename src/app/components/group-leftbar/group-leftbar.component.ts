import { Component, OnInit, Input } from '@angular/core';
import { NgZone } from "@angular/core";
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from "../../frontend/user/user.service";
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';

@Component({
  selector: 'app-group-leftbar',
  templateUrl: './group-leftbar.component.html',
  styleUrls: ['./group-leftbar.component.css']
})
export class GroupLeftbarComponent implements OnInit {

  /*public commentform: FormGroup;
  public IsloginUserId: any;
  public isLoggedIn: any;
  public postCmtId: any;
  //public postCmtDiv:boolean = false;
  public postCmtDiv: any = {};
  public postCmtLike: any = {};
  public postCmtHtml: string = '';
  public userPrfImgStr: string = '';
  public userNameStr: string = '';
  public getCurrentUser: any;
  public currentDate: Date = new Date();*/
  public isloginUserId: string = '';
  public isUserLogin: string = '';
  public userFrndList = [];
  public currentFireUserId: string;
  public onlineUserList = [];
  public firebasOnlineUserList: any;
  public HeaderNavCls: string = '';

  @Input() groupData: {
    id: number;
    user_id: number;
    slug: string;
    group_uname: string;
    group_name: string;
    short_desc: string;
    long_desc: string;
    status: string;
    first_name: string;
    last_name: string;
    name: string;
    profile_image: string;
    display_name: string;
    group_image: string;
    member_count: number;
    cdate: string;
  };

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    lc: NgZone,
    private afAuth: AngularFireAuth
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
    this.afAuth.authState.do(user => {
      if (user) {
        this.currentFireUserId = user.uid;
      }
    }).subscribe();

    window.onscroll = () => {
      //let st = window.pageYOffset;
      let st = (window.innerHeight + window.scrollY);
      let dir = '';
      if (st < document.body.scrollHeight-620) {
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

  ngOnInit() {
    //console.log(this.groupData);
    this.getConnectionList();
  }

  public getConnectionList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      let onlineUsersRef = firebase.database().ref('presence/');
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserFrndListById(dataUserDet).subscribe(data => {
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
    //this.router.navigate(['/']);
    this.router.navigateByUrl('/');
    //return false;
  }
}
