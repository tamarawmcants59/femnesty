import { Component, OnInit, Input,SimpleChanges,SimpleChange } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-group-rightbar',
  templateUrl: './group-rightbar.component.html',
  styleUrls: ['./group-rightbar.component.css']
})
export class GroupRightbarComponent implements OnInit {

  public isloginUserId: string = '';
  public isUserLogin: string = '';
  public isGroupId: string='';
  public groupMemberList = [];
  public groupImgList = [];
  private _name: string;

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
    private dataService: UserService
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnChanges(changes: SimpleChanges) {
    const name: SimpleChange = changes.groupPId;
    this._name = name.currentValue;
    if(this._name){
      this.setStoreId();
    }
  }
  setStoreId(){
      this.isGroupId=this._name
      this.getGroupPhotoList();
      this.getGroupMemberList();
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

  public getGroupPhotoList(){
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "image_type":'2',
        "count":"true"
      };
      this.dataService.getGroupImgListById(dataUserDet).subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
              this.groupImgList = data.AllImageByGroupId;
              //console.log(this.groupImgList);
          } 
      },error => {

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
              this.groupMemberList = data.groupMembers;
              console.log(this.groupMemberList);
          } 
      },error => {

      });
    }
  }

}

