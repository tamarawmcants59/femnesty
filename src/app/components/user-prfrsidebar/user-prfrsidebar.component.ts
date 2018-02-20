import { Component, OnInit } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";
@Component({
  selector: 'app-user-prfrsidebar',
  templateUrl: './user-prfrsidebar.component.html',
  styleUrls: ['./user-prfrsidebar.component.css']
})
export class UserPrfrsidebarComponent implements OnInit {
  public loginUserId = "";
  public loginUserDetRight="";
  public userImgList = [];
  public userGrpList = [];
  public latestHubList = [];
  public totalLatestHubList = [];
  totalPageSize = 5;
  public IsShowViewMore = false;
  constructor(
    private dataService: UserService
  ) {
    this.loginUserId = localStorage.getItem("loginUserId");
    let localCurr= localStorage.getItem("currentUser");
    this.loginUserDetRight = JSON.parse(localCurr);
    //console.log(this.loginUserDetRight);
  }

  ngOnInit() {
    this.getLatestHub();
    this.getUserPhotoList();
    this.getUserGroupList();
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

}
