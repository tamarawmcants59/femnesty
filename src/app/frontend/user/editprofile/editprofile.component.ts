import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, NavigationEnd, Params } from '@angular/router';
import { UserService } from "../user.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'overview';
  public editAbtActiveTab: string = '';
  public showImgDive: boolean = false;
  public IsShowCropperProfileImage = false;
  public IsShowCropperCoverImage = false;
  public showProfileCrop = false;
  public showCoverCrop = false;
  public showCoverImgDive: boolean = false;
  public showPostImgDive: boolean = false;
  modalErrorMsg:any;
  public form: FormGroup;
  imageChangedEvent: any = '';
  coverImageChangedEvent: any = '';
  croppedImage: any = '';
  coverCroppedImage: any = '';
  returnUrl: string;
  errorMsg: string = '';
  successMsg: string = '';
  $uploadCrop: any;
  reqErrorMsg: string = '';
  reqSuccessMsg: string = '';
  userTabActiveStr: string = '';
  public minDate = new Date();
  public validAge = false;
  public loading = false;
  public loginUserDet: any;
  public userPostList = [];
  public userFrndList = [];
  public previousUrl: string;
  public userRequestFrndList = [];

  prfImageData: any;
  coverImageData: any;
  postImgData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  public groupPostDetData: object = {};

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal,
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
      first_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      last_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
			/*email: ['', [
				Validators.required,
				//BasicValidators.email
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]],*/
      mobile_number: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      dob: ['', [
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
      occupation: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]],
      bio: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]

    });
    //console.log(this.cropper);

    /*router.events.filter(event => event instanceof NavigationEnd).subscribe(e => {
      console.log('prev:', this.previousUrl);
        //this.previousUrl = e.url;
    });*/
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.groupPostDetData = { activitytype: '', activityid: '' };

    this.getUserDetails();
    this.getUserPostDetails();
    this.getConnectionList();
    this.getPendingFrndList();
  }
  public calculateAge(birthday) {
    var today = new Date();
    var birthDate = new Date(birthday);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
      age--;
    }
    if (age >= 16) {
      this.validAge = true;
    }
    else {
      this.validAge = false;
    }
  }
  public getConnectionList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserFrndListById(dataUserDet).subscribe(data => {
        const details = data;
        //console.log(details);
        if (details.Ack == "1") {
          this.userFrndList = details.FriendListById;
        } else {

        }
      },
        error => {

        });
    } else {
    }
  }
  openUpdateProModal(updateProfilePictureModal) {
    this.modalErrorMsg='';
    setTimeout(() => {
      this.$uploadCrop = $('#upload-demo').croppie({
        viewport: {
          width: 200,
          height: 200,
          type: 'circle'
        },
        enableExif: true
      });
    }, 100);
    this.showProfileCrop = false;
    this.croppedImage = '';
    this.modalService.open(updateProfilePictureModal);
  }
  public getUserDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    localStorage.setItem("groupAdmin", loginUserId);
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
        "user_id": loginUserId,
        "login_id": loginUserId
      };
      this.dataService.getUserPostById(dataUserDet).subscribe(data => {
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
    }
  }
  resetCover() {
    // this.showCoverCrop = false;
    // this.coverCroppedImage = "";
    //$('.upload-demo').removeClass('ready');
    $(".upload-demo-wrap").hide();
    this.IsShowCropperCoverImage = false;
  }
  resetPro() {
    //$('.upload-demo').removeClass('ready');
    $(".upload-demo-wrap").hide();
    this.IsShowCropperProfileImage = false;
  }
  public updateAccount() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
      userValue = this.form.value;
    userValue.id = loginUserId;
    const dateOfBirth = this.form.value.dob.getFullYear() + '-' + ('0' + (this.form.value.dob.getMonth() + 1)).slice(-2) + '-'
      + ('0' + this.form.value.dob.getDate()).slice(-2);
    userValue.dob = dateOfBirth;
    this.dataService.updateAccountDet(userValue)
      .subscribe(
      data => {
        this.editAbtActiveTab = '';
        const details = data;
        //console.log
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        this.loginUserDet.dob = dateOfBirth;
        //this.router.navigateByUrl('/user/profile');
        this.router.navigate(['/user/edit_profile/about']);
      },
      error => {
        alert(error);
      });

  }
  coverCropperChange(event) {
    $(".upload-demo-wrap").show();
    this.IsShowCropperCoverImage = true;
    const image: any = new Image();
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      $('.upload-demo').addClass('ready');
      image.src = loadEvent.target.result;
      that.$uploadCrop.croppie('bind', {
        url: image.src
      }).then(function () {
        console.log('jQuery bind complete');
      });
    };
    myReader.readAsDataURL(file);
  }
  cropperChange(event) {
    $(".upload-demo-wrap").show();
    this.IsShowCropperProfileImage = true;
    const image: any = new Image();
    const file: File = event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      $('.upload-demo').addClass('ready');
      image.src = loadEvent.target.result;
      that.$uploadCrop.croppie('bind', {
        url: image.src
      }).then(function () {
        console.log('jQuery bind complete');
      });
    };
    myReader.readAsDataURL(file);
  }
  openUpdateCoverProModal(updateCoverPictureModal) {
    this.modalErrorMsg='';

    // this.showCoverCrop = false;
    // this.coverCroppedImage = '';
    // this.modalService.open(updateCoverPictureModal);
    setTimeout(() => {
      this.$uploadCrop = $('#upload-demo').croppie({
        viewport: {
          width: 615,
          height: 195,
          type: 'rectangle'
        },
        enableExif: true
      });
    }, 100);
    this.showProfileCrop = false;
    this.croppedImage = '';
    this.modalService.open(updateCoverPictureModal);
  }

  public fileChangeListener($event) {
    // this.showImgDive = true;
    // const image: any = new Image();
    // const file: File = $event.target.files[0];
    // const myReader: FileReader = new FileReader();
    // const that = this;
    // myReader.onloadend = function (loadEvent: any) {
    //   image.src = loadEvent.target.result;
    //   that.cropper.setImage(image);
    // };
    // myReader.readAsDataURL(file);
    this.showProfileCrop = true;
    this.imageChangedEvent = event;
  }
  imageCropped(image: string) {
    this.croppedImage = image;
  }
  coverImageCropped(image: string) {
    this.coverCroppedImage = image;
  }
  public fileChangeListenerCover($event) {
    // this.showCoverImgDive = true;
    // const image: any = new Image();
    // const file: File = $event.target.files[0];
    // const myReader: FileReader = new FileReader();
    // const that = this;
    // myReader.onloadend = function (loadEvent: any) {
    //   image.src = loadEvent.target.result;
    //   that.cropper.setImage(image);
    // };
    // myReader.readAsDataURL(file);
    this.showCoverCrop = true;
    this.coverImageChangedEvent = $event;
  }

  public cropped(bounds: Bounds) {
    //console.log(bounds);
  }

  public UploadPrfImg() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    // const uploadJsonData = {
    //   "id": loginUserId,
    //   "profile_image": this.cropper.image.image
    // };
    const that = this;
    this.$uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (resp) {
      if(resp=='data:,')
      {
        that.loading=false;
        that.modalErrorMsg = 'please upload an image to save.';
      }
      else
      {
        const uploadJsonData = {
          "id": loginUserId,
          "profile_image": resp
        };
        that.dataService.updateImgService(uploadJsonData)
          .subscribe(
          data => {
            that.loading = false;
            that.showImgDive = false;
            that.getUserDetails();
            window.location.reload();
          },
          error => {
            alert(error);
          });
      }
     
    });


  }

  public UploadCoverImg() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const that = this;
    this.$uploadCrop.croppie('result', {
      type: 'canvas',
      size: 'viewport'
    }).then(function (resp) {
      if(resp=='data:,')
      {
        that.loading=false;
        that.modalErrorMsg = 'please upload an image to save.';
      }
      else
      {
        const uploadJsonData = {
          "id": loginUserId,
          "cover_img": resp
        };
        that.dataService.updateImgService(uploadJsonData)
          .subscribe(
          data => {
            that.loading = false;
            that.showImgDive = false;
            that.getUserDetails();
            window.location.reload();
          },
          error => {
            alert(error);
          });
      }
      
    });
    // this.loading = true;
    // const loginUserId = localStorage.getItem("loginUserId");
    // const uploadJsonData = {
    //   "id": loginUserId,
    //   "cover_img": this.coverCroppedImage
    // };
    // this.dataService.updateImgService(uploadJsonData)
    //   .subscribe(
    //   data => {
    //     this.loading = false;
    //     this.showCoverImgDive = false;
    //     this.getUserDetails();
    //     window.location.reload();
    //   },
    //   error => {
    //     alert(error);
    //   });
  }

  /*public onReturnData(data: any) {
      // Do what you want to do
      console.warn(JSON.parse(data));
  }*/
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

  public editAboutToggleTab(data: any) {
    this.editAbtActiveTab = data;
    this.successMsg = '';
    this.errorMsg = '';
    //console.log(data);
  }

  public getPendingFrndList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      let dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getRequestFrndListById(dataUserDet)
        .subscribe(data => {
          let details = data;
          if (details.Ack == "1") {
            this.userRequestFrndList = details.PendingFriendListById;
          }
        },
        error => {
        }
        );
    } else {
    }
  }

  public acceptFriendRequest(request_id) {
    this.loading = true;
    this.reqSuccessMsg = '';
    this.reqErrorMsg = '';
    let requestJsonData = { "id": request_id };
    this.dataService.acceptFrndRequest(requestJsonData)
      .subscribe(
      data => {
        this.loading = false;
        if (data.Ack == 1) {
          this.reqSuccessMsg = data.msg;
          this.getPendingFrndList();
        } else {
          //this.errorMsg='You have already send the friend request';
        }
      },
      error => {
        alert(error);
      });
  }

  public rejectFriendRequest(request_id) {
    this.loading = true;
    this.reqSuccessMsg = '';
    this.reqErrorMsg = '';
    let requestJsonData = { "id": request_id };
    this.dataService.rejectFrndRequest(requestJsonData).subscribe(data => {
      this.loading = false;
      if (data.Ack == 1) {
        this.reqSuccessMsg = data.msg;
        this.getPendingFrndList();
      } else {
        //this.errorMsg='You have already send the friend request';
      }
    },
      error => {
        alert(error);
      });
  }

  /*public checkInputValue(values:Object,inputname):void {
    if(values!=''){
      console.log(values);
      console.log(inputname);
    }
  }*/
}
