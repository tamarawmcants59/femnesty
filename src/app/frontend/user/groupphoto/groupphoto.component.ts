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
              this.groupImgList = data.AllImageByGroupId;
          } 
      },error => {

      });
    }
  }
}
