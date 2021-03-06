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
  modalErrorMsg: any;
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
  public validAge = true;
  public loading = false;
  public loginUserDet: any;
  public userPostList = [];
  public userFrndList = [];
  public filetredFriendList = [];
  public previousUrl: string;
  public userRequestFrndList = [];
  public userSearchFrndList =[];
  public suggestshow = false;
  public divshow = true;
  IsShowTopViewMore = false;
  IsShowTopViewMore1 = false;
  public totalserchFrndList = [];
  searchErrorMessage:any;
  private connectionsPageSize = 5;
  private connectionsPageSize1 = 5;
  public groupMemberList1 = [];
  public totalmember:number=0;
  public dayList = [];
  public dobmonth: any;
  public dobyear: any;
  public dobdate: any;
  public mobnumber: any;
  public mobcode: any;

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
    this.route.params.subscribe((params: Params) => {
      this.activeTab = params['type'];
    });
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
		  mobcode: ['', [
        Validators.required,
        Validators.minLength(2)
      ]],
      mobnumber: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
      dobmonth: ['', [
        Validators.required,
      ]],
      dobyear: ['', [
        Validators.required,
      ]],
      dobdate: ['', [
        Validators.required,
      ]],
      website: ['', [

      ]],
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
      ,
      email: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      education: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      favourite_quotes: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      marriage_status: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
      ,
      children: ['', [
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

    this.dayList.push({ "text": "1", "id": "1" }); this.dayList.push({ "text": "2", "id": "2" }); this.dayList.push({ "text": "3", "id": "3" });
    this.dayList.push({ "text": "4", "id": "4" }); this.dayList.push({ "text": "5", "id": "5" }); this.dayList.push({ "text": "6", "id": "6" });
    this.dayList.push({ "text": "7", "id": "7" }); this.dayList.push({ "text": "8", "id": "8" }); this.dayList.push({ "text": "9", "id": "9" });
    this.dayList.push({ "text": "10", "id": "10" }); this.dayList.push({ "text": "11", "id": "11" }); this.dayList.push({ "text": "12", "id": "12" });
    this.dayList.push({ "text": "13", "id": "13" }); this.dayList.push({ "text": "14", "id": "14" }); this.dayList.push({ "text": "15", "id": "15" });
    this.dayList.push({ "text": "16", "id": "16" }); this.dayList.push({ "text": "17", "id": "17" }); this.dayList.push({ "text": "18", "id": "18" });
    this.dayList.push({ "text": "19", "id": "19" }); this.dayList.push({ "text": "20", "id": "20" }); this.dayList.push({ "text": "21", "id": "21" });
    this.dayList.push({ "text": "22", "id": "22" }); this.dayList.push({ "text": "23", "id": "23" }); this.dayList.push({ "text": "24", "id": "25" });
    this.dayList.push({ "text": "25", "id": "25" }); this.dayList.push({ "text": "26", "id": "26" }); this.dayList.push({ "text": "27", "id": "27" });
    this.dayList.push({ "text": "28", "id": "28" }); this.dayList.push({ "text": "29", "id": "29" }); this.dayList.push({ "text": "30", "id": "30" });
    this.dayList.push({ "text": "31", "id": "31" });

    this.getUserDetails();
    this.getUserPostDetails();
    this.getConnectionList();
    this.getPendingFrndList();
    this.submitSearchUser();
  }
  
  public calculateAge(event, type) {
    var IsCheck = false;
    if (type == 'y') {
      if (this.dobdate && this.dobmonth) {
        IsCheck = true;
      }
    }
    else if (type == 'm') {
      if (this.dobdate && this.dobyear) {
        IsCheck = true;
      }
    }
    else if (type == 'd') {
      if (this.dobmonth && this.dobyear) {
        IsCheck = true;
      }
    }
    if (IsCheck) {
      var birthday;
      if (type == 'y') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
      }
      else if (type == 'm') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
      }
      else if (type == 'd') {
        birthday = this.dobyear + "/" + this.dobmonth + "/" + this.dobdate;
      }

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
          this.totalmember = this.userFrndList.length;
          
          if (this.userFrndList.length > 6) { 
            this.IsShowTopViewMore1 = true;
            for (let i = 0; i < this.userFrndList.length; i++) {
              if (this.groupMemberList1.length < 6) {
                this.groupMemberList1.push(this.userFrndList[i]);
              }
            }
            //alert(JSON.stringify(this.groupMemberList1))
          }else { 
            this.IsShowTopViewMore = false;
            this.groupMemberList1 = this.userFrndList;
          }

          //this.userFrndList = details.FriendListById;
        } else {

        }
      },
        error => {

        });
    } else {
    }
  }
  openUpdateProModal(updateProfilePictureModal) {
    this.modalErrorMsg = '';
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
            /*if (this.loginUserDet.dob) {
              this.loginUserDet.dateOfBirth = new Date(this.loginUserDet.dob);
            }*/
            if (this.loginUserDet.dob) {
              let res = this.loginUserDet.dob.split("-");
              let res_month = res[1].replace("0", "");
              this.dobmonth = parseInt(res_month)-1;
              this.dobyear = res[0]
              this.dobdate = res[2]
            }else{
              this.validAge = false;
            }
            if (this.loginUserDet.mobile_number) {
              let res = this.loginUserDet.mobile_number.split("-");
              if (this.mobnumber = res[1]) { 
                this.mobnumber = res[1]
                this.mobcode = res[0]
              }else {
                this.mobnumber = res[0]
                this.mobcode = '+00';
              }
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
    let selMonth=parseInt(this.form.value.dobmonth)+1;
    const dateOfBirth = this.form.value.dobyear + '-' + selMonth + '-' + this.form.value.dobdate;
    const mobile = this.form.value.mobcode + '-' + this.form.value.mobnumber;
    userValue.mobile_number = mobile;
    userValue.dob = dateOfBirth;
    userValue.noti_settings = "";
    this.dataService.updateAccountDet(userValue).subscribe(data => {
        this.editAbtActiveTab = '';
        const details = data;
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        this.loginUserDet.dob = dateOfBirth;
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
    this.modalErrorMsg = '';

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
      if (resp == 'data:,') {
        that.loading = false;
        that.modalErrorMsg = 'please upload an image to save.';
      }
      else {
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
      if (resp == 'data:,') {
        that.loading = false;
        that.modalErrorMsg = 'please upload an image to save.';
      }
      else {
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

  public submitSearchUser() {
    const loginUserId = localStorage.getItem("loginUserId");
      var result,
      userValue = {'suname':'','user_id':loginUserId};
      this.dataService.searchFrndListByName(userValue).subscribe(
        data => {
          if(data.Ack=='1'){
             let searchResult = data.FriendListById.filter(item => item.user_type == 'C' && item.request_type != '2');
             this.userSearchFrndList=searchResult;
              //console.log(data.FriendListById);
              //this.userSearchFrndList=data.FriendListById;
              //console.log(this.userSearchFrndList);
          }else{
            this.userSearchFrndList=[];
          }
        },
        error => {
        // alert(error);
        });
      
  }
  
  searchConnections(value) {
    this.divshow = true;
    if (value) {
      this.IsShowTopViewMore = false;
      value = value.toLowerCase();
      let searchResult = this.userSearchFrndList.filter(item => {
        if (item.name.toLowerCase().search(value) !== -1) {
          return item;
        }
      });
      if (searchResult && searchResult.length>3) { 
        this.IsShowTopViewMore = true;
        this.filetredFriendList = [];
        for (var i = 0; i < searchResult.length; i++) {
          if(this.filetredFriendList.length < 3)
          {
          this.filetredFriendList.push(searchResult[i]);
          }
        }
        this.totalserchFrndList = searchResult;
       // alert(JSON.stringify(searchResult.length))
      }else  if (searchResult && searchResult.length) {
        this.filetredFriendList = [];
        for (var i = 0; i < searchResult.length; i++) {
          this.filetredFriendList.push(searchResult[i]);
        }
        this.totalserchFrndList = searchResult;
      }
      else {
        this.IsShowTopViewMore = false;
        this.filetredFriendList = [];
        this.searchErrorMessage = "No record found.";
      }
    }
    else {
      this.IsShowTopViewMore = true;
      this.filetredFriendList = [];
      this.searchErrorMessage = '';
    }
   
  }

  public divhide(sts){
    if(sts == 1)
    {
      this.suggestshow = false;
      this.divshow = true;
    }
    else{
      this.suggestshow = true;
      this.divshow = false;
    }
  }

  viewMore() {
    this.connectionsPageSize = this.connectionsPageSize + 3;
    this.filetredFriendList = [];
    if (this.totalserchFrndList.length > this.connectionsPageSize) {
      this.IsShowTopViewMore = true;
    }
    else {
      this.IsShowTopViewMore = false;
    }
    for (let i = 0; i < this.connectionsPageSize; i++) {
      if (this.totalserchFrndList[i]) {
        this.filetredFriendList.push(this.totalserchFrndList[i]);
      }

    }
  }

  public sendFriendRequest(friend_id) {
      this.loading = true;
      this.successMsg='';
      this.errorMsg='';
      const loginUserId = localStorage.getItem("loginUserId");
      let requestJsonData={"user_id": loginUserId, "friend_id": friend_id};
      this.dataService.sendFrndRequest(requestJsonData).subscribe(data => {
          this.loading = false;
          //console.log(data);
          if(data.Ack == '1'){
            this.successMsg='Connection request Sent';
            this.submitSearchUser();
          }else{
            this.errorMsg='You have already send the friend request';
          }
          //console.log(data);
          //this.postform.reset();
        },
        error => {
          //alert(error);
        });
  }

  viewMore1() {
    this.connectionsPageSize1 = this.connectionsPageSize1 + 6;
    this.groupMemberList1 = [];
    if (this.userFrndList.length > this.connectionsPageSize1) {
      this.IsShowTopViewMore1 = true;
    }else {
      this.IsShowTopViewMore1 = false;
    }
    for (let i = 0; i < this.connectionsPageSize1; i++) {
      if (this.userFrndList[i]) {
        this.groupMemberList1.push(this.userFrndList[i]);
      }

    }
  }

}
