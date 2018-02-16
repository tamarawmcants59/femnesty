import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userNameByUrl: string='';
  public isloginUserId:any;
  public otherProfileDet:any;
  public otherProfileId:any;
  public isloginUser:any;
  public userPostList = [];
  public userFrndList = [];
  public userGroupList =[];
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'overview';
  public successMsg: string ='';
  public errorMsg: string = '';
  public checkIsFriend:boolean = false;
  public sendrequest = false;
  public get_value:object={};
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.isloginUserId = localStorage.getItem("loginUserId");
      this.isloginUser = localStorage.getItem("isLoggedIn");
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.userNameByUrl = params['uname'];
    });
    localStorage.setItem("groupAdmin", '');
    this.getUserDetailsByUname();
  }

  public getUserDetailsByUname() {
    if (this.userNameByUrl != '') {
      const dataUserDet = {
        "display_name": this.userNameByUrl
      };
      this.dataService.getUserDetByUname(dataUserDet)
        .subscribe(data => {
         //console.log(data);
          if (data.Ack == "1") {
            this.otherProfileDet = data.UserDetails[0];
            //console.log(this.otherProfileDet.id);
            this.otherProfileId = this.otherProfileDet.id;
            localStorage.setItem("otherProfileId",this.otherProfileId);
            this.getUserPostDetails();
            this.getConnectionList();
            this.checkMyFrndData();
            this.getUserGroupList();
            this.get_privacy_setting();
          }
        },
        error => {

        });
    }
  }
  
  public checkMyFrndData() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '' && this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId, "friend_id": this.otherProfileId
      };
      this.dataService.getUserIsMyFrnd(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.msg == "Friend" && details.Ack == "1") {
            this.checkIsFriend = true;
            localStorage.setItem("is_friend",'1');
          }else{
            this.checkIsFriend = false;
            localStorage.setItem("is_friend",'0');
          }
         
        },
        error => {

        }
        );
    }
  }

  public getUserPostDetails() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "user_id": this.otherProfileId,
        "login_id": this.isloginUserId
      };
      this.dataService.getUserPostById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userPostList = details.ActivePostByUser;
          }
        },
        error => {

        }
        );
    }
  }

  public getConnectionList() {
      if (this.otherProfileId != '') {
        const dataUserDet = {
          "user_id": this.otherProfileId
        };
        this.dataService.getUserFrndListById(dataUserDet)
          .subscribe(data => {
            const details = data;
            if (details.Ack == "1") {
              this.userFrndList = details.FriendListById;
            } 
            //console.log(this.userFrndList);
          },
          error => {

          });
      }
    }

    public getUserGroupList() {
      if (this.otherProfileId != '') {
        const dataUserDet = {
          "user_id": this.otherProfileId
        };
        this.dataService.getUseAllGroupListById(dataUserDet).subscribe(data => {
            if (data.Ack == "1") {
              //console.log(data);
                this.userGroupList = data.GroupListByuserID;
            } 
        },error => {
  
        });
      }
    }

    public toggleTab(data: any) {
      //console.log(data);
      this.activeTab = data;
      this.successMsg = '';
      this.errorMsg = '';
    }
  
    public aboutToggleTab(data: any) {
      this.successMsg = '';
      this.errorMsg = '';
      this.aboutActiveTab = data;
    }

    public sendFriendRequest(friend_id) {
      this.sendrequest = true;
      //console.log(friend_id);
      if (this.isloginUserId != '' && friend_id != '') {
        let requestJsonData={"user_id": this.isloginUserId, "friend_id": friend_id};
        this.dataService.sendFrndRequest(requestJsonData)
          .subscribe(
            data => {
                if(data.Ack==1){
                  this.successMsg='Connection request Sent';
                }else{
                  this.errorMsg='You have already send the friend request';
                }
            },
          error => {
            alert(error);
          });
      }else{
        this.router.navigateByUrl('/user/login');
      }
    }
    public get_privacy_setting(){ 
     // const loginUserId = localStorage.getItem("loginUserId");
     // alert(loginUserId)
     
      const dataUserDet = {
        "id": this.otherProfileId,
        
      };
     this.dataService.getuserPrivacy(dataUserDet)
            .subscribe(data => {
              console.log(data)
              if(data.Ack == 1)
              { 
                this.get_value = data.user_privacy;
                
                
              }
              else{ 
                this.get_value = {
                  "name_visible": "1",
                 "name_visible_in_search_engine": "1",
                  "found_email_address": "1",
                  "found_phone_number": "1",
                   "profile_picture_picture":"1",
                 "dob_visible": "1",
                  "email_visible": "1",
                   "phone_visible": "1",
                  "allow_connetion":"1",
                 "all_post":"1",
                  "group_visible":"1",
                   "hub_visible": "1",
                   "photo_visible":"1",
                   "see_connection_list":"1",
                   "name_visible_book_review": "1"
                };
              }
              
            },
            error => {
              //this.loading = false;
            }
            );
    }

}
