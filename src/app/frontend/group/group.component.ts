import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../user/user.service";
import * as _ from "lodash";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupNameByUrl: string = '';
  public isloginUserId: any;
  public isUserLogin: any;
  public isGroupId = "";
  public groupDetailsData: any;

  //public groupPidData: object = { };
  public groupPostList = [];
  public groupMemberList = [];
  public groupallMemberList = [];
  public userFrndList = [];
  public requestGrpJoinList = [];
  public allgrupstatus: any;
  qtd = {};
  private IsShow: boolean = false;
  //public userPostList =[];
  public activeTab: string = 'activity';
  //public aboutActiveTab: string = 'overview';
  public successMsg: string = '';
  public errorMsg: string = '';
  public isJoinGroup: boolean = true;
  public allgroupstatusset = '';
  public loading = false;
  public groupPostDetData: object = {};

  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupNameByUrl = params['gname'];
    });
    this.getGroupDetailsByName();
  }

  public getGroupDetailsByName() {
    if (this.groupNameByUrl != '') {
      const dataUserDet = {
        "group_slug": this.groupNameByUrl
      };
      this.dataService.getGrpDetBySlug(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupDetailsData = data.GroupDetails[0];
            //console.log(this.groupDetailsData);
            this.isGroupId = data.GroupDetails[0].id;
            localStorage.setItem("groupAdmin", data.GroupDetails[0].user_id);
            this.groupPostDetData = { activitytype: '2', activityid: this.isGroupId };
            //this.groupPidData = { 'groupId': this.isGroupId};
            //console.log(this.groupPidData);
            //this.getUserPostDetails();
            this.getUserPostDetails();
            this.getGroupMemberList();
            this.checkMyFrndList();
          }
          else {
            this.router.navigateByUrl('/user/edit_profile/activity');

          }
        },
        error => {

        });
    }
  }
  
  public checkMyFrndList(){
    let grpOwnerId = localStorage.getItem("groupAdmin");
    if(this.isloginUserId==grpOwnerId){
      this.myFrndListforGrp();
    }else{
      this.myOwnFrndListforGrp();
    }
    //myOwnFrndListforGrp
  }
  /*public getUserPostDetails(){
    if(this.isGroupId!=''){
        let dataUserDet ={
          "user_id": this.isGroupId,
          "page_no": 1
        };
        this.dataService.getGroupPostListById(dataUserDet).subscribe(data => {
              let details=data;
              if (data.Ack=="1") {
                this.userPostList = details.AllPost;
              }
          },
          error => {
            
          }); 
    }
  }*/

  public getUserPostDetails() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "page_no": 1,
        "group_id": this.isGroupId,
        "type": '2'
      };
      this.dataService.getGroupPostById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupPostList = data.AllPost;
          }
        },
        error => {

        });
    }
  }

  public getGroupMemberList() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId
      };
      this.dataService.getGroupMemberListById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupMemberList = data.groupMembers;
            if (this.isUserLogin == '1') {
              let joinItemData = this.groupMemberList.filter(item => item.user_id == this.isloginUserId);
              if (joinItemData.length > 0) {
                this.isJoinGroup = false;
              }
              else {
                this.isJoinGroup = true;
              }
            }
          }
          //console.log(this.userFrndList);
        },
        error => {

        });

      this.dataService.getGroupRequestMemberListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.requestGrpJoinList = data.AllPendingGrouprequest;
        }
      },
        error => { });

      this.dataService.getGroupReqMemberListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.groupallMemberList = data.groupMembers;
          //alert(this.isUserLogin);
          let reqjoinItemData = this.groupallMemberList.filter(item => item.user_id == this.isloginUserId);
          if (reqjoinItemData.length > 0) {
            this.allgrupstatus = reqjoinItemData;
            this.allgroupstatusset = this.allgrupstatus[0].request_type;
          }
          else {
            this.allgroupstatusset = '';
          }

        }
      },
        error => { });

    }
  }

  public joinGroupRequest(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.joinGroupRequestByUser(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            this.successMsg = data.msg;
            this.getGroupMemberList();
            this.getGroupDetailsByName();
          } else {
            this.errorMsg = data.msg;
          }
          this.loading = false;
          //this.successMsg = 'You have successfully send the request.';
        },
        error => {

        });
    }
  }

  public LeaveGroupRequest(join_uid) { //alert(join_uid);
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.leaveGroup(dataUserDet).subscribe(data => {
          
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            this.successMsg = data.message;
            this.getGroupMemberList();
            this.getGroupDetailsByName();
          } else {
            this.errorMsg = data.message;
          }

          this.loading = false;
          //this.successMsg = 'You have successfully send the request.';
        },
        error => {

        });
    }
  }

  public CancelGroupRequest(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.cancelGroupRequestByUser(dataUserDet).subscribe(data => {
          //console.log(data);
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            //alert(data.message);
            this.successMsg = data.message;
            this.getGroupMemberList();
            this.getGroupDetailsByName();
          } else {
            this.errorMsg = data.message;
          }
          this.loading = false;
          //this.successMsg = 'You have successfully send the request.';
        },
        error => {

        });
    }
  }

  public myFrndListforGrp() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId,
        "group_id": this.isGroupId
      };
      //console.log(dataUserDet);
      this.dataService.getAllUserListforGrp(dataUserDet).subscribe(data => {
      //this.dataService.getUserGrpFrndListById(dataUserDet).subscribe(data => {
        if (data.Ack == "1") {
          this.userFrndList = data.groupMembersPrivate;
          //console.log(this.userFrndList);
        }
      }, error => {

      });
    }
  }

  public myOwnFrndListforGrp() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId,
        "group_id": this.isGroupId
      };
      //console.log(dataUserDet);
      this.dataService.getUserGrpFrndListById(dataUserDet).subscribe(data => {
        if (data.Ack == "1") {
          this.userFrndList = data.groupMembersPrivate;
          //console.log(this.userFrndList);
        }
      }, error => {

      });
    }
  }

  public inviteFrndAsGroupMember(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "reffer_id": this.isloginUserId,
        "user_id": join_uid
      };
      this.dataService.inviteMemberTojoinGroup(dataUserDet).subscribe(data => {
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        this.checkMyFrndList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }

  public addGroupMember(join_uid, index) {


    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.joinGroupMemberByAdmin(dataUserDet).subscribe(data => {
        //console.log(data);
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;

        if (this.groupDetailsData.group_type == "2") {
          this.qtd[join_uid] = true;
        }
        else {
          this.getGroupMemberList();
          this.checkMyFrndList();
        }

        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }

  public requestGroupAction(pid, type) {
    this.loading = true;
    if (pid != '') {
      const dataUserDet = {
        "id": pid,
        "request_type": type
      };
      this.dataService.responseGroupRequestByAdmin(dataUserDet).subscribe(data => {
        //console.log(data);
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        //this.getGroupMemberList();
        for (let i = 0; i < this.requestGrpJoinList.length; i++) {
          if (this.requestGrpJoinList[i].id == pid) {
            this.requestGrpJoinList[i].isPressed = true;
            if (type == "2") {
              this.requestGrpJoinList[i].text = "You have accepted the request."
            }
            else {
              this.requestGrpJoinList[i].text = "You have declined the request."
            }
            break;
          }
        }
        this.getGroupMemberList();
        this.router.navigateByUrl('/group/details/' + this.groupNameByUrl);
        //this.getGroupMemberList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
    
  }

  public toggleTab(data: any) {
    //console.log(data);
    this.activeTab = data;
    this.successMsg = '';
    this.errorMsg = '';
  }

}
