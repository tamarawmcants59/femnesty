import { Component, OnInit, ViewChild,Type } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
//import {Ng2Bs3ModalModule} from "ng2-bs3-modal/ng2-bs3-modal";
//import {Bounds} from "ng2-img-cropper/src/model/bounds";
//@ViewChild('cropper', undefined)
//cropper:ImageCropperComponent;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  //declarations: [ImageCropperComponent]
  //directives: [ImageCropperComponent]
})

export class DashboardComponent implements OnInit {
//export class DashboardComponent extends Type {  
  @ViewChild('cropper', undefined) 
  cropper:ImageCropperComponent;

  public form:FormGroup;
  //public email:AbstractControl;
  //public password:AbstractControl;
  returnUrl: string;
  errorMsg: string='';
  public loading = false;
  public loginUserDet: Object = {};
  prfImageData: any;
  coverImageData: any;
  prfCropperSettings: CropperSettings;
  coverCropperSettings: CropperSettings;
  public loginuserId: number;

  constructor(
    private builder:FormBuilder, 
    private dataService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    //private cropper: ImageCropperComponent
  ) { 
    //super();
    let getUserDet = localStorage.getItem("currentUser");
    this.loginUserDet = JSON.parse(getUserDet);
    //console.log(loginUserDet.id);
    /*this.cropperSettings = new CropperSettings();
    this.cropperSettings.noFileInput = true;
    this.data = {};*/

    this.prfCropperSettings = new CropperSettings();
    this.prfCropperSettings.width = 200;
    this.prfCropperSettings.height = 200;
    this.prfCropperSettings.keepAspect = false;

    this.prfCropperSettings.croppedWidth = 200;
    this.prfCropperSettings.croppedHeight = 200;

    this.prfCropperSettings.canvasWidth = 500;
    this.prfCropperSettings.canvasHeight = 300;

    this.prfCropperSettings.minWidth = 100;
    this.prfCropperSettings.minHeight = 100;

    this.prfCropperSettings.rounded = true;
    this.prfCropperSettings.minWithRelativeToResolution = false;
    this.prfCropperSettings.cropperDrawSettings.strokeColor = 'rgba(255,255,255,1)';
    this.prfCropperSettings.cropperDrawSettings.strokeWidth = 2;
    this.prfCropperSettings.noFileInput = true;

    this.prfImageData = {};

    this.coverCropperSettings = new CropperSettings();
    //this.cropperSettings.noFileInput = true;
    this.coverCropperSettings.width = 100;
    this.coverCropperSettings.height = 100;
    this.coverCropperSettings.croppedWidth = 100;
    this.coverCropperSettings.croppedHeight = 100;
    this.coverCropperSettings.canvasWidth = 400;
    this.coverCropperSettings.canvasHeight = 300;

    this.coverImageData = {};
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    //console.log(this.loginUserDet);
    this.getUserDetails();
    //console.log(this.loginUserDet);
  }

  public getUserDetails(){
    let loginUserId=localStorage.getItem("loginUserId");
    //this.loginuserId=localStorage.getItem("loginUserId");
    if(loginUserId!=''){
        let dataUserDet ={
          "id": parseInt(loginUserId)
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

  public userUploadPrfImg(values:Object):void {
      /*if(values!=''){
        let signupCheckEmail={
          "email": values
        };
        this.dataService.userCheckEmail(signupCheckEmail)
        .subscribe(data => {
              let details=data;
              //console.log(details);
              if (details.Ack=="1") {
                  this.checkEmailExist = false;
                  return false;
              }else{
                //alert('Invalid login');
                this.checkEmailExist = true;
                return false;
              }
          },
          error => {
            
          }
        ); 
      }else{

      }*/
  }

  public fileChangeListener($event) {
      var image:any = new Image();
      var file:File = $event.target.files[0];
      var myReader:FileReader = new FileReader();
      var that = this;
      //console.log(this.cropper);
      myReader.onloadend = function (loadEvent:any) {
          image.src = loadEvent.target.result;
          console.log(image);
          that.cropper.setImage(image);
      };
      myReader.readAsDataURL(file);
  }
  
  public cropped(bounds:Bounds) {
      console.log(bounds);
  }

}


/*@NgModule({
  //imports: [ BrowserModule ],
  declarations: [ ImageCropperComponent ],
  //bootstrap: [ DashboardComponent ]
})
export class AppModule {}*/