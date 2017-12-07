import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SocialService } from "../../frontend/socialhome/social.service";
import { environment } from '../../../environments/environment';
//import { ShareButtonModule } from "ngx-sharebuttons";
//import { CeiboShare } from 'ng2-social-share';

@Component({
  selector: 'app-post-card',
  templateUrl: './post-card.component.html',
  styleUrls: ['./post-card.component.css'],
  //directives: [CeiboShare]
})
export class PostCardComponent implements OnInit {
  public commentform: FormGroup;
  public IsloginUserId: any;
  public isLoggedIn: any;
  public postCmtId: any;
  //public postCmtDiv:boolean = false;
  public postCmtDiv: any = {};
  public postCmtLike: any = {};
  public postCmtHtml: string = '';
  public userPrfImgStr: string = '';
  public userNameStr: string = '';
  public getCurrentUser: any;
  public currentDate: Date = new Date();
  //public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
  public repoUrl = '';
  

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
    c_date: string;
  };
  constructor(
    private builder: FormBuilder,
    private dataService: SocialService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.getCurrentUser = localStorage.getItem("currentUser");
    this.getCurrentUser = JSON.parse(this.getCurrentUser);
    this.IsloginUserId = localStorage.getItem("loginUserId");
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    this.userPrfImgStr = this.getCurrentUser.image_url;
    this.userNameStr = this.getCurrentUser.name;
    this.commentform = builder.group({
      comment: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]]
    });
    this.repoUrl=environment.website_url+this.router.url;
  }

  ngOnInit() {
    //console.log(this.repoUrl);
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

    this.postCmtHtml = '';
  }
  
  public userPostLike(post_id, postdata) {
    if (this.isLoggedIn == 1) {
      //this.postCmtId = post_id;
    } else {
      this.router.navigateByUrl('/user/login');
    }
    

    let dataUserDet ={
      "user_id": this.IsloginUserId,
      "post_id": post_id
    };
    //console.log(dataUserDet);
    this.dataService.likePostUser(dataUserDet)
    .subscribe(data => {
          let details=data;
          if (details.Ack=="1") {
            if(postdata.post_like){
              postdata.post_like=false;
              postdata.likecount = parseInt(postdata.likecount)-1
            }else{
              postdata.post_like=true;
              postdata.likecount = parseInt(postdata.likecount)+1
            }
          }
      },
      error => {
        
      }
    );
    //this.postCmtLike[postdata.id] = true;
  }

  public submitPostComment(comments, postList) {
    if (this.isLoggedIn == 1) {

    } else {
      this.router.navigateByUrl('/user/login');
    }
    let userValue = this.commentform.value;
    userValue.user_id = this.IsloginUserId;
    userValue.post_id = this.postCmtId;

    this.dataService.userPostDataSend(userValue)
      .subscribe( data => {
        userValue.profile_image_url=this.userPrfImgStr;
        userValue.name=this.userNameStr;
        userValue.first_name=this.getCurrentUser.first_name;
        userValue.last_name=this.getCurrentUser.last_name;
        userValue.c_date=this.currentDate;
        userValue.display_name=this.getCurrentUser.display_name;
        comments.push(userValue); 
        this.commentform.reset();
        postList.commentcount=parseInt(postList.commentcount)+1;
      },
      error => {
        alert(error);
      });
  }

  public shareOnFacebook(url, description, images){
    console.log(url);
    console.log(description);
    //let titleMeta = document.createElement('meta');
    let descMeta = document.createElement('meta');
    let imageMeta = document.createElement('meta');

    descMeta.setAttribute('property', 'og:description');
    descMeta.setAttribute('content', description);
    
    imageMeta.setAttribute('property', 'og:image');
    imageMeta.setAttribute('content', images);

    document.getElementsByTagName('head')[0].appendChild(descMeta);
    if(images!=''){
      document.getElementsByTagName('head')[0].appendChild(imageMeta);
    }
    
    /*let link;
    //this.siteSettingsDet = data.SiteSettings[0];
    link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    //link.href = 'http://www.stackoverflow.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);*/

    if (window.open) {
        let poppedWindow = window.open('http://www.facebook.com/sharer.php?u='+url,'sharer','toolbar=0,status=0,width=548,height=325');
    }else {
        alert('Your security settings are not allowing our popup windows to function. Please make sure your security software allows popup windows to be opened by this web application.');
    }

  }

}

export declare class FacebookParams {
  u: string;
  /*title:string;
  summary: string;
  images: string;*/
}

export class GooglePlusParams {
  url: string
}

export class LinkedinParams {
  url:string
}

export declare class PinterestParams {
  url: string;
  media: string;
  description: string;
}

export class TwitterParams {
  text: string;
  url: string;
  hashtags: string;
  via: string;
}