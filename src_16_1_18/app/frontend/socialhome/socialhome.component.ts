import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { SocialService } from "./social.service";
import {ImageCropperComponent, CropperSettings, Bounds} from 'ng2-img-cropper';

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
  
  constructor(
    private builder:FormBuilder, 
    private dataService: SocialService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    let loginUserId=localStorage.getItem("loginUserId");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    let getUserDet = localStorage.getItem("currentUser");
    this.loginUserDet = JSON.parse(getUserDet);
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
   }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.groupPostDetData = {activitytype:'', activityid:''};
    this.getUserPostDetails();
    this.getLastFourArticle();
    //console.log(this.IsloginUserId);
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

}
