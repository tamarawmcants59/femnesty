import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
@Component({
  selector: 'other-app-allphoto',
  templateUrl: './other-allphoto.component.html',
  styleUrls: ['./other-allphoto.component.css']
})
export class OtherAllphotoComponent implements OnInit {
  public otherProfileDet: any;
  public isloginUser: any;
  public isloginUserId: any;
  public loginUserDet: any;
  IsShowTopViewMore = false;
  private myListPageSize = 6;
  public userImgList = [];
  public totaluserImgList = [];
  constructor(private dataService: UserService) {
    this.isloginUserId = localStorage.getItem("otherProfileId");
    this.isloginUser = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.getUserDetails();
  }
  viewMore() {
    this.myListPageSize = this.myListPageSize + 6;
    this.userImgList = [];
    if (this.totaluserImgList.length > this.myListPageSize) {
      this.IsShowTopViewMore = true;
    }
    else {
      this.IsShowTopViewMore = false;
    }
    for (let i = 0; i < this.myListPageSize; i++) {
      if (this.totaluserImgList[i]) {
        this.userImgList.push(this.totaluserImgList[i]);
      }

    }
  }
  public getUserDetails() {
    const loginUserId = localStorage.getItem("otherProfileId");
    if (loginUserId != '') {
      const dataUserDet = {
        "id": parseInt(loginUserId)
      };
      this.dataService.getUserDetById(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.loginUserDet = details.UserDetails[0];
            if (this.loginUserDet.dob) {
              this.loginUserDet.dateOfBirth = new Date(this.loginUserDet.dob);
            }
          } else {

          }
          const dataUserDet = {
            "id": loginUserId
          };
          this.dataService.getUserImgListById(dataUserDet).subscribe(data => {
            //console.log(data);
            if (data.Ack == "1") {
              //this.userImgList = data.UserAllImageById;
              if (data.UserAllImageById.length > 6) {
                this.IsShowTopViewMore = true;
                this.userImgList = [];
                for (let i = 0; i < data.UserAllImageById.length; i++) {
                  if (this.userImgList.length < 6) {
                    this.userImgList.push(data.UserAllImageById[i]);
                  }
                }

              }
              else {
                this.IsShowTopViewMore = false;
                this.userImgList = data.UserAllImageById;
              }

              this.totaluserImgList = data.UserAllImageById;
              //console.log(this.groupMemberList);
            }
          }, error => {
          });
        },
        error => {

        }
        );
    } else {
    }

  }

}
