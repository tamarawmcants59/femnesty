import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialService } from "./social.service";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";

@Component({
  selector: 'app-socialhome',
  templateUrl: './socialhome.component.html',
  styleUrls: ['./socialhome.component.css']
})

export class SocialhomeComponent implements OnInit {
  public showPostImgDive:boolean =false;
  public postform:FormGroup;
  
  returnUrl: string;
  errorMsg: string='';
  successMsg: string='';
  public loading = false;
  public loginUserDet: Object = {};
  public userPostList =[];
  public latestArticles =[];
  postImgData: any;
  IsloginUserId: any;
  isLoggedIn:any;
  public postCmtId: any;
  public showCmtDiv:boolean = false;
  public groupPostDetData: object ={ };
  
  public rForm: FormGroup;
  public IsShowFeedForm = false;
  public isShowPlus = true;
  public loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  public homepageCls = '';
  public shhover = '';
  public email = '';
  constructor(
    private builder:FormBuilder, 
    private dataService: SocialService, 
    private route: ActivatedRoute,
    private router: Router,
    private dataService1: FrontendService,
    private fb: FormBuilder
  ) {
    let loginUserId=localStorage.getItem("loginUserId");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    let getUserDet = localStorage.getItem("currentUser");
    this.email = getUserDet;
    this.loginUserDet = JSON.parse(getUserDet);
    //alert(JSON.stringify(this.loginUserDet))
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
      ]] 
    });

      this.IsloginUserId=loginUserId;

      this.rForm = fb.group({
        'description': [null, Validators.compose([Validators.required])],
        'email': [null, Validators.compose([Validators.required, Validators.email])],
        'feedback': [null, Validators.compose([Validators.required])],
        'rating': [null, Validators.compose([Validators.required])],
      });
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.groupPostDetData = {activitytype:'', activityid:''};
    localStorage.setItem("groupAdmin", '');
    this.getUserPostDetails();
    this.getLastFourArticle();
    
  }

  public getLastFourArticle(){
    this.dataService.getFourArticleList()
    .subscribe(data => {
          let details=data;
          if (details.Ack=="1") {
            this.latestArticles = details.LastArticleList;
          }
          //console.log(this.latestArticles);
      },
      error => {
        
      }
    );
    
  }

  public getUserPostDetails(){
    
    if(this.isLoggedIn=='1'){
        let dataUserDet ={
          "user_id": this.IsloginUserId,
          "page_no": 1
        };
        this.dataService.getUserPostById(dataUserDet)
        .subscribe(data => {
              let details=data;
              if (details.Ack=="1") {
                this.userPostList = details.AllPost;
              }else{
                
              }
          },
          error => {
            
          }
        ); 
      }else{
        let dataUserDet ={
          "page_no": 1
        };
        this.dataService.getAllUserPost(dataUserDet)
        .subscribe(data => {
              let details=data;
              if (details.Ack=="1") {
                this.userPostList = details.ActivePostByUser;
              }else{
                
              }
          },
          error => {
            
          }
        ); 

      }
  }

  public submitPost() {
    this.loading = true;
    var result,
    userValue = this.postform.value;
    userValue.user_id = this.IsloginUserId;   
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
              
      },
      error => { 
        alert(error);
      });

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
      };
      myReader.readAsDataURL(file);
  }

  sendFeedBack() {
    this.loading = true;
    this.dataService1.giveFeedback(this.rForm.value).subscribe(data => {
      if (data.Ack == "1") {
        this.successMsg=data.msg;
        this.loading = false;
        this.rForm.reset();
      }
      else if(data.Ack == "0"){
        this.errorMsg=data.msg;
        this.loading = false;
      }
    }, error => {
      this.loading = false;
      console.log('Something went wrong!');
    });
  }
  openForm() {
    this.shhover = "feedhover";
    this.IsShowFeedForm = true;
    this.isShowPlus = false;
  }
  closeForm() {
    this.shhover = "";
    this.isShowPlus = true;
    this.IsShowFeedForm = false;
  }

}
