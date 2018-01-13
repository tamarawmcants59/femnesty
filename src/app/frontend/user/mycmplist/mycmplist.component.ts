import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params} from '@angular/router';
import { UserService } from "../user.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';

@Component({
  selector: 'app-mycmplist',
  templateUrl: './mycmplist.component.html',
  styleUrls: ['./mycmplist.component.css']
})
export class MycmplistComponent implements OnInit {
  public loading = false;
  public loginUserDet: Object = {};
  public userPostList = [];
  public userFrndList = [];
  prfImageData: any;
  coverImageData: any;

  postImgData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  constructor(private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router) {
     // const getUserDet = localStorage.getItem("currentUser");
    //this.loginUserDet = JSON.parse(getUserDet);

    //const getUserDet = localStorage.getItem("currentUser");
    //this.loginUserDet = JSON.parse(getUserDet);
    this.prfCropperSettings = new CropperSettings();
    this.prfCropperSettings.width = 200;
    this.prfCropperSettings.height = 200;
    this.prfCropperSettings.keepAspect = false;

    this.prfCropperSettings.croppedWidth = 250;
    this.prfCropperSettings.croppedHeight = 250;

    this.prfCropperSettings.canvasWidth = 500;
    this.prfCropperSettings.canvasHeight = 300;

    this.prfCropperSettings.minWidth = 200;
    this.prfCropperSettings.minHeight = 200;

    this.prfCropperSettings.rounded = true;
    this.prfCropperSettings.minWithRelativeToResolution = false;
    this.prfCropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.prfCropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.prfCropperSettings.noFileInput = true;

    this.prfImageData = {};

    this.coverCropperSettings = new CropperSettings();
    //this.cropperSettings.noFileInput = true;
    this.coverCropperSettings.width = 200;
    this.coverCropperSettings.height = 100;
    this.coverCropperSettings.croppedWidth = 900;
    this.coverCropperSettings.croppedHeight = 450;
    this.coverCropperSettings.canvasWidth = 600;
    this.coverCropperSettings.canvasHeight = 300;
    this.coverCropperSettings.noFileInput = true;
    this.coverCropperSettings.dynamicSizing = true;
    //this.coverCropperSettings.minWidth = 250;
    //this.coverCropperSettings.minHeight = 100;
    this.coverImageData = {};
     }

  ngOnInit() {
    this.getUserDetails();
    this.getUserPostDetails();
    this.getConnectionList();
  }

  public getConnectionList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "employee_id": loginUserId
      };
      this.dataService.getcompanylist(dataUserDet).subscribe(data => {
          const details = data;
          console.log(details);
          if (details.Ack == "1") {
            //console.log(details.companylist);
            this.userFrndList = details.companylist;
          } else {

          }
        },
        error => {

        });
    } else {
    }
  }

  public getUserDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "id": parseInt(loginUserId)
      };
      this.dataService.getUserDetById(dataUserDet)
        .subscribe(data => {
          const details = data;
          console.log(details);
          if (details.Ack == "1") {
            this.loginUserDet = details.UserDetails[0];
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }

  public getUserPostDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserPostById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userPostList = details.ActivePostByUser;
            //console.log(this.userPostList);
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }
}
