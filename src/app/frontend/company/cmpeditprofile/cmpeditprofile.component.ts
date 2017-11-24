import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from "../company.service";
//import { UserService } from "../../user/user.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';


@Component({
  selector: 'app-cmpeditprofile',
  templateUrl: './cmpeditprofile.component.html',
  styleUrls: ['./cmpeditprofile.component.css']
})
export class CmpEditprofileComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'overview';
  public showImgDive: boolean = false;  
  public showCoverImgDive: boolean = false;
  public showPostImgDive: boolean = false;
  public form: FormGroup;
  public adminform: FormGroup;

  returnUrl: string;
  errorMsg: string = '';
  successMsg: string = '';
  public loading = false;
  public loginUserDet: object = { };
  public userPostList = [];
  public userFrndList = [];
  public userRequestList = [];
  public userEmployeeList = [];
  public userFollowerList = [];
  public cmpSubadminList = [];
  public cmpId ='';

  prfImageData: any;
  coverImageData: any;
  postImgData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  public groupPostDetData: object = { };
  public checkEmailExist:boolean = false;

  constructor(
    private builder: FormBuilder,
    private dataService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //super();
    const getUserDet = localStorage.getItem("currentUser");
    this.loginUserDet = JSON.parse(getUserDet);
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

    this.form = builder.group({
      company_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      
      mobile_number: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
			/*dob: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],
			country: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],*/
      state: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      city: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      address: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      website: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      opening_hour: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      
      bio: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]

    });

    this.adminform = builder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]],
      txt_password: ['', [
        Validators.required
      ]],
			name: ['', [
        Validators.required
      ]],
			state: ['', [ ]],
			city: ['', [ ]],
			address: ['', [ ]]

    });
    
    //console.log(this.cropper);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getUserDetails();
    this.getUserPostDetails();
    this.getRequestList();
    this.getEmployeeList();
    this.getFollowerList();
    this.getFollowerList();
    console.log(this.loginUserDet);
  }

  public getFollowerList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "company_id": loginUserId
      };
      this.dataService.getCompanyFollowerList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userFollowerList = details.CompanyFollowers;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }

  public getEmployeeList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "company_id": loginUserId
      };
      this.dataService.getCompanyEmployeetList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userEmployeeList = details.EmployeelistBycompanyID;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }


  public getRequestList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "company_id": loginUserId
      };
      this.dataService.getCompanyRequestList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userRequestList = details.PendingEmployeelistBycompanyID;
          } else {

          }
        },
        error => {

        }
        );
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
          //console.log(details);
          if (details.Ack == "1") {
            this.loginUserDet = details.UserDetails[0];
            if(details.UserDetails[0].user_type=='CA' || details.UserDetails[0].user_type=='CSA'){
              if(details.UserDetails[0].user_type=='CA'){
                this.cmpId = details.UserDetails[0].id;
                this.getSubadminListByAdmin();
              }else if(details.UserDetails[0].user_type=='CSA'){
                this.cmpId = details.UserDetails[0].company_uid;
              }
              this.groupPostDetData = {activitytype:'3', activityid:this.cmpId};
            }else{
              this.router.navigate(['/user/profile']);
            }
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }
  
  public getSubadminListByAdmin(){
    const dataUserDet = {
      "company_id": this.cmpId
    };
    this.dataService.getSubadminListById(dataUserDet).subscribe(data => {
      const details = data;
      if (details.Ack == "1") {
        this.cmpSubadminList = details.subadminlist;
      } 
    },
    error => {
    });
    
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

  public updateAccount() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
      userValue = this.form.value;
    userValue.id = loginUserId;
    this.dataService.updateAccountDet(userValue)
      .subscribe(
      data => {

        const details = data;
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        //this.router.navigateByUrl('/user/profile');
        this.router.navigate(['/company/profile']);

      },
      error => {
        alert(error);
      });

  }

  public createEmployee() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
    userValue = this.form.value;
    userValue.id = loginUserId;
    this.dataService.createEmployeeDet(userValue)
      .subscribe(
      data => {

        /*const details = data;
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);*/
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        this.router.navigate(['/company/profile']);

      },
      error => {
        alert(error);
      });

  }

  public fileChangeListener($event) {
    this.showImgDive = true;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      //console.log(that.cropper);
    };
    myReader.readAsDataURL(file);
  }

  public fileChangeListenerCover($event) {
    this.showCoverImgDive = true;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.cropper.setImage(image);
      //console.log(that.cropper);
    };
    myReader.readAsDataURL(file);
  }

  public cropped(bounds: Bounds) {
    //console.log(bounds);
  }

  public UploadPrfImg() {
    //console.log(this.cropper.image.image);
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": loginUserId,
      "profile_image": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showImgDive = false;
        this.getUserDetails();
        //localStorage.setItem('profile_image', this.loginUserDet[0].image_url);
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
        //let details = data;
        //localStorage.setItem('profile_image', details.UserDetails.image_url);
        //this.successMsg='Data updated successfully';
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });

    //console.log(this.cropper.image);
  }

  public UploadCoverImg() {
    //console.log(this.cropper.image.image);
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": loginUserId,
      "cover_img": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showCoverImgDive = false;
        this.getUserDetails();
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });
  }
  
  public deleteAdmin(del_id) {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": del_id
    };
    //console.log(uploadJsonData);
    this.dataService.deleteSubAdmin(uploadJsonData).subscribe(
      data => {
        this.loading = false;
        window.location.reload();
      },
      error => {
        alert(error);
      });
  }

  public RequestAccept(id, request_type){    
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": id,
      "request_type": request_type
    };
    //console.log(uploadJsonData);
    this.dataService.RequestAcceptReject(uploadJsonData)
      .subscribe(
      data => {
        if(data.Ack==1){
          this.successMsg='Accept successfull';
        }else{
          this.errorMsg='Reject';
        }          
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });
  }

  public addSubadminForm() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
    userValue = this.adminform.value;
    userValue.company_uid = loginUserId;
    this.dataService.createCmpSubadmin(userValue).subscribe( data => {
        this.loading = false;
        this.successMsg = 'Admin added successfully';
        //this.router.navigate(['/company/profile']);
        this.adminform.reset();
      },error => {
        alert(error);
      });
  }

  public checkEmail(values:Object):void {
    if(values!=''){
      let signupCheckEmail={
        "email": values
      };
      this.dataService.userCheckEmail(signupCheckEmail)
      .subscribe(data => {
             let details=data;
             //console.log(details);
             if (details.Ack=="1") {
                 this.checkEmailExist = false;
                 return false;
             }else{
               //alert('Invalid login');
               this.checkEmailExist = true;
               return false;
             }
         },
         error => {
           
         }
       ); 
    }else{

    }
  }

  public toggleTab(data: any) {
    //console.log(data);
    this.activeTab = data;
    this.successMsg = '';
    this.errorMsg = '';
  }

  public aboutToggleTab(data: any) {
    this.successMsg = '';
    this.errorMsg = '';
    this.aboutActiveTab = data;
  }

}
