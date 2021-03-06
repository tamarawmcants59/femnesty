import { Component, OnInit, ViewChild, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";
import { EmojiPickerOptions } from 'angular2-emoji-picker';
import { EmojiPickerAppleSheetLocator } from '../../../sheets';
import { PostListnerService } from './../../service/post.listner.service';


@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit {
  @Input() postType: {
    //activitytype:string,
    //activityid:string
  };
  
  @Output() getUserPostDetails: EventEmitter<any> = new EventEmitter();
  public form: FormGroup;
  public postform: FormGroup;
  public selected_post_type = 'Connection Only';
  public is_connection = 2;
  public postCmtTest:boolean = false;
  loading: boolean;
  showPostImgDive: boolean;
  successMsg= '';
  errorMsg= '';
  postImgData='';
  IsShowListOption= false;
  public get_value:any;
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private emojiPickerOptions: EmojiPickerOptions, 
    private _el: ElementRef,
    private _postListnerService: PostListnerService
  ) {
    this.postform = builder.group({
      description: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      file_name: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      is_connection: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      group_type: ['', [ ]],
      group_id: ['', [ ]]
    });

    this.emojiPickerOptions.setEmojiSheet({
      url: 'assets/images/sheet_apple_32.png',
      locator: EmojiPickerAppleSheetLocator
    });
  }

  ngOnInit() {
    this.get_privacy_setting();
    //console.log(this.postType.activitytype);
  }

  handleSelection($event){
    //console.log($event.char);
    this.postform.controls['description'].setValue(this.postform.controls['description'].value+$event.char);
    //console.log('selection handle log:',this.postform.controls['description'].value+$event.char);
    //console.log($event);
  }
  
  /*handleCaretChange($event){
    console.log($event);
    //this.postform.controls['description'].setValue(this.postform.controls['description'].value+$event.char);
    //console.log(this.postform.controls['description'].value+$event.char);
    //return false;
  }*/

  public submitPost() { 
    this.successMsg= '';
    this.errorMsg= '';
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
    userValue = this.postform.value;
    userValue.user_id = loginUserId;
    userValue.post_type = this.is_connection;
    userValue.file_name = this.postImgData;
    //console.log(userValue);
    if(userValue.description!='' || userValue.file_name!=''){
      this.dataService.postDataSend(userValue).subscribe(data => {
          this.showPostImgDive = false;
          this.loading = false;
          this.postCmtTest=false;
          this.successMsg = 'Successfully posted.';
          this.postImgData='';
          this.is_connection=2;
          this.postform.controls['description'].setValue('');
          this._postListnerService.onPostAdd('add');
          this.getUserPostDetails.emit();
          //this.postform.reset();
        },
        error => {
          alert(error);
        });
    }else{
      this.errorMsg= 'Please share your thoughts or upload an image to post.';
    }
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
    this.postCmtTest=true;
  }
  
  public deleteImg() {
    this.postImgData='';
    this.showPostImgDive = false;
    this.postCmtTest=false;
  }
  
  public togglePostOptions(){ 
    this.IsShowListOption= !this.IsShowListOption;
  }
public select_post_type(id)
{
  if(id == 1)
  {
    this.selected_post_type = 'Members';
    this.is_connection = 1;
  }
  else if(id == 2)
  {
    this.selected_post_type = 'Connection Only';
    this.is_connection = 2;
  }
  else if(id==3)
  {
    this.selected_post_type = 'Anonymous';
    this.is_connection = 3;
  }
}
public get_privacy_setting(){ 
   const loginUserId = localStorage.getItem("loginUserId");
  // alert(loginUserId)
  
   const dataUserDet = {
     "id": loginUserId,
     
   };
  this.dataService.getuserPrivacy(dataUserDet)
         .subscribe(data => {
           if(data.Ack == 1)
           { 
             this.get_value = data.user_privacy;
             //alert(this.get_value.all_post)
             //this.is_connection = this.get_value.all_post;
             this.select_post_type(this.get_value.all_post)
           }
           else{ 
             this.get_value = {
               "name_visible": "1",
              "name_visible_in_search_engine": "1",
               "found_email_address": "1",
               "found_phone_number": "1",
                "profile_picture_picture":"1",
              "dob_visible": "1",
               "email_visible": "1",
                "phone_visible": "1",
               "allow_connetion":"1",
              "all_post":"1",
               "group_visible":"1",
                "hub_visible": "1",
                "photo_visible":"1",
                "see_connection_list":"1",
                "name_visible_book_review": "1"
             };
           }
           
         },
         error => {
           //this.loading = false;
         }
         );
 }

  public checkTextData(values: Object): void {
      if (values != '') {
        this.postCmtTest=true;
      } else {
        this.postCmtTest=false;
      }
  }
  
  public cancelPost() {
    this.postImgData='';
    this.is_connection=2;
    this.postform.controls['description'].setValue('');
    this.postCmtTest=false;
    this.showPostImgDive = false;
  }
  

}
