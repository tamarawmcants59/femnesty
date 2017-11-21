import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupNameByUrl: string='';
  public isloginUserId:any;
  public isUserLogin:any;
  public isGroupId:any;
  public groupDetailsData: object = { };
  public groupPostList = [];
  public groupMemberList = [];
  public activeTab: string = 'activity';
  //public aboutActiveTab: string = 'overview';
  public successMsg: string ='';
  public errorMsg: string = '';
  
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
            this.getGroupPostDetails();
            this.getGroupMemberList();
          }
        },
        error => {

        });
    }
  }

  public getGroupPostDetails() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "page_no": 1,
        "group_id": this.isGroupId
      };
      this.dataService.getGroupPostById(dataUserDet)
        .subscribe(data => {
          console.log(data);
          if (data.Ack == "1") {
            this.groupPostList = data.ActivePostByUser;
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
          console.log(data);
          if (data.Ack == "1") {
            this.groupMemberList = data.groupMembers;
          } 
          //console.log(this.userFrndList);
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
