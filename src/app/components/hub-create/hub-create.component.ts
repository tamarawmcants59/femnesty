import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "./hub.service";
import { SelectModule } from "../../../../node_modules/ng2-select";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
// import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";
// import { AmazingTimePickerService } from 'amazing-time-picker';

declare var google: any;
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-hub-create',
  templateUrl: './hub-create.component.html',
  styleUrls: ['./hub-create.component.css']
})
export class HubCreateComponent implements OnInit {
  public postform: FormGroup;
  //public editPostform: FormGroup;
  loading: boolean;
  showPostImgDive: boolean;
  errorMsg: string = '';
  createErrorMsg: string = '';
  successMsg: string = '';
  postImgData: any;
  croppedImage: any = '';
  modalRef: any;
  public checkInvalidDate: boolean = true;
  public minDate = new Date();
  public aboutActiveTab: string = 'overview';
  public loginUserDet: Object = {};
  public loginUserId: any;
  coverImgData: any;
  public showProfileCrop = false;
  public groupList: any;
  IsShowCropperCoverImage = false;
  public groupEditId: any;
  $uploadCrop: any;
  modalErrorMsg: any;
  public hubList = [];
  public groupEditDataJson = {};
  public addForm = { type: 'O', category_id: '', privacy: 'O' };
  public catList = [];
  public userSearchFrndList = [];
  public items = [];
  public hubRequestList = [];
  public searchData = { address: '', lat: '', lng: '' };
  public today = new Date().toJSON().split('T')[0];
  public autocompleteSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Type anything and you will get a location *',
  };
  public hubReqTab = 1;

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private hubService: HubService,
    private modalService: NgbModal
  ) {
    /*init */
    setTimeout(() => {
      //debugger;
      let autocomplete = new google.maps.places.Autocomplete(
                  /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", place.formatted_address);
        localStorage.setItem("lat", place.geometry.location.lat());
        localStorage.setItem("lng", place.geometry.location.lng());
      });

    }, 1000);



    this.router.events.subscribe(event => {
      const eventObj: any = event;
      const self = this;
      if (event.constructor.name === "ResolveStart") {
        if (eventObj.state.url.includes('create_hub/create')) {
          setTimeout(() => {
            // debugger;
            let autocomplete = new google.maps.places.Autocomplete(
                    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
              { types: ['geocode'] });
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
              localStorage.setItem("address", place.formatted_address);
              localStorage.setItem("lat", place.geometry.location.lat());
              localStorage.setItem("lng", place.geometry.location.lng());
            });
          }, 1000);

        }


      }
    });
    this.postform = builder.group({
      id: ['', []],
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      description: ['', [
        Validators.required
      ]],
      // address: ['', [
      //   Validators.required
      // ]],
      organizer: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]],
      website: ['', [
        //Validators.required
      ]],
      date: ['', [
        Validators.required
      ]],
      start_time: ['', [
        Validators.required
      ]],
      end_time: ['', [
        Validators.required
      ]],
      type: ['', [
        Validators.required
      ]],
      // recurring_start: ['', [
      //   // Validators.required
      // ]],
      recurring_end: ['', [
        // Validators.required
      ]],
      privacy: ['', [
        Validators.required
      ]],
      category_id: ['', [
        Validators.required
      ]],
      // cost: ['', [
      //   Validators.required
      // ]],
      phone: ['', [
        Validators.required
      ]],
      friends: ['', []]
    });

    /*this.editPostform = builder.group({
      group_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      image: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      short_desc: ['', [
        Validators.required
      ]],
      long_desc: ['', [
        
      ]]
    });*/
    this.loginUserId = localStorage.getItem("loginUserId");
  }



  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.aboutActiveTab = params['slug'];
    });
    this.getMyGroupListData();
    // this.getGroupRequestList();
    this.getHubList();
    this.getHubCategories();
    this.getFriendList();
    if (this.aboutActiveTab == 'create') {
      this.resetAddPage();
    } else if (this.aboutActiveTab == 'request') {
      this.getMyHubRequest();
    }
  }

  public resetAddPage() {

    this.addForm = { type: 'O', category_id: '', privacy: 'O' };
    this.searchData = { address: '', lat: '', lng: '' };
    this.autocompleteSettings['inputString'] = '';

    setTimeout(() => {
      // debugger;
      let autocomplete = new google.maps.places.Autocomplete(
               /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        //console.log(place);
        this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", place.formatted_address);
        localStorage.setItem("lat", place.geometry.location.lat());
        localStorage.setItem("lng", place.geometry.location.lng());
        //console.log(this.searchData);
      });
    }, 1000);

    // this.autocompleteSettings['inputPlaceholderText'] = 'This is the placeholder text after doing some external operation after some time';
    // this.autocompleteSettings = Object.assign({},this.autocompleteSettings);
  }

  public checkValidation() {
    //alert(this.postform.get('type').value)
    if (this.postform.get('type').value == 'R') {
      //this.postform.get('recurring_start').setValidators([Validators.required]);
      this.postform.get('recurring_end').setValidators([Validators.required]);
    }
    else {
      //this.postform.get('recurring_start').setValidators([]);
      this.postform.get('recurring_end').setValidators([]);
    }
    // this.postform.get('recurring_start').updateValueAndValidity();
    this.postform.get('recurring_end').updateValueAndValidity();
  }

  public getHubList() {
    this.hubService.getmyRequestGroupList(this.loginUserId).subscribe(data => {
      //console.log(data)
      if (data.Ack == "1") {
        // this.hubList = [];
        // // this.hubList.push(data.details[27]);
        // // this.hubList.push(data.details[28]);
        // debugger;
        // let data1 = data.details[27];
        // // data1.recurring_start = "2018-02-01";

        // // data1.recurring_end = "2018-02-02";
        // data1.date="2018-02-02";
        // this.hubList.push(data1);
        this.hubList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }
  openUpdateCoverProModal(updateCoverPictureModal) {

    this.modalErrorMsg = '';
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
    this.modalRef = this.modalService.open(updateCoverPictureModal);
  }
  public setMinDate(newValue) {

  }

  autoCompleteCallback1(data: any): any {
    if (data.response == true)
      this.searchData = { address: data.data.description, lat: data.data.geometry.location.lat, lng: data.data.geometry.location.lng };
  }
   formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}
  public createHub() {
    if (this.postform.valid) {
      /*console.log(this.postform.value.type);
      console.log(this.postform.value.recurring_end);
      console.log(this.postform.value.date);*/
      if (this.postform.value.type == 'R' && new Date(this.postform.value.recurring_end) < new Date(this.postform.value.date)) {
        this.checkInvalidDate = false;
      } else {
        this.checkInvalidDate = true;
      }
      let IsValid = false;
      if (this.hubList.length > 0) {
        for (var i = 0; i < this.hubList.length; i++) {
          if (this.hubList[i].type == 'O') {
            const date = new Date(this.hubList[i].date);
            date.setHours(0, 0, 0, 0);
            let date1 = date.getDate() + "/" + (date.getMonth() + 1) + "/" + date.getFullYear();
            let compareDate = this.postform.value.date;
            compareDate.setHours(0, 0, 0, 0);
            let compareDate1 = compareDate.getDate() + "/" + (compareDate.getMonth() + 1) + "/" + compareDate.getFullYear();
            if (this.postform.value.type == "O") {
              if (date1 == compareDate1) {
                this.createErrorMsg = "A hub already exists on the entered date.";
                IsValid = false;
                window.scrollTo(0, 0);
                break;
              }
              else {
                IsValid = true;
              }
            }
            else if (this.postform.value.type == "R") {
              let from = new Date(this.postform.value.date);
              from.setHours(0, 0, 0, 0);
              let to = new Date(this.postform.value.recurring_end);
              to.setHours(0, 0, 0, 0);
              let check = new Date(this.hubList[i].date);
              check.setHours(0, 0, 0, 0);
              if (check >= from && check <= to) {
                this.createErrorMsg = "A hub already exists on the entered date.";
                IsValid = false;
                window.scrollTo(0, 0);
                break;
              }
              else {
                IsValid = true;
              }
            }

          }
          else if (this.hubList[i].type == 'R') {
            let from = new Date(this.hubList[i].recurring_start);
            from.setHours(0, 0, 0, 0);
            let to = new Date(this.hubList[i].recurring_end);
            to.setHours(0, 0, 0, 0);
            let check = this.postform.value.date;
            check.setHours(0, 0, 0, 0);
            if (check >= from && check <= to) {
              this.createErrorMsg = "A hub already exists on the entered date.";
              IsValid = false;
              window.scrollTo(0, 0);
              break;
            }
            else {
              IsValid = true;
            }
          }
        }
      }
      else {
        IsValid = true;
      }
      if (IsValid) {
        this.createErrorMsg = '';
        let address = localStorage.getItem("address");
        let lat = localStorage.getItem("lat");
        let lng = localStorage.getItem("lng");
        if (address && lat && lng) {
          this.loading = true;
          const userValue = this.postform.value;
          userValue.user_id = this.loginUserId;
          // userValue.image = this.postImgData;
          if (this.coverImgData)
            userValue.image = this.coverImgData;
          else
            userValue.image = '';
          if (address && lat) {
            userValue.address = address;
            userValue.lat = lat;
            userValue.lng = lng;
          }
          if(userValue.date)
          {
          userValue.date=this.formatDate(userValue.date);
          }
          if(userValue.recurring_end)
          {
          userValue.recurring_end=this.formatDate(userValue.recurring_end);
          }
          this.hubService.createNewHub(userValue).subscribe(
            data => {
              this.showPostImgDive = false;
              this.loading = false;
              if (userValue.id) {
                this.successMsg = "Hub edited Successfully.";
              }
              else
                this.successMsg = 'Hub created successfully.';
              this.coverImgData = '';
              localStorage.setItem("address", '');
              localStorage.setItem("lat", '');
              localStorage.setItem("lng", '');
              this.postform.reset();
              //this.aboutActiveTab = 'overview';
              window.scrollTo(0, 0);
              this.getHubList();
            },
            error => {
              alert(error);
            });
        } else if (!this.checkInvalidDate) {
          this.createErrorMsg = "Please provide recurring to date greater than from date.";
          window.scrollTo(0, 0);
        } else {
          this.createErrorMsg = "Please enter the location.";
          window.scrollTo(0, 0);
        }
      }

    }
  }

  public editHubTab(hub) {
    // this.postform = hub;
    //console.log(hub);
    if (hub.date) {
      //alert(hub.date);
      hub.date = new Date(hub.date);
      //alert(hub.date);
      //hub.date = hub.date.toDateString();
      hub.recurring_end = new Date(hub.recurring_end);
    }
    this.addForm = hub;
    //this.autocompleteSettings['inputString'] = hub.address;
    //this.searchData = { address: hub.address, lat: hub.lat, lng: hub.lng };
    this.aboutActiveTab = 'create';
    this.successMsg = '';
    this.postImgData = '';
    setTimeout(() => {
      // debugger;
      let autocomplete = new google.maps.places.Autocomplete(
               /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
        { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", place.formatted_address);
        localStorage.setItem("lat", place.geometry.location.lat());
        localStorage.setItem("lng", place.geometry.location.lng());
      });
    }, 1000);
  }

  public editGroupTab(groupId) {

    this.groupEditId = groupId;
    let dataUserDet = {
      "group_id": this.groupEditId
    };
    this.dataService.getGroupDetById(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.groupEditDataJson = data.GroupDetails[0];
        this.showPostImgDive = true;
        //this.postImgData=this.groupEditDataJson.group_image;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
    this.aboutActiveTab = 'edit_group';
    this.successMsg = '';
    this.postImgData = '';
  }

  public getHubCategories() {
    this.hubService.getHubCategories().subscribe(data => {
      if (data.Ack == "1") {
        this.catList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public getFriendList() {
    this.dataService.searchFrndListByName({ suname: "", user_id: this.loginUserId })
      .subscribe(
      data => {
        this.loading = false;
        //console.log(data);
        if (data.Ack == '1') {
          this.userSearchFrndList = data.FriendListById;
          this.userSearchFrndList.forEach((color: { name: string, id: string }) => {
            this.items.push({
              id: color.id,
              text: color.name
            });
          });
        } else {
          this.userSearchFrndList = [];
        }
        //console.log(data);
        //this.postform.reset();
      },
      error => {
        alert(error);
      });
  }
  private ReturnDayFromDate(date: Date) {
    let result: any;
    let day = date.getDay();
    switch (day) {
      case 0: {
        result = 'Sunday';
        break;
      }
      case 1: {
        result = 'Monday';
        break;
      }
      case 2: {
        result = 'Tuesday';
        break;
      }
      case 3: {
        result = 'Wednesday';
        break;
      }
      case 4: {
        result = 'Thursday';
        break;
      }
      case 5: {
        result = 'Friday';
        break;
      }
      case 6: {
        result = 'Saturday';
        break;
      }
      default: {
        result = 'Sunday';
        break;
      }
    }
    return result;
  }

  // ngAfterViewInit() {
  //   let autocomplete = new google.maps.places.Autocomplete(
  //     /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
  //     { types: ['geocode'] });
  //   google.maps.event.addListener(autocomplete, 'place_changed', function () {
  //     var place = autocomplete.getPlace();
  //     this.searchData = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng()};
  //   });
  // }
  public getMyHubRequest() {
    this.hubService.getMyHubRequest(this.loginUserId).subscribe(data => {
      if (data.Ack == "1") {
        this.hubRequestList = data.details;
        if (this.hubRequestList.length && this.hubRequestList.length > 0) {
          for (var i = 0; i < this.hubRequestList.length; i++) {
            if (this.hubRequestList[i].type == 'R') {
              if (this.hubRequestList[i].recurring_start)
                this.hubRequestList[i].day = this.ReturnDayFromDate(new Date(this.hubRequestList[i].recurring_start));
            }
          }
        }
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public acceptHubRequest(hub) {

    this.hubService.acceptHubRequest({ hub_id: hub.hub_id, user_id: this.loginUserId }).subscribe(data => {
      this.getMyHubRequest();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public rejectHubRequest(hub) {

    this.hubService.rejectHubRequest({ hub_id: hub.hub_id, user_id: this.loginUserId }).subscribe(data => {
      this.getMyHubRequest();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  // public createGroupPost() {
  //   this.loading = true;
  //   const userValue = this.postform.value;
  //   userValue.user_id = this.loginUserId;
  //   userValue.image = this.postImgData;

  //   this.dataService.createGroupDataSend(userValue)
  //     .subscribe(
  //     data => {
  //       this.showPostImgDive = false;
  //       this.loading = false;
  //       this.successMsg = 'Successfully create the group';
  //       this.postform.reset();
  //       this.getMyGroupListData();
  //     },
  //     error => {
  //       alert(error);
  //     });

  // }

  // public getGroupRequestList() {
  //   let dataUserDet = {
  //     "user_id": this.loginUserId
  //   };
  //   this.dataService.getmyRequestGroupList(dataUserDet).subscribe(data => {
  //     if (data.Ack == "1") {
  //       this.groupRequestList = data.UserGroupRequest;
  //     }
  //   },
  //     error => {
  //       console.log('Something went wrong!');
  //     }
  //   );
  // }



  public getMyGroupListData() {
    let dataUserDet = {
      "user_id": this.loginUserId
    };
    this.dataService.getmyGroupList(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.groupList = data.GroupListByuserID;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }



  public editGroupPost() {
    this.loading = true;
    const userValue = this.postform.value;
    userValue.id = this.groupEditId;
    userValue.image = this.postImgData;

    this.dataService.editGroupDataSend(userValue).subscribe(data => {
      this.showPostImgDive = false;
      this.loading = false;
      this.successMsg = 'Successfully edit the hub';
      this.postform.reset();
      this.getMyGroupListData();
      this.aboutActiveTab = 'overview';
    },
      error => {
        alert(error);
      });
  }



  public requestGroupAction(pid, type) {
    this.loading = true;
    if (pid != '') {
      const dataUserDet = {
        "id": pid,
        "request_type": type
      };
      this.dataService.responseGroupRequestByUser(dataUserDet).subscribe(data => {
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        //this.router.navigateByUrl('/group/details/'+this.groupNameByUrl);
        this.router.navigateByUrl('/user/profile');
        //window.location.reload();
        //this.getGroupMemberList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }
  closeModal(updateCoverPictureModal) {
    if (this.modalRef) {
      const that = this;
      this.$uploadCrop.croppie('result', {
        type: 'canvas',
        size: 'viewport'
      }).then(function (resp) {
        if (resp == 'data:,') {
        }
        else {
          that.coverImgData = resp;
        }
        that.modalRef.close();
      })
    }
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
  resetCover() {
    $(".upload-demo-wrap").hide();
    this.IsShowCropperCoverImage = false;
  }

  public fileChangePost($event) {
    this.showPostImgDive = true;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.postImgData = image.src;
      //that.cropper.setImage(image);
      //console.log(image.src);
    };
    myReader.readAsDataURL(file);
  }

  public aboutToggleTab(data: any) {
    this.successMsg = '';
    this.errorMsg = '';
    this.postImgData = '';
    this.aboutActiveTab = data;
    this.showPostImgDive = false;
    this.postform.reset();
  }

}
