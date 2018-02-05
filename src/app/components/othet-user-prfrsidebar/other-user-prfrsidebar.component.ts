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
  constructor(
    private dataService: UserService
  ) {
    this.loginUserId = localStorage.getItem("otherProfileId");
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
        this.totalLatestHubList = data.details2;
        if (data.details2.length > 5) {
          this.IsShowViewMore = true;
          this.latestHubList = [];
          for (let i = 0; i < data.details2.length; i++) {
            if (this.latestHubList.length < 5) {
              this.latestHubList.push(data.details2[i]);
            }
          }

        }
        else {
          this.IsShowViewMore = false;
          this.latestHubList = data.ActiveGroupList;
        }
        //  this.latestHubList = data.details2;
        //console.log(this.groupMemberList);
      }
    }, error => {

    });
  }

}
