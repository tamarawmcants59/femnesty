import { Component, OnInit, Input, SimpleChanges, SimpleChange, ElementRef } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";
import { Router, ActivatedRoute, Params } from '@angular/router';
//import 'rxjs/add/operator/map';
import { environment } from '../../../environments/environment';

@Component({
  selector: 'app-group-rightbar',
  templateUrl: './group-rightbar.component.html',
  styleUrls: ['./group-rightbar.component.css']
})
export class GroupRightbarComponent implements OnInit {

  public groupNameByUrl: string = '';
  public isloginUserId: string = '';
  public isUserLogin: string = '';
  public isGroupId: string = '';
  public groupMemberList = [];
  public totalGroupMemberList = [];
  public groupImgList = [];
  public totlalGroupImgList = [];
  private _name: string;
  public memberViewAll: boolean = false;
  public showMemberDiv: boolean = false;
  public groupDetailsData1: any;
  public isJoinGroup: boolean = true;
  public repoUrl = '';
  //public myStyle={};
  //public memberHideClass:string='isHideDiv';

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
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    public elementRef: ElementRef
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
    this.repoUrl = environment.website_url + this.router.url;
  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.groupPId;
    if (name) {
      this._name = name.currentValue;
      if (this._name) {
        this.setStoreId();
      }
    }

  }
  setStoreId() {
    this.isGroupId = this._name
    this.getGroupPhotoList();
    this.getGroupMemberList();
    this.activatedRoute.params.subscribe((params: Params) => {
      console.log(params);
      //alert(params['gname']);
      if (params['gname'])
        this.groupNameByUrl = params['gname'];
      else
        this.groupNameByUrl = params['gid'];
      this.getGroupDetailsByName();
    });

  }

  get groupPId(): string {
    return this._name;
  }

  @Input()
  set groupPId(name: string) {
    this._name = name;
  }

  ngOnInit() {

    //console.log(this._name)
  }
  public getGroupDetailsByName() {
    //alert(this.groupNameByUrl);
    if (this.groupNameByUrl != '') {
      const dataUserDet = {
        "group_slug": this.groupNameByUrl
      };
      this.dataService.getGrpDetBySlug(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupDetailsData1 = data.GroupDetails[0];



          }
          else {


          }
        },
        error => {

        });
    }
  }

  public getGroupPhotoList() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "image_type": '2',
        "count": "true"
      };
      this.dataService.getGroupImgListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.groupImgList = [];
          this.totlalGroupImgList = data.AllImageByGroupId;
          if (data.AllImageByGroupId.length > 5) {

            for (let i = 0; i < data.AllImageByGroupId.length; i++) {
              if (this.groupImgList.length < 5) {
                this.groupImgList.push(data.AllImageByGroupId[i]);
              }

            }

          }
          else {
            this.groupImgList = data.AllImageByGroupId;
          }

          //console.log(this.groupImgList);
        }
      }, error => {

      });
    }
  }

  public getGroupMemberList() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId
      };
      this.dataService.getGroupMemberListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.totalGroupMemberList = data.groupMembers;
          // this.groupMemberList = data.groupMembers;
          this.groupMemberList = [];
          if (data.groupMembers.length > 12) {
            //if(data.groupMembers.length > 2){  
            this.memberViewAll = true;
            for (let i = 0; i < data.groupMembers.length; i++) {
              if (this.groupMemberList.length < 12) {
                this.groupMemberList.push(data.groupMembers[i]);
              }
            }
          }
          else {
            this.memberViewAll = false;
            this.groupMemberList = this.totalGroupMemberList;
          }

          if (this.isUserLogin == '1') {
            let joinItemData = this.groupMemberList.filter(item => item.user_id == this.isloginUserId);
            //console.log(this.isloginUserId);
            if (joinItemData.length > 0) {
              this.isJoinGroup = false;
            }
          }

          //console.log(this.groupMemberList);
        }
      }, error => {

      });
    }
  }
  deleteImg(data) {
    alert();
  }

  public showAllMember() {
    this.memberViewAll = false;
    this.showMemberDiv = true;
    localStorage.setItem("invitediv",'1');
    //this.groupMemberList = this.totalGroupMemberList;
    window.location.reload();
  }
}

export declare class FacebookParams {
  u: string;
}

export class GooglePlusParams {
  url: string
}

export class LinkedinParams {
  url: string
}

export declare class PinterestParams {
  url: string;
  media: string;
  description: string;
}

export class TwitterParams {
  text: string;
  url: string;
  hashtags: string;
  via: string;
}