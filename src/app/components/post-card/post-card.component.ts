import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SocialService } from "../../frontend/socialhome/social.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  public commentform: FormGroup;
  public IsloginUserId: any;
  public isLoggedIn: any;
  public postCmtId: any;
  //public postCmtDiv:boolean = false;public postCmtDiv:any = {};
  public postCmtHtml:string = '';
  public userPrfImgStr:string = '';
  public userNameStr:string = '';
  public getCurrentUser:any;
  public currentDate : Date = new Date();

  @Input() postData: {
    id: number;
    name: string;
    created_date_mod: string;
    file_name?: string;
    file_image_url: string;
    description: string;
    likecount: string;
    commentcount: string;
    created_date: string;
  };
  constructor(
    private builder: FormBuilder,
    private dataService: SocialService,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.getCurrentUser=localStorage.getItem("currentUser");
    this.getCurrentUser=JSON.parse(this.getCurrentUser);
    this.IsloginUserId = localStorage.getItem("loginUserId");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    this.userPrfImgStr=this.getCurrentUser.image_url;  
    this.userNameStr=this.getCurrentUser.name;
    this.commentform = builder.group({
      comment: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]]
    });
  }

  ngOnInit() {
    
  }

  public userPostComment(post_id, postdata) {
    if (this.isLoggedIn == 1) {
      this.postCmtId = post_id;
    } else {
      this.router.navigateByUrl('/user/login');
    }
    Object.keys(this.postCmtDiv).forEach(h => {
      this.postCmtDiv[h] = false;
    });
    this.postCmtDiv[postdata.id] = true;

    this.postCmtHtml='';
  }
  
  public submitPostComment(){
      if(this.isLoggedIn==1){
      
      }else{
        this.router.navigateByUrl('/user/login');
      }
      var userValue = this.commentform.value;
      userValue.user_id = this.IsloginUserId;   
      userValue.post_id = this.postCmtId;  
      
      this.dataService.userPostDataSend(userValue)
        .subscribe(
              data => {
                  /*this.showPostImgDive=false;
                  //let details = data;
                  this.loading = false;
                  this.successMsg='Successfully post data';
                  this.getUserPostDetails();*/
                  this.commentform.reset();
                
        },
        error => {
          alert(error);
        });

      this.postCmtHtml+='<div class="reply-comment-wrapper"><div class="left-comment-content">'
      //this.postCmtHtml+='<div class="user-image" [ngStyle]="{'background-image':'url('+cmtList.profile_image_url+')', 'background-position': 'center', 'background-repeat': 'no-repeat','background-size': 'center'}"></div>'
      this.postCmtHtml+='</div><div class="right-comment-content"><div class="profTextPart">'
      this.postCmtHtml+='<h4 class="commentee-name">'+this.userNameStr+'</h4>'
      this.postCmtHtml+='<p class="post-date">{{currentDate | dateFormat: "dd MMM yyyy"}}</p>';
      this.postCmtHtml+='<div class="commenteeComment">'
      this.postCmtHtml+='<p>'+userValue.comment+'</p></div></div></div></div>';
  }
  
}
