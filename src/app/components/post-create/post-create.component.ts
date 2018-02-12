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
  loading: boolean;
  showPostImgDive: boolean;
  successMsg= '';
  errorMsg= '';
  postImgData='';
  IsShowListOption= false;
	
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
    userValue.file_name = this.postImgData;
    //console.log(userValue);
    if(userValue.description!='' || userValue.file_name!=''){
      this.dataService.postDataSend(userValue).subscribe(data => {
          this.showPostImgDive = false;
          this.loading = false;
          this.successMsg = 'Successfully posted.';
          this.postImgData='';
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
  }
  
  public deleteImg() {
    this.postImgData='';
    this.showPostImgDive = false;
  }
  
  public togglePostOptions(){ 
    this.IsShowListOption= !this.IsShowListOption;
  }

}
