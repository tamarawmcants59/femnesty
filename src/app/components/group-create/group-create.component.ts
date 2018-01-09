import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { HubService } from "../hub-create/hub.service";
import { SelectModule } from "../../../../node_modules/ng2-select";
import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";

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
  postImgData: any;
  public aboutActiveTab: string = 'overview';
  public loginUserDet: Object = {};
  public loginUserId: any;
  public groupList: any;
  public groupEditId: any;
  public groupRequestList = [];
  public groupEditDataJson={};
  public searchData = {address:'',lat:'',lng:''}
  public catList=[];
  public countryList=[];

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private hubService: HubService,
    private route: ActivatedRoute,
    private router: Router
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
      group_type: ['', [
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
    this.getMyGroupListData();
    this.getGroupRequestList();
    this.getHubCategories();
    this.getTotCounteyList();
  }

  
  autoCompleteCallback1(data: any): any {
    this.searchData = {address:data.data.description,lat:data.data.geometry.location.lat,lng:data.data.geometry.location.lng};
  }

  public getTotCounteyList(){
    this.dataService.getCountryList().subscribe(data => {
      if (data.Ack == 1) {
        this.countryList = data.country_list;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
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

  public editGroupTab(groupId){
    
    this.groupEditId=groupId;
    let dataUserDet ={
      "group_id": this.groupEditId
    };
    this.dataService.getGroupDetById(dataUserDet).subscribe(data=>{
        if (data.Ack=="1") {
            this.groupEditDataJson = data.GroupDetails[0];
            this.showPostImgDive=true;
            //this.postImgData=this.groupEditDataJson.group_image;
        }
      },
      error => {
        console.log('Something went wrong!');
      }); 
    this.aboutActiveTab='edit_group';
    this.successMsg = '';
    this.postImgData = '';
  }
  
  public getMyGroupListData(){
    let dataUserDet ={
      "user_id": this.loginUserId
    };
    this.dataService.getmyGroupList(dataUserDet).subscribe(data=>{
        if (data.Ack=="1") {
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

    if (this.searchData.address){
      userValue.address = this.searchData.address;
      //userValue.lat = this.searchData.lat;
      //userValue.lng = this.searchData.lng;
    }
    this.dataService.createGroupDataSend(userValue)
      .subscribe(
      data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully create the group';
        this.postform.reset();
        this.getMyGroupListData();
        this.searchData.address='';
      },
      error => {
        alert(error);
      });

  }
  
  public editGroupPost() {
    this.loading = true;
    const userValue = this.postform.value;
    userValue.id = this.groupEditId;
    userValue.image = this.postImgData;
    if (this.searchData.address){
      userValue.address = this.searchData.address;
    }
    this.dataService.editGroupDataSend(userValue).subscribe(data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully edit the group';
        this.postform.reset();
        this.getMyGroupListData();
        this.aboutActiveTab='overview';
      },
      error => {
        alert(error);
      });
  }
  
  public getGroupRequestList(){
    let dataUserDet ={
      "user_id": this.loginUserId
    };
    this.dataService.getmyRequestGroupList(dataUserDet).subscribe(data=>{
        if (data.Ack=="1") {
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
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            this.successMsg = data.msg;
          }else{
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
    this.showPostImgDive=false;
    this.postform.reset();
  }
}
