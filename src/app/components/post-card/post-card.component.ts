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

  public userPostComment(post_id){
    if(this.isLoggedIn==1){
      this.postCmtId=post_id;
    }else{
      this.router.navigateByUrl('/user/login');
    }
    console.log(post_id);
    //this.userPostList[index].showCmtDiv = !this.userPostList[index].showCmtDiv;
    //console.log(post_id);
    
  }

}
