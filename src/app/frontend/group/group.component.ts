import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user/user.service";
import * as _ from "lodash";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupNameByUrl: string='';
  public isloginUserId:any;
  public isUserLogin:any;
  public isGroupId="";
  public groupDetailsData: object = { };
  //public groupPidData: object = { };
  public groupPostList = [];
  public groupMemberList = [];
  public userFrndList =[];
  public requestGrpJoinList =[];
  
  //public userPostList =[];
  public activeTab: string = 'activity';
  //public aboutActiveTab: string = 'overview';
  public successMsg: string ='';
  public errorMsg: string = '';
  public isJoinGroup:boolean = true;
  public loading = false;
  public groupPostDetData: object = { };
  
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
            this.groupPostDetData = { activitytype:'2', activityid:this.isGroupId };
            //this.groupPidData = { 'groupId': this.isGroupId};
            //console.log(this.groupPidData);
            //this.getUserPostDetails();
            this.getUserPostDetails();
            this.getGroupMemberList();
            this.myFrndListforGrp();
            
          }
        },
        error => {

        });
    }
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

        }
        );
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
            if(this.isUserLogin=='1'){
              let joinItemData=this.groupMemberList.filter(item => item.user_id == this.isloginUserId);
              //console.log(this.isloginUserId);
              if(joinItemData.length>0){
                this.isJoinGroup=false;
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
          }else{
            this.errorMsg = data.msg;
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
        "user_id": this.isloginUserId
      };
      this.dataService.getUserFrndListById(dataUserDet)
        .subscribe(data => {
          //console.log(details);
          if (data.Ack == "1") {
            this.userFrndList = data.FriendListById;

          } 
        },error => {

        });
    }
  }
  
  public addGroupMember(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid 
      };
      this.dataService.joinGroupMemberByAdmin(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            this.successMsg = data.msg;
          }else{
            this.errorMsg = data.msg;
          } 
          this.loading = false;
          this.getGroupMemberList();
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
          }else{
            this.errorMsg = data.msg;
          } 
          this.loading = false;
          this.router.navigateByUrl('/group/details/'+this.groupNameByUrl);
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
