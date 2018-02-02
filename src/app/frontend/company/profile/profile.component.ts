import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { CompanyService } from "../company.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
declare var google: any;
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public companyNameByUrl: string = '';
  public isloginUserId: any;
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  public otherProfileDet: any;
  public otherProfileId: any;
  public website: any;
  public mobile_number: any;
  public state: any;
  public city: any;
  public bio: any;
  public company_mission: any;
  public company_vission: any;
  public address: any;
  public lat: 0;
  public lng: 0;
  public isAdmin = false;
  public isloginUser: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  prfImageData: any;
  coverImageData: any;
  public userPostList = [];
  public userFrndList = [];
  public userFollowerList = [];
  public userEmployeeList = [];
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'overview';
  public successMsg: string = '';
  public errorMsg: string = '';
  public checkIsFriend: boolean = false;
  public loginUserDet: any;
  public loading = false;
  public isEmpRequest = true;
  public isFollowRequest = true;
  public showImgDive: boolean = false;
  public showCoverImgDive: boolean = false;
  @ViewChild("fileTypeEdit") fileTypeEdit: ElementRef;
  @ViewChild("profileImageType") profileImageType: ElementRef;
  @ViewChild("addressEdit") addressEdit: ElementRef;
  constructor(
    private dataService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isloginUser = localStorage.getItem("isLoggedIn");
    this.loginUserDet = JSON.parse(localStorage.getItem("currentUser"));
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
  openFile() {
    this.fileTypeEdit.nativeElement.click();
  }
  UploadPrfImg() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": this.otherProfileDet.id,
      "profile_image": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showImgDive = false;
        this.getCompanyDetailsByname();

      },
      error => {
        alert(error);
      });
  }
  openProFile() {
    this.profileImageType.nativeElement.click();
  }
  ngOnInit() {
    let autocomplete = new google.maps.places.Autocomplete(
      /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
      { types: ['geocode'] });
    google.maps.event.addListener(autocomplete, 'place_changed', function () {
      var place = autocomplete.getPlace();
      let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
      localStorage.setItem("address", JSON.stringify(address_data));

    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.companyNameByUrl = params['uname'];
    });
    this.getCompanyDetailsByname();
  }
  public cropped(bounds: Bounds) {
    //console.log(bounds);
  }
  UploadCoverImg() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": this.otherProfileDet.id,
      "cover_img": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showCoverImgDive = false;
        this.getCompanyDetailsByname();

        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });
  }
  fileChangePost($event) {
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
  coverFileChangePost($event) {
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
  openEdit(type) {
    if (type == 'website') {
      if (this.website) {
        this.mobile_number = '';
        this.state = '';
        this.city = '';
        this.bio = '';
        this.company_mission = '';
        this.company_vission = '';
        if (this.website != 'Enter Website') {
          this.loading = true;
          const data = { website: this.website, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.website = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.website = '';
        }

      }
      else {
        if (this.otherProfileDet.website)
          this.website = this.otherProfileDet.website;
        else
          this.website = "Enter Website";
        this.mobile_number = '';
        this.state = '';
        this.city = '';
        this.company_mission = '';
        this.company_vission = '';
        this.bio = '';
      }

    }
    else if (type == 'mobile_number') {
      if (this.mobile_number) {
        this.website = '';
        this.state = '';
        this.city = '';
        this.company_mission = '';
        this.company_vission = '';
        this.bio = '';
        if (this.mobile_number != 'Enter Mobile Number') {
          this.loading = true;
          const data = { mobile_number: this.mobile_number, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.mobile_number = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.mobile_number = '';
        }

      }
      else {
        this.website = '';
        this.bio = '';
        this.state = '';
        this.company_mission = '';
        this.company_vission = '';
        this.city = '';
        if (this.otherProfileDet.mobile_number)
          this.mobile_number = this.otherProfileDet.mobile_number;
        else
          this.mobile_number = "Enter Mobile Number";
      }
    }
    else if (type == 'state') {
      if (this.state) {
        this.website = '';
        this.mobile_number = '';
        this.company_mission = '';
        this.company_vission = '';
        this.bio = '';
        this.city = '';
        if (this.state != 'Enter State') {
          this.loading = true;
          const data = { state: this.state, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.state = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.state = '';
        }

      }
      else {
        this.website = '';
        this.company_mission = '';
        this.company_vission = '';
        this.bio = '';
        this.city = '';
        this.mobile_number = '';
        if (this.otherProfileDet.state)
          this.state = this.otherProfileDet.state;
        else
          this.state = "Enter State";
      }
    }
    else if (type == 'city') {
      if (this.city) {
        this.website = '';
        this.company_mission = '';
        this.company_vission = '';
        this.mobile_number = '';
        this.state = '';
        this.bio = '';
        if (this.city != 'Enter City') {
          this.loading = true;
          const data = { city: this.city, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.city = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.city = '';
        }

      }
      else {
        this.website = '';
        this.state = '';
        this.bio = '';
        this.company_mission = '';
        this.company_vission = '';
        this.mobile_number = '';
        if (this.otherProfileDet.city)
          this.city = this.otherProfileDet.city;
        else
          this.city = "Enter City";
      }
    }
    else if (type == 'bio') {
      if (this.bio) {
        this.website = '';
        this.mobile_number = '';
        this.state = '';
        this.company_mission = '';
        this.company_vission = '';
        this.city = '';
        if (this.bio != 'Enter About Company') {
          this.loading = true;
          const data = { bio: this.bio, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.bio = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.bio = '';
        }

      }
      else {
        this.website = '';
        this.state = '';
        this.company_mission = '';
        this.company_vission = '';
        this.city = '';
        this.mobile_number = '';
        if (this.otherProfileDet.bio)
          this.bio = this.otherProfileDet.bio;
        else
          this.bio = "Enter About Company";
      }
    }
    else if (type == 'company_mission') {
      if (this.company_mission) {
        this.website = '';
        this.mobile_number = '';
        this.state = '';
        this.company_vission = '';
        this.city = '';
        this.bio = '';
        if (this.company_mission != 'Enter Company Mission') {
          this.loading = true;
          const data = { company_mission: this.company_mission, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.company_mission = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.company_mission = '';
        }

      }
      else {
        this.website = '';
        this.state = '';
        this.bio = '';
        this.city = '';
        this.mobile_number = '';
        this.company_vission = '';
        if (this.otherProfileDet.company_mission)
          this.company_mission = this.otherProfileDet.company_mission;
        else
          this.company_mission = "Enter Company Mission";
      }
    }
    else if (type == 'company_vission') {
      if (this.company_vission) {
        this.website = '';
        this.mobile_number = '';
        this.state = '';
        this.company_mission = '';
        this.city = '';
        this.bio = '';
        if (this.company_vission != 'Enter Company Vision') {
          this.loading = true;
          const data = { company_vission: this.company_vission, id: this.otherProfileDet.id }
          this.dataService.updateAccountDet(data).subscribe(data => {
            this.company_vission = '';
            this.loading = false;
            this.getCompanyDetailsByname();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.company_vission = '';
        }

      }
      else {
        this.website = '';
        this.state = '';
        this.bio = '';
        this.city = '';
        this.mobile_number = '';
        this.company_mission = '';
        if (this.otherProfileDet.company_vission)
          this.company_vission = this.otherProfileDet.company_vission;
        else
          this.company_vission = "Enter Company Vision";
      }
    }
    else if (type == 'address') {
      this.website = '';
      this.mobile_number = '';
      this.state = '';
      this.company_mission = '';
      this.city = '';
      this.bio = '';
      this.company_vission = '';
      if (this.address || localStorage.getItem("address")) {
        this.loading = true;
        let addressData = JSON.parse(localStorage.getItem("address"));
        const data = { address: addressData.address, lat: addressData.lat, lng: addressData.lng, id: this.otherProfileDet.id }
        this.dataService.updateAccountDet(data).subscribe(data => {
          localStorage.removeItem("address");
          this.address = '';
          this.company_vission = '';
          this.loading = false;
          this.addressEdit.nativeElement.style.display = "none";
          this.getCompanyDetailsByname();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.website = '';
        this.state = '';
        this.bio = '';
        this.city = '';
        this.mobile_number = '';
        this.company_mission = '';
        this.company_vission = '';
        this.address = this.otherProfileDet.address;
        this.lat = this.otherProfileDet.lat; this.lng = this.otherProfileDet.lng;
        this.addressEdit.nativeElement.style.display = "block";
      }




    }
  }
  public getCompanyDetailsByname() {
    if (this.companyNameByUrl != '') {
      const dataUserDet = {
        "company_slug": this.companyNameByUrl
      };
      this.dataService.getCompanyDetByname(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            if (data.CompanyDetails[0].is_admin == "1") {
              this.isAdmin = true;
            }
            else
              this.isAdmin = false;
            this.otherProfileDet = data.CompanyDetails[0];
            //console.log(this.otherProfileDet.id);
            this.otherProfileId = this.otherProfileDet.id;

            this.getUserPostDetails();
            //this.getConnectionList();
            //this.checkMyFrndData();
            this.getEmployeeList();
            this.getFollowerList();
          }
        },
        error => {

        });
      localStorage.setItem("groupAdmin", this.otherProfileId);
    }
  }

  public getFollowerList() {
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "company_id": this.otherProfileId
      };
      this.dataService.getCompanyFollowerList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userFollowerList = details.CompanyFollowers;
            let SuccessPageData = this.userFollowerList.filter(item => item.user_id == this.isloginUserId);
            if (SuccessPageData.length > 0) {
              this.isFollowRequest = false;
            }
            else {
              this.isFollowRequest = true;
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

  public getEmployeeList() {
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "company_id": this.otherProfileId
      };
      this.dataService.getCompanyEmployeetList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userEmployeeList = details.EmployeelistBycompanyID;
            let SuccessPageData = this.userEmployeeList.filter(item => item.user_id == this.isloginUserId);
            if (SuccessPageData.length > 0) {
              this.isEmpRequest = false;
              //this.isFollowRequest = false;
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

  public unflow_company() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId,
        "company_id": this.otherProfileId,
        "id": ""
      };
      this.dataService.unflowcompany(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.successMsg = "Unfollow Successful.";
            //this.isEmpRequest = false;
            this.getFollowerList();

          } else {

          }
        },
        error => {

        }
        );
    } else {
    }
  }

  public checkMyFrndData() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '' && this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId, "friend_id": this.otherProfileId
      };
      this.dataService.getUserIsMyFrnd(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.msg == "Friend" && details.Ack == "1") {
            this.checkIsFriend = true;
          } else {
            this.checkIsFriend = false;
          }
        },
        error => {

        }
        );
    }
  }

  public getUserPostDetails() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "page_no": '1',
        "group_id": this.otherProfileId,
        "type": '3'
      };
      this.dataService.getUserPostById(dataUserDet).subscribe(data => {
        const details = data;
        if (details.Ack == "1") {
          this.userPostList = details.AllPost;
        }
      },
        error => {

        });
    }
  }

  public getConnectionList() {
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "user_id": this.otherProfileId
      };
      this.dataService.getUserFrndListById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userFrndList = details.FriendListById;
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

  public aboutToggleTab(data: any) {
    this.successMsg = '';
    this.errorMsg = '';
    this.aboutActiveTab = data;
  }

  public sendEmployeeRequest(company_id) {

    if (this.isloginUserId != '' && company_id != '') {
      this.loading = true;
      let requestJsonData = { "user_id": this.isloginUserId, "company_id": company_id };
      this.dataService.sendEmployeeRequest(requestJsonData)
        .subscribe(
        data => {
          if (data.Ack == 1) {

            this.successMsg = 'You have successfully sent the request';
          } else {
            this.errorMsg = 'You have already sent the request';
          }
          this.loading = false;
        },
        error => {
          alert(error);
        });
    } else {
      this.router.navigateByUrl('/user/login');
    }
  }

  public sendFollowRequest(company_id) {
    this.loading = true;
    //console.log(friend_id);
    if (this.isloginUserId != '' && company_id != '') {
      let requestJsonData = { "user_id": this.isloginUserId, "company_id": company_id };

      this.dataService.sendFollowRequest(requestJsonData)
        .subscribe(
        data => {
          console.log(data);
          if (data.Ack == 1) {
            this.successMsg = 'Follow Successful.';
            this.getFollowerList();

          } else {
            this.errorMsg = 'You have unfollow.';
          }
          this.loading = false;
        },
        error => {
          alert(error);
        });
    } else {
      this.router.navigateByUrl('/user/login');
    }
  }
}
