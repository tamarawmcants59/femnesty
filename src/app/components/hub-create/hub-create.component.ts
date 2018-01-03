import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "./hub.service";

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
  public addForm = {};

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
      short_desc: ['', [
        Validators.required
      ]],
      description: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
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
    this.getMyGroupListData();
    // this.getGroupRequestList();
    this.getHubList();
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

  public createHub() {
    this.loading = true;
    const userValue = this.postform.value;
    userValue.user_id = this.loginUserId;
    userValue.image = this.postImgData;
    console.log(userValue);
    this.hubService.createNewHub(userValue).subscribe(
      data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully create the group';
        this.postform.reset();
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
    this.aboutActiveTab = 'add_group';
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
      this.successMsg = 'Successfully edit the group';
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
