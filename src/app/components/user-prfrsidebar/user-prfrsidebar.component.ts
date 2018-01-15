import { Component, OnInit } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";

@Component({
  selector: 'app-user-prfrsidebar',
  templateUrl: './user-prfrsidebar.component.html',
  styleUrls: ['./user-prfrsidebar.component.css']
})
export class UserPrfrsidebarComponent implements OnInit {
  public loginUserId = "";
  public userImgList =[];
  public userGrpList =[];
  public latestHubList = [];
  constructor(
    private dataService: UserService
  ) { 
    this.loginUserId = localStorage.getItem("loginUserId");
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
      },error => {
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
      },error => {

      });
    }
  }

  public getLatestHub()
  {
    this.dataService.getLatestHubs(this.loginUserId).subscribe(data => {
      //console.log(data);
      if (data.Ack == "1") {
        this.latestHubList = data.details;
        //console.log(this.groupMemberList);
      }
    }, error => {

    });
  }

}
