import { Component, OnInit, Input, Inject ,Output,EventEmitter} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SocialService } from "../../frontend/socialhome/social.service";
import { environment } from '../../../environments/environment';
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { PopupmodalComponent } from './popupmodal.component';
import { window } from 'rxjs/operators/window';
import {NgbModal, ModalDismissReasons} from '@ng-bootstrap/ng-bootstrap';

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
  showPostImgDive: boolean;
  loading =false;
  editPostText: any;
  postImgData : any;
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
  public delPostId:any;
  public delPostType:any;
  public delPostKey:any;
  public delPostData:any;
  public userList=[];
  fhsgdff='';

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
    post_like:boolean;
  };
  constructor(
    private builder: FormBuilder,
    private dataService: SocialService,
    private route: ActivatedRoute,
    private router: Router,
    private modalService: NgbModal
  ) {


    this.getCurrentUser = localStorage.getItem("currentUser");
    this.getCurrentUser = JSON.parse(this.getCurrentUser);
    this.IsloginUserId = localStorage.getItem("loginUserId");
    if (localStorage.getItem("groupAdmin")) {
      this.fhsgdff=localStorage.getItem("groupAdmin");
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

  deletePost(confirmmodal,post_id, type, comments=null,delkey=null) {
    //this.open(confirmmodal);
    this.delPostId=post_id;
    this.delPostType=type;
    this.delPostData=comments;
    this.delPostKey=delkey;
    this.modalService.open(confirmmodal);
  }

  confirmPostDelete() {
    let data = { "post_id": this.delPostId, "post_type": this.delPostType };
    this.dataService.deletePost(data).subscribe(data => {
      if (data.Ack == "1") {
          if(this.delPostKey!=null){
            this.delPostData[this.delPostKey].hide_div=true;
          }else{
            this.delPostData.hide_post_div=true;
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
    console.log('anup');
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
    this.dataService.userPostDataSend(userValue).subscribe(data => {
        userValue.id = data.last_id;
        userValue.profile_image_url = this.userPrfImgStr;
        userValue.name = this.userNameStr;
        userValue.first_name = this.getCurrentUser.first_name;
        userValue.last_name = this.getCurrentUser.last_name;
        userValue.c_date = this.currentDate;
        userValue.display_name = this.getCurrentUser.display_name;
        userValue.reply =[];
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
    this.dataService.userPostDataSend(userValue).subscribe(data => {
        userValue.id = data.last_id;
        userValue.profile_image_url = this.userPrfImgStr;
        userValue.name = this.userNameStr;
        userValue.first_name = this.getCurrentUser.first_name;
        userValue.last_name = this.getCurrentUser.last_name;
        userValue.c_date = this.currentDate;
        userValue.display_name = this.getCurrentUser.display_name;
        userValue.likecount = 0;
        //userValue.reply =[];
        comments.push(userValue);
        this.commentform.reset();
        postList.commentcount = parseInt(postList.commentcount) + 1;
      },
      error => {
        alert(error);
      });
  }

  public userPostLikeListPopup(postId,postlikemodal) {
    if(postId!=''){
      this.likeListPostId = postId;
      this.getUserLikeList(postId, postlikemodal);
    }
    
    //this.openDialog();

  }
  public deleteImg() {
    this.postImgData='';
    this.showPostImgDive = false;
  }
  public editPost() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {};
    // userValue = this.postform.value;
    // userValue.user_id = loginUserId;
    // userValue.file_name = this.postImgData;
    // if(userValue.description!='' || userValue.file_name!=''){
    //   this.dataService.postDataSend(userValue).subscribe(data => {
    //       this.showPostImgDive = false;
    //       this.loading = false;
    //       this.successMsg = 'Successfully posted.';
    //       this.postImgData='';
    //       this.postform.controls['description'].setValue('');
    //       this._postListnerService.onPostAdd('add');
    //       this.getUserPostDetails.emit();
    //       //this.postform.reset();
    //     },
    //     error => {
    //       alert(error);
    //     });
    // }else{
    //   this.errorMsg= 'Please share your thoughts or upload an image to post.';
    // }
  }
  public fileChangePost($event) {
    this.showPostImgDive = true;
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    const that = this;
    myReader.onloadend = function (loadEvent: any) {
      image.src = loadEvent.target.result;
      that.postImgData = image.src;
      //that.cropper.setImage(image);
      //console.log(image.src);
    };
    myReader.readAsDataURL(file);
  }
  openEditModal(postData,editModal)
  {
    if(postData.description)
    {
      this.editPostText=postData.description;
    }
    else
    {
      this.editPostText="";
    }
    this.modalService.open(editModal);
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
    
  }
  public gotoProfPage(url) {
      this.router.navigateByUrl('/user/profile/'+url);
  }
  
  public getUserLikeList(postId, postlikemodal){
    let dataUserDet ={
      "post_id": postId
    };
    this.dataService.likePostUserList(dataUserDet).subscribe(data => {
          let details=data;
          if (details.Ack==1) {
            this.userList=details.likeUserList;
            this.modalService.open(postlikemodal);
            this.likeListPostId = '';
          }
      },
      error => {
        
      }
    );
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