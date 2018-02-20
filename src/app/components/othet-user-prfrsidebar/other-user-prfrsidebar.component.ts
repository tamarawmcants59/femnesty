import { Component, OnInit } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";
@Component({
  selector: 'app-other-user-prfrsidebar',
  templateUrl: './other-user-prfrsidebar.component.html',
  styleUrls: ['./other-user-prfrsidebar.component.css']
})
export class OtherUserPrfrsidebarComponent implements OnInit {
  public loginUserId = "";
  public userImgList = [];
  public userGrpList = [];
  public latestHubList = [];
  public totalLatestHubList = [];
  totalPageSize = 5;
  public IsShowViewMore = false;
  public get_value:object={};
  public is_friend:any;
  public isloginUserId:any;
  constructor(
    private dataService: UserService
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.loginUserId = localStorage.getItem("otherProfileId");
    this.is_friend = localStorage.getItem("is_friend");
  }

  ngOnInit() { 
    this.getLatestHub();
    this.getUserPhotoList();
    this.getUserGroupList();
    this.get_privacy_setting();
  }

  public getUserPhotoList() { 
    if (this.loginUserId != '') {
      const dataUserDet = {
        "id": this.loginUserId
      };
      this.dataService.getUserImgListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.userImgList = data.UserAllImageById;
          //console.log(this.groupMemberList);
        }
      }, error => {
      });
    }
  }

  public getUserGroupList() {
    if (this.loginUserId != '') {
      const dataUserDet = {
        "user_id": this.loginUserId
      };
      this.dataService.getUseAllGroupListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.userGrpList = data.GroupListByuserID;
          //console.log(this.groupMemberList);
        }
      }, error => {

      });
    }
  }
  viewMore() {
    this.totalPageSize = this.totalPageSize + 5;
    this.latestHubList = [];
    if (this.totalLatestHubList.length > this.totalPageSize) {
      this.IsShowViewMore = true;
    }
    else {
      this.IsShowViewMore = false;
    }
    for (let i = 0; i < this.totalPageSize; i++) {
      if (this.totalLatestHubList[i]) {
        this.latestHubList.push(this.totalLatestHubList[i]);
      }

    }
  }
  public getLatestHub() { 
    this.dataService.getLatestHubs(this.loginUserId).subscribe(data => {
      if (data.Ack == "1") { 
        this.totalLatestHubList = data.details;
        //alert(JSON.stringify( this.totalLatestHubList))
        if (data.details.length > 5) {
          this.IsShowViewMore = true;
          this.latestHubList = [];
          for (let i = 0; i < data.details.length; i++) {
            if (this.latestHubList.length < 5) {
              this.latestHubList.push(data.details[i]);
            }
          }

        }
        else {
          this.IsShowViewMore = false;
          this.latestHubList = this.totalLatestHubList;
        }
       
        //  this.latestHubList = data.details2;
        //console.log(this.groupMemberList);
      }
    }, error => {

    });
  }

  public get_privacy_setting(){ 
    // const loginUserId = localStorage.getItem("loginUserId");
    // alert(loginUserId)
    
     const dataUserDet = {
       "id": this.loginUserId,
       
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
