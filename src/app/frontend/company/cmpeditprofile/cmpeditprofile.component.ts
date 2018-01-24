import { Component,NgModule, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { CompanyService } from "../company.service";
//import { Ng4GeoautocompleteModule } from "../../../../node_modules/ng4-geoautocomplete";
//import { Ng4GeoautocompleteModule } from "../../../../../node_modules/ng4-geoautocomplete";
// import { SelectModule } from "../../../../node_modules/ng2-select";
//import { SelectModule } from "../../../../node_modules/ng2-select";
//import { UserService } from "../../user/user.service";
import { ImageCropperComponent, CropperSettings, Bounds } from 'ng2-img-cropper';
//import { Ng4GeoautocompleteModule } from "ng4-geoautocomplete";
@Component({
  selector: 'app-cmpeditprofile',
  templateUrl: './cmpeditprofile.component.html',
  styleUrls: ['./cmpeditprofile.component.css']
})
export class CmpEditprofileComponent implements OnInit {
  @ViewChild('cropper', undefined)
  cropper: ImageCropperComponent;
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'edit_details';
  public showImgDive: boolean = false;  
  public showCoverImgDive: boolean = false;
  public showPostImgDive: boolean = false;
  public form: FormGroup;
  public adminform: FormGroup;
  public postform: FormGroup;
  public editSubAdminId: string = '';
  public editSubAdmindata:object= { 
    email: '',
    txt_password: '',
    name: '',
    state: '',
    city: '',
    address: '',
    company_mission:'',
    company_vission:''
  };

  returnUrl: string;
  errorMsg: string = '';
  errorFriendrMsg: string = '';
  successMsg: string = '';
  public loading = false;
  public loginUserDet: object = { };
  public userPostList = [];
  public userFrndList = [];
  public userRequestList = [];
  public userEmployeeList = [];
  public userFollowerList = [];
  public cmpSubadminList = [];
  public userSearchFrndList=[];
  public items=[];
  public cmpId ='';
  public editAbtActiveTab: string = '';
  public publicCmpDet: object = { };
  public Getwebsite: object = { };
  public searchData = {address:'',lat:'',lng:''};

  public autocompleteSettings: any = {
    showSearchButton: false,
    showCurrentLocation: false,
    inputPlaceholderText: 'Type anything and you will get a location',
  };
  // public Getwebsite: {website:string };
public com_website :any;

public companyids :any;
  prfImageData: any;
  coverImageData: any;
  postImgData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  public groupPostDetData: object = { };
  public checkEmailExist:boolean = false;
  public domainmatch:boolean = false;
  public domainmatch1:boolean = false;
  
  constructor(
    private builder: FormBuilder,
    private dataService: CompanyService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    //super();
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
    this.postform = builder.group({
      user_ids: ['', [
        Validators.required
      ]]
    }); 
    this.form = builder.group({
      company_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      
      mobile_number: ['', [
        Validators.required,
        Validators.minLength(10)
      ]],
			/*dob: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],
			country: ['', [
			   Validators.required,
			   Validators.minLength(3)
			 ]],*/
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
      website: ['', [
        Validators.required,
        Validators.pattern('https?://.+')
      ]],
      opening_hour: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      company_mission: ['', [
        Validators.required,
        
      ]],
      company_vission: ['', [
        Validators.required,
        
      ]],
      
      bio: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]

    });

    this.adminform = builder.group({
      email: ['', [
        Validators.required,
        Validators.email,
        Validators.minLength(3)
      ]],
      txt_password: ['', [
        Validators.required
      ]],
			name: ['', [
        Validators.required
      ]],
			state: ['', [ ]],
			city: ['', [ ]],
      address: ['', [ ]],
      company_mission: ['', [ ]],
      company_vission: ['', [ ]]

    });
    
    //console.log(this.cropper);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getUserDetails();
    this.getRequestList();
    this.getEmployeeList();
    this.getFollowerList();
    this.getFollowerList();
    this.getFriendList();
    //console.log(this.loginUserDet);
  }

  public getFollowerList() {

    const loginUserId = localStorage.getItem("loginUserId");
    const logincomid = JSON.parse(localStorage.getItem("currentUser"));
    let comp_id = logincomid.company_uid;
    
    if(comp_id != 0)
      {
       
        this.companyids = comp_id;
      }
      else{
        this.companyids = loginUserId;
        //alert(company_id)
      }
    console.log(comp_id);
    if (loginUserId != '' && this.companyids !='') {
      
      //alert(company_id)
      const dataUserDet = {
        "company_id": this.companyids
      };
      console.log(dataUserDet);
      this.dataService.getCompanyFollowerList(dataUserDet)
        .subscribe(data => {
          const details = data;
          console.log(details);
          if (details.Ack == "1") {
            this.userFollowerList = details.CompanyFollowers;
          } else {
            this.userFollowerList = [];
          }
        },
        error => {

        }
        );
    } else {
    }

  }

  public getEmployeeList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "company_id": loginUserId
      };
      this.dataService.getCompanyEmployeetList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userEmployeeList = details.EmployeelistBycompanyID;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }
    
  }


  public getRequestList() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "company_id": loginUserId
      };
      this.dataService.getCompanyRequestList(dataUserDet)
        .subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.userRequestList = details.PendingEmployeelistBycompanyID;
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }
  }

  public getUserDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    localStorage.setItem("groupAdmin",loginUserId);
    if (loginUserId != '') {
      const dataUserDet = {
        "id": parseInt(loginUserId)
      };
      this.dataService.getUserDetById(dataUserDet).subscribe(data => {
          const details = data;
          //console.log(details);
          if (details.Ack == "1") {
            this.loginUserDet = details.UserDetails[0];
            if(details.UserDetails[0].user_type=='CA' || details.UserDetails[0].user_type=='CSA'){
              if(details.UserDetails[0].user_type=='CA'){
                this.publicCmpDet=details.UserDetails[0];
                this.autocompleteSettings['inputString'] = details.UserDetails[0].address;
                this.com_website = details.UserDetails[0].website;
                //alert(this.com_website);
                this.cmpId = details.UserDetails[0].id;
                this.getSubadminListByAdmin();
              }else if(details.UserDetails[0].user_type=='CSA'){
                this.cmpId = details.UserDetails[0].company_uid;
                
                this.dataService.getUserDetById({"id": parseInt(this.cmpId)}).subscribe(data => {
                  if (data.Ack == "1") {
                    this.publicCmpDet=data.UserDetails[0];
                  } 
                },
                error => {
        
                });
              }
              this.groupPostDetData = {activitytype:'3', activityid:this.cmpId};
            }else{
              this.router.navigate(['/user/profile']);
            }
            this.getUserPostDetails();
          } else {

          }
          
        },
        error => {

        });
    } else {
    }

  }
  
  public getSubadminListByAdmin(){
    const dataUserDet = {
      "company_id": this.cmpId
    };
    this.dataService.getSubadminListById(dataUserDet).subscribe(data => {
      const details = data;
      if (details.Ack == "1") {
        this.cmpSubadminList = details.subadminlist;
      } 
    },
    error => {
    });
    
  }
  public getUserPostDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "page_no": '1',
        "group_id": this.cmpId,
        "type": '3'
      };
      this.dataService.getUserPostById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userPostList = details.AllPost;
            //console.log(this.userPostList);
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }

  }

  public updateAccount() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
      userValue = this.form.value;
      console.log(userValue)
    userValue.id = loginUserId;
    // if (this.searchData.address && this.searchData.lat)
    // {
    //   userValue.address = this.searchData.address;
    //   userValue.lat = this.searchData.lat;
    //   userValue.lng = this.searchData.lng;
    // }
    this.dataService.updateAccountDet(userValue)
      .subscribe(
      data => {
        this.editAbtActiveTab = '';
        const details = data;
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        //this.router.navigateByUrl('/user/profile');
        this.router.navigate(['/company/profile']);
        this.searchData = { address: '', lat: '', lng: '' };
        this.autocompleteSettings['inputString'] = '';
      },
      error => {
        alert(error);
      });

  }

  public createEmployee() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
    userValue = this.form.value;
    userValue.id = loginUserId;
    this.dataService.createEmployeeDet(userValue)
      .subscribe(
      data => {

        /*const details = data;
        localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
        localStorage.setItem('userName', details.UserDetails.first_name);
        localStorage.setItem('profile_image', details.UserDetails.image_url);*/
        this.loading = false;
        this.successMsg = 'Data updated successfully';
        this.router.navigate(['/company/profile']);

      },
      error => {
        alert(error);
      });

  }

  public fileChangeListener($event) {
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

  public fileChangeListenerCover($event) {
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

  public cropped(bounds: Bounds) {
    //console.log(bounds);
  }

  public UploadPrfImg() {
    //console.log(this.cropper.image.image);
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": this.cmpId,
      "profile_image": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showImgDive = false;
        this.getUserDetails();
        //localStorage.setItem('profile_image', this.loginUserDet[0].image_url);
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
        //let details = data;
        //localStorage.setItem('profile_image', details.UserDetails.image_url);
        //this.successMsg='Data updated successfully';
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });

    //console.log(this.cropper.image);
  }

  public UploadCoverImg() {
    //console.log(this.cropper.image.image);
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": this.cmpId,
      "cover_img": this.cropper.image.image
    };
    //console.log(uploadJsonData);
    this.dataService.updateImgService(uploadJsonData)
      .subscribe(
      data => {
        this.loading = false;
        this.showCoverImgDive = false;
        this.getUserDetails();
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });
  }
  
  public deleteAdmin(del_id) {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": del_id
    };
    //console.log(uploadJsonData);
    this.dataService.deleteSubAdmin(uploadJsonData).subscribe(
      data => {
        this.loading = false;
        window.location.reload();
      },
      error => {
        alert(error);
      });
  }

  public RequestAccept(id, request_type){    
    const loginUserId = localStorage.getItem("loginUserId");
    const uploadJsonData = {
      "id": id,
      "request_type": request_type
    };
    //console.log(uploadJsonData);
    this.dataService.RequestAcceptReject(uploadJsonData)
      .subscribe(
      data => {
        if(data.Ack==1){
          this.successMsg='Accept successfull';
        }else{
          this.errorMsg='Reject';
        }          
        window.location.reload();
        //this.router.navigateByUrl('/user/profile');
      },
      error => {
        alert(error);
      });
  }

  public addSubadminForm() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
    userValue = this.adminform.value;
    userValue.company_uid = loginUserId;
    console.log(userValue)
    this.dataService.createCmpSubadmin(userValue).subscribe( data => {
        this.loading = false;
        this.successMsg = 'Admin added successfully';
        //this.router.navigate(['/company/profile']);
        this.adminform.reset();
        this.getSubadminListByAdmin();
      },error => {
        alert(error);
      });
  }
  
  public editSubadminForm() {
    this.loading = true;
    const userValue = this.adminform.value;
    userValue.id = this.cmpId;
    this.dataService.updateAccountDet(userValue).subscribe( data => {
        this.loading = false;
        this.successMsg = 'Admin edit successfully';
        //this.adminform.reset();
        this.getSubadminListByAdmin();
      },error => {
        alert(error);
      });
  }

  public editAdmin(edit_id) {
    this.loading = true;
    this.editSubAdminId=edit_id;
    const uploadJsonData = {
      "id": edit_id
    };
    //console.log(uploadJsonData);
    this.dataService.getUserDetById(uploadJsonData).subscribe( data => {
      //console.log(data);
        this.loading = false;
        this.editSubAdmindata=data.UserDetails[0];
        console.log(this.editSubAdmindata);
        this.aboutActiveTab = 'edit_subadmin';
      },
      error => {
        alert(error);
      });
  }
  autoCompleteCallback1(data: any): any {
    console.log(data);
    this.searchData = {address:data.data.description,lat:data.data.geometry.location.lat,lng:data.data.geometry.location.lng};
  //console.log(Ng4GeoautocompleteModule)
  }
  public checkCompanyurl(values:Object,email){
    //alert(email);
    if(values!=''){
      
      let signupCheckcompanyurl={"company_name": "","email":email,"website":values};
  //console.log(signupCheckcompanyname);
      this.dataService.userCheckCompanyurl(signupCheckcompanyurl).subscribe(data => {
             let details=data;
             console.log(data);
             if(details.domain_match == "1")
             { 
              this.domainmatch1 = false;
              //return false;
             }
             else{
              this.domainmatch1 = true;
               //return false;
             }
  
            //  if(details.Ack=="1") {
            //      this.checkCompanynameExist = false;
            //      //return false;
            //  }else{
            //    //alert('Invalid login');
            //    this.checkCompanynameExist = true;
            //   // return false;
            //  }
         },
         error => {
          console.log('details');
         }
       ); 
    }else{
  
    }
  }
  public checkEmail(values:Object):void {
   // console.log(this.com_website);
    
    // let web_val = web_get.website;
    //alert(this.com_website);
    if(values!=''){
      let signupCheckEmail={
        "email": values,
        "website":this.com_website
      };
      console.log(signupCheckEmail)
      this.dataService.userCheckEmail(signupCheckEmail)
      .subscribe(data => {
             let details=data;
             //console.log(details);
             if (details.Ack=="1") {
                 this.checkEmailExist = false;
                // return false;
             }else{
               //alert('Invalid login');
               this.checkEmailExist = true;
               //return false;
             }
             if(details.domain_match == "1")
             {
              this.domainmatch = false;
               //return false;
             }
             else {
              this.domainmatch = true;
               //return false;
             }
         },
         error => {
           
         }
       ); 
    }else{

    }
  }

  public getFriendList(){
    const loginUserId = localStorage.getItem("loginUserId");
    this.dataService.searchFrndListByName({suname:"", user_id: loginUserId})
      .subscribe(
      data => {
        this.loading = false;
        console.log(data);
        if (data.Ack == '1') {
          this.userSearchFrndList = data.FriendListById;
          console.log(this.userSearchFrndList);
          this.userSearchFrndList.forEach((color: { name: string, id: string }) => {
            this.items.push({
              id: color.id,
              text: color.name
            });
            // this.items = [{id:'1',text:'Amsterdam'},{id:'2',text: null}];
          });
        } else {
          this.userSearchFrndList =[];          
        }
        console.log( this.items);
        //this.postform.reset();
        
      },
      error => {
        alert(error);
      });
  }
  public sendInvites(){ 
     const userValue = this.postform.value;
     //console.log(userValue)
     userValue.company_id = localStorage.getItem("loginUserId");
     //console.log(userValue);
    this.dataService.sendInvites(userValue).subscribe(data => {
     // console.log(data);
      if (data.Ack == 1) {
        this.successMsg = 'Employee Added Successfully';
        this.postform.reset();
        //this.getUnivitedUsers();
      }else{
        this.errorFriendrMsg = data.msg;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

public follower_block(id)
{
  let follower_block={
    "follow_id": id
  };
  this.dataService.block_flower(follower_block).subscribe(data => {
    // console.log(data);
     if (data.Ack == 1) {
       this.successMsg = 'Follower blocked Successfully';
       this.getFollowerList();
       //this.getUnivitedUsers();
     }
   },
     error => {
       console.log('Something went wrong!');
     });
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
    this.adminform.reset();
  }
  public editAboutToggleTab(data: any) {
    this.editAbtActiveTab = data;
    this.successMsg = '';
    this.errorMsg = '';
    //console.log(data);
  }
}
