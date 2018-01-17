import { Component, OnInit, Input, Inject ,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SocialService } from "../../frontend/socialhome/social.service";
import { environment } from '../../../environments/environment';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupmodalComponent } from './popupmodal.component';
import { window } from 'rxjs/operators/window';
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
  public subPostCmtId: any;
  //public postCmtDiv:boolean = false;
  public postCmtDiv: any = {};
  public postSubCmtDiv: any = {};
  public postCmtLike: any = {};
  public postCmtHtml: string = '';
  public userPrfImgStr: string = '';
  public userNameStr: string = '';
  public getCurrentUser: any;
  public currentDate: Date = new Date();
  private IsGroupAdmin: boolean = false;
  //public repoUrl = 'https://github.com/Epotignano/ng2-social-share';
  public repoUrl = '';
  public likeListPostId = '';
  @Output() getUserPostDetails: EventEmitter<any> = new EventEmitter();
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
    private router: Router,
    //public dialog: MatDialog
  ) {


    this.getCurrentUser = localStorage.getItem("currentUser");
    this.getCurrentUser = JSON.parse(this.getCurrentUser);
    this.IsloginUserId = localStorage.getItem("loginUserId");
    if (localStorage.getItem("groupAdmin")) {
      if (localStorage.getItem("groupAdmin") == this.IsloginUserId) {
        this.IsGroupAdmin = true;
      }
    }
    this.isLoggedIn = localStorage.getItem("isLoggedIn");
    this.userPrfImgStr = this.getCurrentUser.image_url;
    this.userNameStr = this.getCurrentUser.name;
    this.commentform = builder.group({
      comment: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]]
    });
    this.repoUrl = environment.website_url + this.router.url;
  }

  ngOnInit() {

  }
  deletePost(post_id, type, comments) {

    let data = { "post_id": post_id, "post_type": type };
    this.dataService.deletePost(data).subscribe(data => {
      if (data.Ack == "1") {
        if (comments != undefined && type == "C") {
          let index;
          for (var i = 0; i < comments.length; i++) {
            if (comments[i].id == post_id) {
              index = i;
              break;
            }
          }
          if (index != undefined) {
            comments.splice(index, 1);
          }
        }
        else
        {
          location.reload();
        }
      }
    }, error => {
      console.log(error);
    })


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
    //this.postCmtHtml = '';
  }

  public userSubPostComment(post_id, postdata) {
    if (this.isLoggedIn == 1) {
      this.postCmtId = postdata.post_id;
      this.subPostCmtId = post_id;
    } else {
      this.router.navigateByUrl('/user/login');
    }
    Object.keys(this.postSubCmtDiv).forEach(h => {
      this.postSubCmtDiv[h] = false;
    });
    this.postSubCmtDiv[postdata.id] = true;

  }

  public userPostLike(post_id, postdata) {
    if (this.isLoggedIn == 1) {
      //this.postCmtId = post_id;
    } else {
      this.router.navigateByUrl('/user/login');
    }


    let dataUserDet = {
      "user_id": this.IsloginUserId,
      "post_id": post_id
    };
    //console.log(dataUserDet);
    this.dataService.likePostUser(dataUserDet)
      .subscribe(data => {
        let details = data;
        if (details.Ack == "1") {
          if (postdata.post_like) {
            postdata.post_like = false;
            postdata.likecount = parseInt(postdata.likecount) - 1
          } else {
            postdata.post_like = true;
            postdata.likecount = parseInt(postdata.likecount) + 1
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
    //comment_id
    this.dataService.userPostDataSend(userValue)
      .subscribe(data => {
        userValue.profile_image_url = this.userPrfImgStr;
        userValue.name = this.userNameStr;
        userValue.first_name = this.getCurrentUser.first_name;
        userValue.last_name = this.getCurrentUser.last_name;
        userValue.c_date = this.currentDate;
        userValue.display_name = this.getCurrentUser.display_name;
        comments.push(userValue);
        this.commentform.reset();
        postList.commentcount = parseInt(postList.commentcount) + 1;
      },
      error => {
        alert(error);
      });
  }

  public submitSubPostComment(comments, postList, postSubId) {
    if (this.isLoggedIn == 1) {

    } else {
      this.router.navigateByUrl('/user/login');
    }
    let userValue = this.commentform.value;
    userValue.user_id = this.IsloginUserId;
    userValue.post_id = this.postCmtId;
    userValue.comment_id = this.subPostCmtId;
    this.dataService.userPostDataSend(userValue)
      .subscribe(data => {
        userValue.profile_image_url = this.userPrfImgStr;
        userValue.name = this.userNameStr;
        userValue.first_name = this.getCurrentUser.first_name;
        userValue.last_name = this.getCurrentUser.last_name;
        userValue.c_date = this.currentDate;
        userValue.display_name = this.getCurrentUser.display_name;
        comments.push(userValue);
        this.commentform.reset();
        postList.commentcount = parseInt(postList.commentcount) + 1;
      },
      error => {
        alert(error);
      });
  }

  public userPostLikeListPopup(postId) {
    this.likeListPostId = postId;
    //this.openDialog();

  }

  /*public openDialog(): void {
    let dialogRef = this.dialog.open(PopupmodalComponent, {
      width: '100%',
      data: { namePid: this.likeListPostId }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.likeListPostId = result;
    });
  }*/

  public shareOnFacebook(url, description, images) {
    //let titleMeta = document.createElement('meta');
    /*let descMeta = document.createElement('meta');
    let imageMeta = document.createElement('meta');

    descMeta.setAttribute('property', 'og:description');
    descMeta.setAttribute('content', description);
    
    imageMeta.setAttribute('property', 'og:image');
    imageMeta.setAttribute('content', images);

    document.getElementsByTagName('head')[0].appendChild(descMeta);
    if(images!=''){
      document.getElementsByTagName('head')[0].appendChild(imageMeta);
    }*/

    /*let link;
    //this.siteSettingsDet = data.SiteSettings[0];
    link = document.createElement('link');
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    //link.href = 'http://www.stackoverflow.com/favicon.ico';
    document.getElementsByTagName('head')[0].appendChild(link);*/

    /*if (window.open) {
        let poppedWindow = window.open('http://www.facebook.com/sharer.php?u='+url,'sharer','toolbar=0,status=0,width=548,height=325');
    }else {
        alert('Your security settings are not allowing our popup windows to function. Please make sure your security software allows popup windows to be opened by this web application.');
    }*/

  }
}

/*@Component({
  selector: 'app-popupmodal',
  templateUrl: './popupmodal.component.html',
  styleUrls: ['./popupmodal.component.css']
})
export class PopupmodalComponent {

  constructor(
    public dialogRef: MatDialogRef<PopupmodalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}*/

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
  url: string
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