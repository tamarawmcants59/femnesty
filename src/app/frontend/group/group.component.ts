import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../user/user.service";
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import * as _ from "lodash";
declare var jquery: any;
declare var $: any;
declare var google: any;
@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupNameByUrl: string = '';
  public isloginUserId: any;
  public isUserLogin: any;
  public showProfileCrop = false;
  modalErrorMsg: any;
  croppedImage: any = '';
  isShowPrivateGroupAction = false;
  actionId: any;
  public isGroupId = "";
  public groupDetailsData: any;
  public group_name: any;
  public year_est: any;
  IsShowRejectMessage = false;
  public cat_id: any;
  public country: any;
  public city: any;
  public address: any;
  editErrorMsg: any;
  public postal_code: any;
  public phone: any;
  public email: any;
  public long_desc: any;
  coverImageChangedEvent: any = '';
  public showCoverCrop = false;
  public short_desc: any;
  coverCroppedImage: any = '';
  public searchErrorMessage: any;
  public IsShowCropperCoverImage = false;
  $uploadCrop: any;

  //public groupPidData: object = { };
  public groupPostList = [];
  public groupMemberList = [];
  public groupallMemberList = [];
  public userFrndList = [];
  public totaluserFrndList = [];
  public requestGrpJoinList = [];
  public filetredFriendList = [];
  public allgrupstatus: any;
  searchName: any;
  qtd = {};
  private connectionsPageSize = 5;
  IsShowTopViewMore = false;
  private IsShow: boolean = false;
  //public userPostList =[];
  public activeTab: string = 'activity';
  //public aboutActiveTab: string = 'overview';
  public successMsg: string = '';
  public errorMsg: string = '';
  public isJoinGroup: boolean = true;
  public allgroupstatusset = '';
  public loading = false;
  public groupPostDetData: object = {};
  public IsGroupAdmin = false;
  public catList = [];
  public countryList = [];
  public editAbtActiveTab: any;
  public form: FormGroup;

  @ViewChild("fileTypeEdit") fileTypeEdit: ElementRef;
  @ViewChild("addressEdit") addressEdit: ElementRef;
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router,
    private builder: FormBuilder,
    private modalService: NgbModal
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");



    this.form = builder.group({
      group_name: ['', [
        Validators.required
      ]],
      year_est: ['', [
        Validators.required
      ]],
      cat_id: ['', [
        Validators.required
      ]],
      country: ['', [
        Validators.required
      ]],
      city: ['', [
        Validators.required
      ]],
      address: ['', [
        Validators.required
      ]],
      postal_code: ['', [
        Validators.required
      ]],
      email: ['', [
        Validators.required
      ]],
      phone: ['', [
        Validators.required
      ]]
      ,
      short_desc: ['', [
        Validators.required
      ]]
      ,
      long_desc: ['', [

      ]]



    });
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupNameByUrl = params['gname'];
    });
    this.getGroupDetailsByName();
    this.getHubCategories();
    this.getTotCounteyList();

  }
  openFile() {
    this.fileTypeEdit.nativeElement.click();
  }

  checkPrivateGroupsStatus() {
    const loginUserId = localStorage.getItem("loginUserId");
    const data = { user_id: loginUserId, group_id: this.isGroupId };
    this.loading = true;
    this.dataService.checkPrivateGroupsStatus(data).subscribe(data => {
      if (data.Ack == 1) {
        this.loading = false;
        if (data.RequestsList[0].request_type == "0") {
          this.isShowPrivateGroupAction = true;
          this.actionId = data.RequestsList[0].id;
        }
        else {
          this.actionId = "";
          this.isShowPrivateGroupAction = false;
        }

      }
      else {
        this.loading = false;
      }
    }, error => {
      this.loading = false;
    })

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
    this.dataService.getHubCategories().subscribe(data => {
      if (data.Ack == "1") {
        this.catList = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }
  searchConnections(value) {
    if (value) {
      this.IsShowTopViewMore = false;
      value = value.toLowerCase();
      let searchResult = this.totaluserFrndList.filter(item => {
        if (item.name.toLowerCase().search(value) !== -1) {
          return item;
        }
      });
      if (searchResult && searchResult.length) {
        this.filetredFriendList = [];
        for (var i = 0; i < searchResult.length; i++) {
          this.filetredFriendList.push(searchResult[i]);
        }
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
  acceptReject(status) {
    this.loading = true;
    const data = { "id": this.actionId, "request_type": status };
    this.dataService.responsePrivateGroupRequestByUser(data).subscribe(
      data => {
        this.loading = false;
        if (status == "2") {
          this.getGroupDetailsByName();
        }
        else {
          this.isShowPrivateGroupAction=false;
          this.IsShowRejectMessage = true;
        }

      },
      error => {
        alert(error);
        this.loading = false;
      });
  }
  openUpdateCoverProModal(updateCoverPictureModal) {

    // this.showCoverCrop = false;
    // this.coverCroppedImage = '';
    // this.modalService.open(updateCoverPictureModal);
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
          image: resp, id: that.groupDetailsData.id
        };
        that.dataService.editGroupDataSend(uploadJsonData)
          .subscribe(
          data => {
            that.loading = false;
            that.getGroupDetailsByName();
            window.location.reload();
          },
          error => {
            alert(error);
          });
      }

    });
    //console.log(this.cropper.image.image);
    // this.loading = true;
    // const data = { image: this.coverCroppedImage, id: this.groupDetailsData.id }
    // this.dataService.editGroupDataSend(data).subscribe(data => {
    //   this.loading = false;
    //   this.getGroupDetailsByName();
    //   window.location.reload();
    // },
    //   error => {
    //     this.loading = false;
    //     alert('Sorry there is some error.')
    //   });

  }
  fileChangePost($event) {
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    this.loading = true;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      //that.groupDetailsData.image = image.src;
      const data = { image: image.src, id: that.groupDetailsData.id }
      that.dataService.editGroupDataSend(data).subscribe(data => {
        that.loading = false;
        that.getGroupDetailsByName();
      },
        error => {
          that.loading = false;
          alert('Sorry there is some error.')
        });
    };
    myReader.readAsDataURL(file);
  }


  public getGroupDetailsByName() {
    if (this.groupNameByUrl != '') {
      const dataUserDet = {
        "group_slug": this.groupNameByUrl
      };
      this.dataService.getGrpDetBySlug(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupDetailsData = data.GroupDetails[0];
            //alert(JSON.stringify(this.groupDetailsData))
            //console.log(this.groupDetailsData);
            this.isGroupId = data.GroupDetails[0].id;
            if (this.isloginUserId == data.GroupDetails[0].user_id) {
              this.IsGroupAdmin = true;
            }
            localStorage.setItem("groupAdmin", data.GroupDetails[0].user_id);
            this.groupPostDetData = { activitytype: '2', activityid: this.isGroupId };
            //this.groupPidData = { 'groupId': this.isGroupId};
            //console.log(this.groupPidData);
            //this.getUserPostDetails();
            this.getUserPostDetails();
            this.getGroupMemberList();
            this.checkMyFrndList();
            this.checkPrivateGroupsStatus();
          }
          else {
            this.router.navigateByUrl('/user/edit_profile/activity');

          }
        },
        error => {

        });
    }
  }

  public checkMyFrndList() {
    let grpOwnerId = localStorage.getItem("groupAdmin");
    if (this.isloginUserId == grpOwnerId) {
      this.myFrndListforGrp();
    } else {
      this.myOwnFrndListforGrp();
    }
    //myOwnFrndListforGrp
  }
  /*public getUserPostDetails(){
    if(this.isGroupId!=''){
        let dataUserDet ={
          "user_id": this.isGroupId,
          "page_no": 1
        };
        this.dataService.getGroupPostListById(dataUserDet).subscribe(data => {
              let details=data;
              if (data.Ack=="1") {
                this.userPostList = details.AllPost;
              }
          },
          error => {
            
          }); 
    }
  }*/

  public getUserPostDetails() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "page_no": 1,
        "group_id": this.isGroupId,
        "type": '2'
      };
      this.dataService.getGroupPostById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupPostList = data.AllPost;
          }
        },
        error => {

        });
    }
  }

  public getGroupMemberList() {
    if (this.isGroupId != '') {
      const dataUserDet = {
        "group_id": this.isGroupId
      };
      this.dataService.getGroupMemberListById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupMemberList = data.groupMembers;
            if (this.isUserLogin == '1') {
              let joinItemData = this.groupMemberList.filter(item => item.user_id == this.isloginUserId);
              if (joinItemData.length > 0) {
                this.isJoinGroup = false;
              }
              else {
                this.isJoinGroup = true;
              }
            }
          }
          //console.log(this.userFrndList);
        },
        error => {

        });

      this.dataService.getGroupRequestMemberListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.requestGrpJoinList = data.AllPendingGrouprequest;
        }
      },
        error => { });

      this.dataService.getGroupReqMemberListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.groupallMemberList = data.groupMembers;
          //alert(this.isUserLogin);
          let reqjoinItemData = this.groupallMemberList.filter(item => item.user_id == this.isloginUserId);
          if (reqjoinItemData.length > 0) {
            this.allgrupstatus = reqjoinItemData;
            this.allgroupstatusset = this.allgrupstatus[0].request_type;
          }
          else {
            this.allgroupstatusset = '';
          }

        }
      },
        error => { });

    }
  }

  public joinGroupRequest(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.joinGroupRequestByUser(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          this.successMsg = '';
          this.errorMsg = '';
          if (data.Ack == "1") {
            this.successMsg = data.msg;
            this.getGroupMemberList();
            this.getGroupDetailsByName();
          } else {
            this.errorMsg = data.msg;
          }
          this.loading = false;
          //this.successMsg = 'You have successfully send the request.';
        },
        error => {

        });
    }
  }

  public LeaveGroupRequest(join_uid) { //alert(join_uid);
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.leaveGroup(dataUserDet).subscribe(data => {

        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.message;
          this.getGroupMemberList();
          this.getGroupDetailsByName();
        } else {
          this.errorMsg = data.message;
        }

        this.loading = false;
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }

  public CancelGroupRequest(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.cancelGroupRequestByUser(dataUserDet).subscribe(data => {
        //console.log(data);
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          //alert(data.message);
          this.successMsg = data.message;
          this.getGroupMemberList();
          this.getGroupDetailsByName();
        } else {
          this.errorMsg = data.message;
        }
        this.loading = false;
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }

  public myFrndListforGrp() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId,
        "group_id": this.isGroupId
      };
      //console.log(dataUserDet);
      this.dataService.getAllUserListforGrp(dataUserDet).subscribe(data => {
        //this.dataService.getUserGrpFrndListById(dataUserDet).subscribe(data => {
        if (data.Ack == "1") {
          // this.userFrndList = data.groupMembersPrivate;
          this.userFrndList = [];
          if (data.groupMembersPrivate.length > 5) {
            this.IsShowTopViewMore = true;
            for (let i = 0; i < data.groupMembersPrivate.length; i++) {
              if (this.userFrndList.length < 5) {
                this.userFrndList.push(data.groupMembersPrivate[i]);
              }
            }

          }
          else {
            this.IsShowTopViewMore = false;
            this.userFrndList = data.groupMembersPrivate;
          }

          this.totaluserFrndList = data.groupMembersPrivate;
          //console.log(this.userFrndList);
        }
      }, error => {

      });
    }
  }
  viewMore() {
    this.connectionsPageSize = this.connectionsPageSize + 5;
    this.userFrndList = [];
    if (this.totaluserFrndList.length > this.connectionsPageSize) {
      this.IsShowTopViewMore = true;
    }
    else {
      this.IsShowTopViewMore = false;
    }
    for (let i = 0; i < this.connectionsPageSize; i++) {
      if (this.totaluserFrndList[i]) {
        this.userFrndList.push(this.totaluserFrndList[i]);
      }

    }
  }
  public myOwnFrndListforGrp() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId,
        "group_id": this.isGroupId
      };
      //console.log(dataUserDet);
      this.dataService.getUserGrpFrndListById(dataUserDet).subscribe(data => {
        if (data.Ack == "1") {
          // this.userFrndList = data.groupMembersPrivate;
          this.userFrndList = [];
          if (data.groupMembersPrivate.length > 5) {
            this.IsShowTopViewMore = true;
            for (let i = 0; i < data.groupMembersPrivate.length; i++) {
              if (this.userFrndList.length < 5) {
                this.userFrndList.push(data.groupMembersPrivate[i]);
              }
            }

          }
          else {
            this.IsShowTopViewMore = false;
            this.userFrndList = data.groupMembersPrivate;
          }

          this.totaluserFrndList = data.groupMembersPrivate;
          //console.log(this.userFrndList);
        }
      }, error => {

      });
    }
  }

  public inviteFrndAsGroupMember(join_uid) {
    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "reffer_id": this.isloginUserId,
        "user_id": join_uid
      };
      this.dataService.inviteMemberTojoinGroup(dataUserDet).subscribe(data => {
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        this.checkMyFrndList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }

  public addGroupMember(join_uid, index) {


    this.loading = true;
    if (join_uid != '') {
      const dataUserDet = {
        "group_id": this.isGroupId,
        "user_id": join_uid
      };
      this.dataService.joinGroupMemberByAdmin(dataUserDet).subscribe(data => {
        //console.log(data);
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;

        if (this.groupDetailsData.group_type == "2") {
          this.qtd[join_uid] = true;
        }
        else {
          this.getGroupMemberList();
          this.checkMyFrndList();
          this.filetredFriendList = [];
        }

        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }
  }
  openEdit(type) {
    this.editErrorMsg = '';
    if (type == 'name') {
      if (this.group_name) {
        this.short_desc = '';
        this.cat_id = '';
        this.long_desc = '';
        this.phone = '';
        this.country = '';
        this.year_est = '';
        this.postal_code = '';
        this.city = '';
        this.email = '';
        this.loading = true;
        const data = { group_name: this.group_name, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.group_name = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.short_desc = '';
        this.year_est = '';
        this.long_desc = '';
        this.email = '';
        this.city = '';
        this.postal_code = '';
        this.cat_id = '';
        this.country = '';
        this.phone = '';
        this.group_name = this.groupDetailsData.group_name;
      }

    }
    else if (type == 'short_desc') {
      if (this.short_desc) {
        this.group_name = '';
        this.year_est = '';
        this.long_desc = '';
        this.cat_id = '';
        this.email = '';
        this.city = '';
        this.postal_code = '';
        this.phone = '';
        this.country = '';
        this.loading = true;
        const data = { short_desc: this.short_desc, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.short_desc = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.group_name = '';
        this.year_est = '';
        this.long_desc = '';
        this.country = '';
        this.phone = '';
        this.city = '';
        this.postal_code = '';
        this.cat_id = '';
        this.email = '';
        this.short_desc = this.groupDetailsData.short_desc;
      }
    }
    else if (type == 'long_desc') {
      if (this.long_desc) {
        this.group_name = '';
        this.year_est = '';
        this.country = '';
        this.short_desc = '';
        this.cat_id = '';
        this.postal_code = '';
        this.phone = '';
        this.city = '';
        this.email = '';
        if (this.long_desc == 'Long Description') {
          this.long_desc = '';
        }
        else {
          this.loading = true;
          const data = { long_desc: this.long_desc, id: this.groupDetailsData.id }
          this.dataService.editGroupDataSend(data).subscribe(data => {
            this.long_desc = '';
            this.loading = false;
            this.getGroupDetailsByName();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }


      }
      else {
        this.group_name = '';
        this.year_est = '';
        this.short_desc = '';
        this.country = '';
        this.phone = '';
        this.cat_id = '';
        this.postal_code = '';
        this.city = '';
        this.email = '';
        if (this.groupDetailsData.long_desc)
          this.long_desc = this.groupDetailsData.long_desc;
        else
          this.long_desc = "Long Description"
      }
    }
    else if (type == 'year_est') {
      if (this.year_est) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.country = '';
        this.cat_id = '';
        this.postal_code = '';
        this.city = '';
        this.short_desc = '';
        this.long_desc = '';
        this.loading = true;
        const data = { year_est: this.year_est, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.year_est = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.cat_id = '';
        this.postal_code = '';
        this.phone = '';
        this.city = '';
        this.country = '';
        this.email = '';
        this.long_desc = '';
        this.year_est = this.groupDetailsData.year_est;
      }
    }
    else if (type == 'email') {
      if (this.email) {
        this.group_name = '';
        this.short_desc = '';
        this.cat_id = '';
        this.postal_code = '';
        this.long_desc = '';
        this.country = '';
        this.city = '';
        this.year_est = '';
        this.phone = '';
        if (this.validateEmail(this.email)) {

          this.loading = true;
          const data = { cemail: this.email, id: this.groupDetailsData.id }
          this.dataService.editGroupDataSend(data).subscribe(data => {
            this.email = '';
            this.loading = false;
            this.getGroupDetailsByName();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
        else {
          this.editErrorMsg = "Please give a valid email.";
          window.scrollTo(0, 0);
        }

      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.cat_id = '';
        this.postal_code = '';
        this.country = '';
        this.long_desc = '';
        this.phone = '';
        this.city = '';
        this.year_est = '';
        this.email = this.groupDetailsData.cemail;
      }
    }
    else if (type == 'phone') {
      if (this.phone) {
        this.group_name = '';
        this.short_desc = '';
        this.cat_id = '';
        this.country = '';
        this.postal_code = '';
        this.long_desc = '';
        this.year_est = '';
        this.city = '';
        this.email = '';
        if (this.phone == 'Enter phone') {
          this.phone = '';
        }
        else {
          this.loading = true;
          const data = { phone: this.phone, id: this.groupDetailsData.id }
          this.dataService.editGroupDataSend(data).subscribe(data => {
            this.phone = '';
            this.loading = false;
            this.getGroupDetailsByName();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.long_desc = '';
        this.year_est = '';
        this.cat_id = '';
        this.postal_code = '';
        this.country = '';
        this.city = '';
        this.email = '';
        if (this.groupDetailsData.phone)
          this.phone = this.groupDetailsData.phone;
        else
          this.phone = "Enter phone";
      }
    }
    else if (type == 'city') {
      if (this.city) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.short_desc = '';
        this.cat_id = '';
        this.postal_code = '';
        this.long_desc = '';
        this.country = '';
        this.year_est = '';
        this.loading = true;
        const data = { city: this.city, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.city = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.phone = '';
        this.cat_id = '';
        this.email = '';
        this.long_desc = '';
        this.postal_code = '';
        this.country = '';
        this.city = this.groupDetailsData.grp_city;
        this.year_est = '';
      }
    }
    else if (type == 'country') {
      if (this.country) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.short_desc = '';
        this.long_desc = '';
        this.year_est = '';
        this.cat_id = '';
        this.postal_code = '';
        this.city = '';
        this.loading = true;
        const data = { country: this.country, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.country = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.phone = '';
        this.cat_id = '';
        this.email = '';
        this.postal_code = '';
        this.long_desc = '';
        this.city = '';
        this.year_est = '';
        this.country = this.groupDetailsData.country;
      }
    }
    else if (type == 'postal_code') {
      if (this.postal_code) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.short_desc = '';
        this.long_desc = '';
        this.city = '';
        this.cat_id = '';
        this.country = '';
        this.year_est = '';
        this.loading = true;
        const self = this;
        let geocoder = new google.maps.Geocoder;
        geocoder.geocode({ 'address': this.postal_code }, function (results, status) {
          if (status === 'OK') {
            const data = { postal_code: self.postal_code, id: self.groupDetailsData.id }
            self.dataService.editGroupDataSend(data).subscribe(data => {
              self.postal_code = '';
              self.loading = false;
              self.getGroupDetailsByName();
            },
              error => {
                self.loading = false;
                alert('Sorry there is some error.')
              });
          } else {
            self.loading = false;
            window.scrollTo(0, 0);
            self.editErrorMsg = "Please give a valid postal code.";
          }
        });
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.phone = '';
        this.email = '';
        this.long_desc = '';
        this.country = '';
        this.city = '';
        this.cat_id = '';
        this.year_est = '';
        this.postal_code = this.groupDetailsData.postal_code;
      }
    }
    else if (type == 'cat_id') {
      if (this.cat_id) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.short_desc = '';
        this.long_desc = '';
        this.year_est = '';
        this.postal_code = '';
        this.city = '';
        this.country = '';
        this.loading = true;
        const data = { cat_id: this.cat_id, id: this.groupDetailsData.id }
        this.dataService.editGroupDataSend(data).subscribe(data => {
          this.cat_id = '';
          this.loading = false;
          this.getGroupDetailsByName();
        },
          error => {
            this.loading = false;
            alert('Sorry there is some error.')
          });
      }
      else {
        this.group_name = '';
        this.short_desc = '';
        this.phone = '';
        this.email = '';
        this.postal_code = '';
        this.long_desc = '';
        this.city = '';
        this.year_est = '';
        this.cat_id = this.groupDetailsData.cat_id;
        this.country = '';
      }
    }
    else if (type == 'address') {
      if (this.address) {
        this.group_name = '';
        this.phone = '';
        this.email = '';
        this.short_desc = '';
        this.long_desc = '';
        this.year_est = '';
        this.postal_code = '';
        this.city = '';
        this.country = '';
        this.cat_id = '';
        this.loading = true;
        if (localStorage.getItem("address")) {
          let addressData = JSON.parse(localStorage.getItem("address"));
          const data = { address: addressData.address, lat: addressData.lat, lng: addressData.lng, id: this.groupDetailsData.id };
          this.dataService.editGroupDataSend(data).subscribe(data => {
            this.cat_id = '';
            this.loading = false;
            this.getGroupDetailsByName();
          },
            error => {
              this.loading = false;
              alert('Sorry there is some error.')
            });
        }

      }
      else {
        setTimeout(function () {
          let autocomplete = new google.maps.places.Autocomplete(
    /** @type {HTMLInputElement} */(document.getElementById('autocomplete')),
            { types: ['geocode'] });
          google.maps.event.addListener(autocomplete, 'place_changed', function () {
            var place = autocomplete.getPlace();
            let address_data = { address: place.formatted_address, lat: place.geometry.location.lat(), lng: place.geometry.location.lng() };
            localStorage.setItem("address", JSON.stringify(address_data));

          });
        }, 100)
        this.group_name = '';
        this.short_desc = '';
        this.phone = '';
        this.email = '';
        this.postal_code = '';
        this.long_desc = '';
        this.city = '';
        this.year_est = '';
        this.cat_id = '';
        this.country = '';
        this.address = this.groupDetailsData.address;

        // this.addressEdit.nativeElement.style.display = "block";
      }
    }


  }

  private validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  public requestGroupAction(pid, type) {
    this.loading = true;
    if (pid != '') {
      const dataUserDet = {
        "id": pid,
        "request_type": type
      };
      this.dataService.responseGroupRequestByAdmin(dataUserDet).subscribe(data => {
        //console.log(data);
        this.successMsg = '';
        this.errorMsg = '';
        if (data.Ack == "1") {
          this.successMsg = data.msg;
        } else {
          this.errorMsg = data.msg;
        }
        this.loading = false;
        //this.getGroupMemberList();
        for (let i = 0; i < this.requestGrpJoinList.length; i++) {
          if (this.requestGrpJoinList[i].id == pid) {
            this.requestGrpJoinList[i].isPressed = true;
            if (type == "2") {
              this.requestGrpJoinList[i].text = "You have accepted the request."
            }
            else {
              this.requestGrpJoinList[i].text = "You have declined the request."
            }
            break;
          }
        }
        this.getGroupMemberList();
        this.router.navigateByUrl('/group/details/' + this.groupNameByUrl);
        //this.getGroupMemberList();
        //this.successMsg = 'You have successfully send the request.';
      },
        error => {

        });
    }

  }
  resetCover() {
    // this.showCoverCrop = false;
    // this.coverCroppedImage = "";
    $(".upload-demo-wrap").hide();
    this.IsShowCropperCoverImage = false;
  }
  coverImageCropped(image: string) {
    this.coverCroppedImage = image;
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
  public fileChangeListenerCover($event) {

    this.showCoverCrop = true;
    this.coverImageChangedEvent = $event;
  }
  public toggleTab(data: any) {
    //console.log(data);
    this.activeTab = data;
    this.successMsg = '';
    this.errorMsg = '';
  }
  public editAboutToggleTab(data: any) {
    this.editAbtActiveTab = data;
    this.successMsg = '';
    this.errorMsg = '';
    //console.log(data);
  }
  public updateGroup() {
    this.loading = true;

    const data1 = this.form.value;
    data1.id = this.groupDetailsData.id;
    this.loading = true;
    const data = { group_name: this.group_name, id: this.groupDetailsData.id }
    this.dataService.editGroupDataSend(data1).subscribe(data1 => {
      // this.group_name = '';
      this.loading = false;
      this.editAbtActiveTab = '';
      this.getGroupDetailsByName();
    },
      error => {
        this.loading = false;
        alert('Sorry there is some error.')
      });


  }
}
