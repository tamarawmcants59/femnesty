import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FrontendService } from '../../../components/frontend-app-header/frontend.service';
@Component({
  selector: 'app-mentor',
  templateUrl: './mentor.component.html',
  styleUrls: ['./mentor.component.css']
})
export class MentorComponent implements OnInit {
  public form: FormGroup;
  public allArticlecat = [];
  postImgData: any;
  showPostImgDive: boolean;
  public loginUserId: any;
  successMsg: string = '';
becomeMetorContent:any;
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private frontEndSrvc: FrontendService
  ) { 
    this.frontEndSrvc.getBecomeMentorContent().subscribe(data => {
      if (data.Ack == "1") {
       this.becomeMetorContent = data.MentorContent[0];
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
    this.form = builder.group({
      name: ['', [
        Validators.required,
        Validators.pattern('([a-zA-Z])+([a-zA-Z])+'),
        Validators.minLength(3)
      ]],
      email: ['', [
        Validators.required,
        Validators.email,
        //Validators.minLength(3)
      ]],
      mobile_no: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.pattern('[0-9][0-9]+')
      ]],
      qualification: ['', [
        //Validators.required,
        //Validators.minLength(10)
      ]],
      short_desc: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      long_desc: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      image: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]]
    });
  }

  ngOnInit() {
    //this.loginUserId = localStorage.getItem("loginUserId");
  }

  public mentor() {
    const userValue = this.form.value;
    //userValue.user_id = this.loginUserId;
    userValue.image = this.postImgData;
    //console.log(userValue);
    this.dataService.mentorship(userValue).subscribe(data => {
      console.log(data);
      if (data.Ack == "1") {
        this.showPostImgDive = false;
        this.postImgData='';
        this.successMsg = 'Successfully posted for approval.';
        this.form.reset();
      }
    },
    error => {
    });
    
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

}
