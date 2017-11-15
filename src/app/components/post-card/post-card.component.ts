import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { SocialService } from "../../frontend/socialhome/social.service";

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css']
})
export class PostCardComponent implements OnInit {
  public commentform:FormGroup;
  public IsloginUserId: any;
  public isLoggedIn:any;
  public postCmtId:any;
  //public postCmtDiv:boolean = false;
  public postCmtDiv:any = {};

  @Input() postData: {
    id: number;
    name: string;
    created_date_mod: string;
    file_name?: string;
    file_image_url: string;
    description: string;
    likecount: string;
    commentcount: string;
  };
  constructor(
    private builder:FormBuilder, 
    private dataService: SocialService, 
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.IsloginUserId=localStorage.getItem("loginUserId");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    this.commentform = builder.group({
			comment: ['', [
				Validators.required,
				//Validators.minLength(3)
			]]
    });
  }

  ngOnInit() {

  }

  public userPostComment(post_id, postdata){
    if(this.isLoggedIn==1){
      this.postCmtId=post_id;
    }else{
      this.router.navigateByUrl('/user/login');
    }
    Object.keys(this.postCmtDiv).forEach(h => {
      this.postCmtDiv[h] = false;
    });
    this.postCmtDiv[postdata.id] = true;
    
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
      
  }
}
