import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";

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
  public groupEditDataJson={};

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
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

    this.dataService.createGroupDataSend(userValue)
      .subscribe(
      data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully create the group';
        this.postform.reset();
        this.getMyGroupListData();
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

    this.dataService.editGroupDataSend(userValue)
      .subscribe(
      data => {
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
