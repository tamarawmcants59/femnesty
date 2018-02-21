import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-groupphoto',
  templateUrl: './groupphoto.component.html',
  styleUrls: ['./groupphoto.component.css']
})
export class GroupphotoComponent implements OnInit {
  public groupNameByUrl: string='';
  public isloginUserId:any;
  public isUserLogin:any;
  public isGroupId="";
  public groupDetailsData: object = { };
  public groupImgList = [];
  public totaluserImgList = [];
  IsShowTopViewMore = false;
  private myListPageSize = 6;

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
        this.groupNameByUrl = params['gid'];
        this.getGroupDetailsByName();
    });
    
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
              this.getGroupPhotoList();
            }
          },
          error => {

          });
      }
  }

  public getGroupPhotoList(){
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "image_type":'2'
      };
      this.dataService.getGroupImgListById(dataUserDet).subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
              //this.groupImgList = data.AllImageByGroupId;

              if (data.AllImageByGroupId.length > 6) {
                this.IsShowTopViewMore = true;
                this.groupImgList = [];
                for (let i = 0; i < data.AllImageByGroupId.length; i++) {
                  if (this.groupImgList.length < 6) {
                    this.groupImgList.push(data.AllImageByGroupId[i]);
                  }
                }
              }
              else {
                this.IsShowTopViewMore = false;
                this.groupImgList = data.AllImageByGroupId;
              }
              this.totaluserImgList = data.AllImageByGroupId;
          } 
      },error => {

      });
    }
  }

  viewMore() {
    this.myListPageSize = this.myListPageSize + 6;
    this.groupImgList = [];
    if (this.totaluserImgList.length > this.myListPageSize) {
      this.IsShowTopViewMore = true;
    }
    else {
      this.IsShowTopViewMore = false;
    }
    for (let i = 0; i < this.myListPageSize; i++) {
      if (this.totaluserImgList[i]) {
        this.groupImgList.push(this.totaluserImgList[i]);
      }
    }
  }
}
