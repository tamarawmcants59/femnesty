import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "./hub.service";
import { SelectModule } from "../../../../node_modules/ng2-select";
import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";
import { AmazingTimePickerService } from 'amazing-time-picker';

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
  successMsg: string = '';
  postImgData: any;
  public aboutActiveTab: string = 'overview';
  public loginUserDet: Object = {};
  public loginUserId: any;
  public groupList: any;
  public groupEditId: any;
  public hubList = [];
  public groupEditDataJson = {};
  public addForm = { type: 'O', category_id:'',privacy:'O'};
  public catList=[];
  public userSearchFrndList=[];
  public items = [];
  public hubRequestList = [];
  public searchData = {address:'',lat:'',lng:''};
  public today = new Date().toJSON().split('T')[0];
  public autocompleteSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Type anything and you will get a location',
  };
  public hubReqTab = 1;

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private hubService: HubService
  ) {
    this.postform = builder.group({
      id:['',[]],
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
      recurring_start: ['', [
        Validators.required
      ]],
      recurring_end: ['', [
        Validators.required
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
    if(this.aboutActiveTab=='create'){
      this.resetAddPage();
    }else if(this.aboutActiveTab=='request'){
      this.getMyHubRequest();
    }
  }

  public resetAddPage(){
    this.addForm = { type: 'O', category_id: '', privacy: 'O' };
    this.searchData = { address: '', lat: '', lng: '' };
    this.autocompleteSettings['inputString'] = '';
  }
  
  public getHubList(){
    this.hubService.getmyRequestGroupList(this.loginUserId).subscribe(data => {
      //console.log(data)
      if (data.Ack == "1") {
        this.hubList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }

  autoCompleteCallback1(data: any): any {
    console.log(data);
    this.searchData = {address:data.data.description,lat:data.data.geometry.location.lat,lng:data.data.geometry.location.lng};
  }

  public createHub() {
    this.loading = true;
    const userValue = this.postform.value;
    userValue.user_id = this.loginUserId;
    userValue.image = this.postImgData;
    console.log(userValue);
    if (this.searchData.address && this.searchData.lat)
    {
      userValue.address = this.searchData.address;
      userValue.lat = this.searchData.lat;
      userValue.lng = this.searchData.lng;
    }
    this.hubService.createNewHub(userValue).subscribe(
      data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Hub Created Successfully';
        this.postform.reset();
        this.aboutActiveTab = 'overview';
        window.scrollTo(0, 0);
        this.getHubList();
      },
      error => {
        alert(error);
      });
  }

  public editHubTab(hub){
    // this.postform = hub;
    console.log(hub);
    this.addForm = hub;
    this.autocompleteSettings['inputString'] = hub.address;
    this.aboutActiveTab = 'create';
    this.successMsg = '';
    this.postImgData = '';
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

  public getHubCategories(){
    this.hubService.getHubCategories().subscribe(data => {
      if (data.Ack == "1") {
        this.catList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public getFriendList(){
    this.dataService.searchFrndListByName({suname:"", user_id: this.loginUserId})
      .subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data.Ack == '1') {
          this.userSearchFrndList = data.FriendListById;
          this.userSearchFrndList.forEach((color: { name: string, id: string }) => {
            this.items.push({
              id: color.id,
              text: color.name
            });
          });
        } else {
          this.userSearchFrndList =[];
        }
        //console.log(data);
        //this.postform.reset();
      },
      error => {
        alert(error);
      });
  }

  public getMyHubRequest(){
    this.hubService.getMyHubRequest(this.loginUserId).subscribe(data => {
      console.log('category details ', data);
      if (data.Ack == "1") {
        this.hubRequestList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public acceptHubRequest(hub){
    
    this.hubService.acceptHubRequest({hub_id:hub.hub_id,user_id:this.loginUserId}).subscribe(data=>{
      console.log(data);
      this.getMyHubRequest();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public rejectHubRequest(hub) {

    this.hubService.rejectHubRequest({ hub_id: hub.hub_id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
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
