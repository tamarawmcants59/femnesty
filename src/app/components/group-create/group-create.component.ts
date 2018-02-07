
import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "../hub-create/hub.service";
import { SelectModule } from "../../../../node_modules/ng2-select";
//import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";
import { Subject } from 'rxjs/Subject';
import { GrouplistComponent } from '../../frontend/group/grouplist/grouplist.component';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
declare var google: any;
declare var jquery: any;
declare var $: any;
@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css'],
  providers: [GrouplistComponent]
})
export class GroupCreateComponent implements OnInit, AfterViewInit {
  public postform: FormGroup;
  //public editPostform: FormGroup;
  loading: boolean;
  showPostImgDive: boolean;
  errorMsg: string = '';
  successMsg: string = '';
  createGroupSuccessMsg: string = '';
  createGroupErrorMsg: string = '';
  $uploadCrop: any;
  postImgData: any;
  coverImgData: any;
  croppedImage: any = '';
  modalRef: any;
  public showProfileCrop = false;
  public aboutActiveTab: string = '';
  //public aboutActiveTab: string = 'overview';
  public loginUserDet: Object = {};
  public loginUserId: any;
  IsShowCropperCoverImage = false;
  modalErrorMsg: any;
  public groupList: any;
  public groupEditId: any;
  public groupRequestList = [];
  public groupEditDataJson = {};
  public searchData = { address: '', lat: '', lng: '' }
  public catList = [];
  public countryList = [];
  public address_required: boolean = false;
  public groupReqSuccessMsg: string = '';
  /*public autocompleteSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Type anything and you will get a location *',
  };
  public autocompleteSettings1: any;*/
  @ViewChild("groupListSuccessMsgDiv") groupListSuccessMsgDiv: ElementRef;
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private hubService: HubService,
    private route: ActivatedRoute,
    private router: Router,
    private groupListComp: GrouplistComponent,
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
        let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", JSON.stringify(address_data));
      });

    }, 1000);


    this.router.events.subscribe(event => {
      const eventObj: any = event;
      const self = this;
      if (event.constructor.name === "ResolveStart") {
        if (eventObj.state.url.includes('group/add_group')) {
          setTimeout(() => {
            // debugger;
            let autocomplete = new google.maps.places.Autocomplete(
                /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
              { types: ['geocode'] });
            google.maps.event.addListener(autocomplete, 'place_changed', function () {
              var place = autocomplete.getPlace();
              let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
              localStorage.setItem("address", JSON.stringify(address_data));
              //console.log(localStorage.getItem("address"));
            });
          }, 1000);
        }
      }
    });

    this.postform = builder.group({
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
      group_type: ['1', [
        Validators.required
      ]],
      cat_id: ['', [
        Validators.required
      ]],
      year_est: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]],
      address: ['', [
        //Validators.required
      ]],
      postal_code: ['', [
        Validators.required
      ]],
      cemail: ['', [
        Validators.required
      ]],
      phone: ['', [
      ]],
      long_desc: ['', [

      ]]
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
  ngAfterViewInit() {
    this.router.events.subscribe(event => {
      if (event.constructor.name === "ResolveStart") {
        const eventObj: any = event;
        const self = this;
        if (eventObj.state.url.includes('group/overview')) {

          setTimeout(function () {
            var elements = document.getElementsByClassName('bottomList');
            if (elements.length > 0)
              elements[0].scrollIntoView();
          }, 100)

        }
        else if (eventObj.state.url.includes('group/add_group')) {
          setTimeout(function () {
            var elements = document.getElementsByClassName('bottomList');
            if (elements.length > 0)
              elements[0].scrollIntoView();
          }, 100)
        }
        else if (eventObj.state.url.includes('group/group_request')) {
          setTimeout(function () {
            var elements = document.getElementsByClassName('bottomList');
            if (elements.length > 0)
              elements[0].scrollIntoView();
          }, 100)

        }


      }
    });
  }
  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.aboutActiveTab = params['slug_name'];
      //console.log(this.bookSlugName);
    });
    this.getMyGroupListData();
    this.getGroupRequestList();
    this.getHubCategories();
    this.getTotCounteyList();
  }


  /*autoCompleteCallback1(data: any): any {
    this.searchData = { address: data.data.description, lat: data.data.geometry.location.lat, lng: data.data.geometry.location.lng };
  }*/

  public getTotCounteyList() {
    this.dataService.getCountryList().subscribe(data => {
      if (data.Ack == 1) {
        this.countryList = data.country_list;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
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

  public editGroupTab(groupId) {

    this.groupEditId = groupId;
    let dataUserDet = {
      "group_id": this.groupEditId
    };
    setTimeout(() => {
      // debugger;
      let autocomplete = new google.maps.places.Autocomplete(
               /** @type {HTMLInputElement} */(document.getElementById('autocomplete1')),
        { types: ['geocode'] });
      google.maps.event.addListener(autocomplete, 'place_changed', function () {
        var place = autocomplete.getPlace();
        let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
        localStorage.setItem("address", JSON.stringify(address_data));

      });
    }, 1000);

    const self = this;
    this.dataService.getGroupDetById(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.groupEditDataJson = data.GroupDetails[0];
        this.postform.setValue({
          group_name: self.groupEditDataJson['group_name'] == null ? '' : self.groupEditDataJson['group_name'],
          image: self.groupEditDataJson['image'] == null ? '' : self.groupEditDataJson['image'],
          short_desc: self.groupEditDataJson['short_desc'] == null ? '' : self.groupEditDataJson['short_desc'],
          group_type: self.groupEditDataJson['group_type'] == null ? '' : self.groupEditDataJson['group_type'],
          cat_id: self.groupEditDataJson['cat_id'] == null ? '' : self.groupEditDataJson['cat_id'],
          year_est: self.groupEditDataJson['year_est'] == null ? '' : self.groupEditDataJson['year_est'],
          country: self.groupEditDataJson['country'] == null ? '' : self.groupEditDataJson['country'],
          city: self.groupEditDataJson['city'] == null ? '' : self.groupEditDataJson['city'],
          address: self.groupEditDataJson['address'] == null ? '' : self.groupEditDataJson['address'],
          postal_code: self.groupEditDataJson['postal_code'] == null ? '' : self.groupEditDataJson['postal_code'],
          cemail: self.groupEditDataJson['cemail'] == null ? '' : self.groupEditDataJson['cemail'],
          phone: self.groupEditDataJson['phone'] == null ? '' : self.groupEditDataJson['phone'],
          long_desc: self.groupEditDataJson['long_desc'] == null ? '' : self.groupEditDataJson['long_desc']
        });
        self.address_required = self.groupEditDataJson['address'] == null ? true : false;
        if (self.address_required == false) {
          self.searchData.address = self.groupEditDataJson['address'];
        }
        //let add = data.GroupDetails[0].address;
        this.showPostImgDive = true;
        /*this.autocompleteSettings1 = {
          showSearchButton: false,
          showCurrentLocation: false,
          inputPlaceholderText: 'Type anything and you will get a location *',
          "inputString": data.GroupDetails[0].address
        };*/
        //this.postImgData=this.groupEditDataJson.group_image;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
    this.aboutActiveTab = 'edit_group';
    this.successMsg = '';
    this.errorMsg = '';
    this.postImgData = '';
  }

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

  public createGroupPost() {
    if (this.postform.valid) {
      this.loading = true;
      const that = this;
      const userValue = this.postform.value;
      userValue.user_id = this.loginUserId;
      if (this.coverImgData)
        userValue.image = this.coverImgData;
      else
        userValue.image = '';
      that.searchData = JSON.parse(localStorage.getItem("address"));
      if (that.searchData.address && that.searchData.lat) {
        const zipCode = userValue.postal_code;
        if (zipCode) {
          //debugger;
          const self = that;
          let geocoder = new google.maps.Geocoder;
          geocoder.geocode({ 'address': zipCode }, function (results, status) {
            if (status === 'OK') {
              self.createGroupErrorMsg = '';
              userValue.address = self.searchData.address;
              self.dataService.createGroupDataSend(userValue)
                .subscribe(
                data => {
                  self.showPostImgDive = false;
                  self.loading = false;
                  self.createGroupSuccessMsg = 'Successfully created the group.';
                  this.coverImgData='';
                  self.postform.reset();
                  localStorage.setItem("address", JSON.stringify({ address: '', lat: '', lng: '' }));
                  window.scrollTo(0, 0);
                  self.getMyGroupListData();
                  //self.searchData.address = '';
                  self.address_required = false;
                  self.groupListComp.loadGroupList();
                },
                error => {
                  alert(error);
                });
            } else {
              window.scrollTo(0, 0);
              self.createGroupErrorMsg = "Please give a valid postal code.";
            }
          });
        }

      }
      else {
        window.scrollTo(0, 0);
        that.address_required = true;
      }


    }


    //localStorage.getItem("address");



  }

  public editGroupPost() {
    debugger;
    this.loading = true;
    const userValue = this.postform.value;
    userValue.id = this.groupEditId;
    userValue.image = this.postImgData;
    this.searchData = JSON.parse(localStorage.getItem("address"));
    //if (this.searchData.address && this.searchData.lat) {
    const self = this;
    if (this.searchData.address && this.searchData.lat) {
      userValue.address = this.searchData.address;
    } else {
      userValue.address = userValue.address;
    }

    if (userValue.address) {
      //userValue.address = this.searchData.address;
      const zipCode = userValue.postal_code;
      if (zipCode) {
        //debugger;

        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'address': zipCode }, function (results, status) {
          if (status === 'OK') {
            self.createGroupErrorMsg = '';
            //userValue.address = self.searchData.address;
            self.dataService.editGroupDataSend(userValue).subscribe(data => {

              self.showPostImgDive = false;
              self.loading = false;
              self.successMsg = 'Successfully edited the group';
              self.postform.reset();
              //window.scrollTo(0, 0);
              setTimeout(function () {
                self.groupListSuccessMsgDiv.nativeElement.scrollIntoView();
              }, 200);
              localStorage.setItem("address", JSON.stringify({ address: '', lat: '', lng: '' }));
              self.getMyGroupListData();
              self.address_required = false;
              self.aboutActiveTab = 'overview';
              self.groupListComp.loadGroupList();
            },
              error => {
                alert(error);
              });
          } else {
            window.scrollTo(0, 0);
            self.errorMsg = "Please give a valid postal code.";
          }
        });
      }

    }
    else {
      window.scrollTo(0, 0);
      this.address_required = true;
    }

  }
  leaveGroup(groupId) {
    let data = { user_id: this.loginUserId, group_id: groupId };
    this.dataService.leaveGroup(data).subscribe(data => {
      if (data.Ack == 1) {
        this.groupReqSuccessMsg = "You have successfully unfollowed this group.";
        this.getGroupRequestList();
      }
    }, error => {
      console.log("Error");
    })
  }
  public getGroupRequestList() {
    let dataUserDet = {
      "user_id": this.loginUserId
    };
    this.dataService.getmyRequestGroupList(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.groupRequestList = data.UserGroupRequest;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }

  public requestGroupAction(pid, type) {
    this.loading = true;
    if (pid != '') {
      const dataUserDet = {
        "id": pid,
        "request_type": type
      };
      this.dataService.responseGroupRequestByUser(dataUserDet).subscribe(data => {
        this.groupReqSuccessMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.groupReqSuccessMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        this.getGroupRequestList();
        //this.router.navigateByUrl('/group/details/'+this.groupNameByUrl);
        //this.router.navigateByUrl('/user/profile');
        //window.location.reload();
        //this.getGroupMemberList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
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
  resetCover() {
    $(".upload-demo-wrap").hide();
    this.IsShowCropperCoverImage = false;
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
  public aboutToggleTab(data: any) {
    localStorage.setItem("address", JSON.stringify({ address: '', lat: '', lng: '' }));
    this.successMsg = '';
    this.errorMsg = '';
    this.postImgData = '';
    this.aboutActiveTab = data;
    this.showPostImgDive = false;
    this.postform.reset();
  }
}
