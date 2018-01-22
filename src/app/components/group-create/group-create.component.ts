
import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "../hub-create/hub.service";
import { SelectModule } from "../../../../node_modules/ng2-select";
import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";
import {Subject} from 'rxjs/Subject';
import {GrouplistComponent} from '../../frontend/group/grouplist/grouplist.component';
@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent implements OnInit {
  public postform: FormGroup;
  //public editPostform: FormGroup;
  loading: boolean;
  showPostImgDive: boolean;
  errorMsg: string = '';
  successMsg: string = '';
  createGroupSuccessMsg: string = '';
  createGroupErrorMsg: string = '';
  postImgData: any;
  public aboutActiveTab: string = '';
  //public aboutActiveTab: string = 'overview';
  public loginUserDet: Object = {};
  public loginUserId: any;
  public groupList: any;
  public groupEditId: any;
  public groupRequestList = [];
  public groupEditDataJson = {};
  public searchData = { address: '', lat: '', lng: '' }
  public catList = [];
  public countryList = [];
  public address_required: boolean = false;
  public groupReqSuccessMsg: string = '';
  public autocompleteSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Type anything and you will get a location *',
  };
  public autocompleteSettings1: any;
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private hubService: HubService,
    private route: ActivatedRoute,
    private router: Router,
    private groupListComp:GrouplistComponent
  ) {
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


  autoCompleteCallback1(data: any): any {
    this.searchData = { address: data.data.description, lat: data.data.geometry.location.lat, lng: data.data.geometry.location.lng };
  }

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
    const self=this;
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
        if(self.address_required==false)
        {
          self.searchData.address=self.groupEditDataJson['address'];
        }
        //let add = data.GroupDetails[0].address;
        this.showPostImgDive = true;
        this.autocompleteSettings1 = {
          showSearchButton: false,
          showCurrentLocation: false,
          inputPlaceholderText: 'Type anything and you will get a location *',
          "inputString": data.GroupDetails[0].address
        };
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
    this.loading = true;
    const userValue = this.postform.value;
    userValue.user_id = this.loginUserId;
    userValue.image = this.postImgData;

    if (this.searchData.address) {
      userValue.address = this.searchData.address;
      //userValue.lat = this.searchData.lat;
      //userValue.lng = this.searchData.lng;
      this.dataService.createGroupDataSend(userValue)
        .subscribe(
        data => {
          this.showPostImgDive = false;
          this.loading = false;
          this.createGroupSuccessMsg = 'Successfully created the group';
          this.postform.reset();
          window.scrollTo(0, 0);
          this.getMyGroupListData();
          this.searchData.address = '';
          this.address_required = false;
          this.groupListComp.loadGroupList();
        },
        error => {
          alert(error);
        });
    }
    else {
      this.address_required = true;
    }


  }

  public editGroupPost() {
    this.loading = true;
    const userValue = this.postform.value;
    userValue.id = this.groupEditId;
    userValue.image = this.postImgData;
    if (this.searchData.address) {
      userValue.address = this.searchData.address;
      this.dataService.editGroupDataSend(userValue).subscribe(data => {

        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully edited the group';
        this.postform.reset();
        window.scrollTo(0, 0);
        this.getMyGroupListData();
        this.address_required = false;
        this.aboutActiveTab = 'overview';
        this.groupListComp.loadGroupList();
      },
        error => {
          alert(error);
        });
    }
    else {
      this.address_required = true;
    }

  }
  leaveGroup(groupId) {
    let data = { user_id: this.loginUserId, group_id: groupId };
    this.dataService.leaveGroup(data).subscribe(data => {
      if (data.Ack == 1) {
        this.groupReqSuccessMsg = "You have successfully unfollowed this group.";
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
