import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';


@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.css']
})
export class EditprofileComponent implements OnInit {
  @ViewChild('cropper', undefined) 
  cropper:ImageCropperComponent;
  public activeTab:string ='activity';
  public aboutActiveTab:string ='overview';
  public showImgDive:boolean =false;
  public showCoverImgDive:boolean =false;
  public showPostImgDive:boolean =false;
  public form:FormGroup;
  public postform:FormGroup;
  returnUrl: string;
  errorMsg: string='';
  successMsg: string='';
  public loading = false;
  public loginUserDet: Object = {};
  public userPostList =[];
  
  prfImageData: any;
  coverImageData: any;
  postImgData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  
  constructor(
    private builder:FormBuilder, 
    private dataService: UserService, 
    private route: ActivatedRoute,
    private router: Router
  ) { 
    //super();
    let getUserDet = localStorage.getItem("currentUser");
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
    //this.coverCropperSettings.minWidth = 250;
    //this.coverCropperSettings.minHeight = 100;
    this.coverImageData = {};

    this.form = builder.group({
			first_name: ['', [
				Validators.required,
				Validators.minLength(3)
			]],
			last_name: ['', [
				Validators.required,
				Validators.minLength(3)
			]],
			/*email: ['', [
				Validators.required,
				//BasicValidators.email
				Validators.pattern("[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?")
			]],*/
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
       occupation: ['', [
			   Validators.required,
			   //Validators.minLength(3)
			 ]],
       bio: ['', [
			   //Validators.required,
			   //Validators.minLength(3)
			 ]]

    });

    this.postform = builder.group({
			description: ['', [
				Validators.required,
				Validators.minLength(3)
			]],
      file_name: ['', [
			   //Validators.required,
			   //Validators.minLength(3)
			 ]],
       is_connection: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]] 
    });
    
    //console.log(this.cropper);
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.getUserDetails();
    this.getUserPostDetails();
  }

  public getUserDetails(){
    let loginUserId=localStorage.getItem("loginUserId");
    if(loginUserId!=''){
        let dataUserDet ={
          "id": loginUserId
        };
        this.dataService.getUserDetById(dataUserDet)
        .subscribe(data => {
              let details=data;
              //console.log(details);
              if (details.Ack=="1") {
                this.loginUserDet = details.UserDetails[0];
              }else{
                
              }
          },
          error => {
            
          }
        ); 
      }else{
      }

    }

    public getUserPostDetails(){
      let loginUserId=localStorage.getItem("loginUserId");
      if(loginUserId!=''){
          let dataUserDet ={
            "user_id": loginUserId
          };
          this.dataService.getUserPostById(dataUserDet)
          .subscribe(data => {
                let details=data;
                if (details.Ack=="1") {
                  this.userPostList = details.ActivePostByUser;
                  //console.log(this.userPostList);
                }else{
                  
                }
            },
            error => {
              
            }
          ); 
        }else{
        }
  
      }

    public updateAccount() {
      this.loading = true;
      let loginUserId=localStorage.getItem("loginUserId");
      var result,
              userValue = this.form.value;
      userValue.id = loginUserId;        
      //console.log(userValue);  
      this.dataService.updateAccountDet(userValue)
        .subscribe(
              data => {

                  let details = data;
                  localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
                  localStorage.setItem('userName', details.UserDetails.first_name);
                  localStorage.setItem('profile_image', details.UserDetails.image_url);
                  this.loading = false;
                  this.successMsg='Data updated successfully';
                  //this.router.navigateByUrl('/user/profile');
                  this.router.navigate(['/user/profile']);
            
        },
        error => {
          alert(error);
        });
  
    }
    
    public submitPost() {
      this.loading = true;
      let loginUserId=localStorage.getItem("loginUserId");
      var result,
      userValue = this.postform.value;
      userValue.user_id = loginUserId;   
      userValue.file_name = this.postImgData;      
      //console.log(userValue);  
      
      this.dataService.postDataSend(userValue)
        .subscribe(
              data => {
                  this.showPostImgDive=false;
                  //let details = data;
                  this.loading = false;
                  this.successMsg='Successfully post data';
                  this.getUserPostDetails();
                  this.postform.reset();
                
                  //window.location.reload();
                  //this.router.navigateByUrl('/user/profile');
                  //this.router.navigate(['/user/profile']);
            
        },
        error => {
          alert(error);
        });
  
    }

    public fileChangeListener($event) {
        this.showImgDive=true;
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            //console.log(that.cropper);
        };
        myReader.readAsDataURL(file);
    }
    
    public fileChangeListenerCover($event) {
        this.showCoverImgDive=true;
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.cropper.setImage(image);
            //console.log(that.cropper);
        };
        myReader.readAsDataURL(file);
    }
    
    public fileChangePost($event) {
        this.showPostImgDive=true;
        var image:any = new Image();
        var file:File = $event.target.files[0];
        var myReader:FileReader = new FileReader();
        var that = this;
        myReader.onloadend = function (loadEvent:any) {
            image.src = loadEvent.target.result;
            that.postImgData= image.src;
            //that.cropper.setImage(image);
            //console.log(image.src);
        };
        myReader.readAsDataURL(file);
    }

    public cropped(bounds:Bounds) {
        //console.log(bounds);
    }

    public UploadPrfImg() {
      //console.log(this.cropper.image.image);
      this.loading = true;
      let loginUserId=localStorage.getItem("loginUserId");
      let uploadJsonData={
        "id": loginUserId, 
        "profile_image": this.cropper.image.image
       };
       //console.log(uploadJsonData);
       this.dataService.updateImgService(uploadJsonData)
       .subscribe(
             data => {
              this.loading = false;
              this.showImgDive = false;
              this.getUserDetails();
              this.router.navigateByUrl('/user/profile');
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
      let loginUserId=localStorage.getItem("loginUserId");
      let uploadJsonData={
        "id": loginUserId, 
        "cover_img": this.cropper.image.image
       };
       //console.log(uploadJsonData);
       this.dataService.updateImgService(uploadJsonData)
       .subscribe(
             data => {
              this.loading = false;
              this.showCoverImgDive = false;
              this.getUserDetails();
              //this.router.navigateByUrl('/user/profile');
       },
       error => {
         alert(error);
       });
    }

    /*public onReturnData(data: any) {
        // Do what you want to do
        console.warn(JSON.parse(data));
    }*/
    public toggleTab(data: any){
        //console.log(data);
        this.activeTab=data;
        this.successMsg='';
        this.errorMsg='';
    }

    public aboutToggleTab(data: any){
        this.successMsg='';
        this.errorMsg='';
        this.aboutActiveTab=data;
    }
    
}
