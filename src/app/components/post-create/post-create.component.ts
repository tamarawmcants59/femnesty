import { Component, OnInit, ViewChild, Input, Output, EventEmitter  } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../../frontend/user/user.service";

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
  postImgData: any;

  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
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
        //Validators.required,
        //Validators.minLength(3)
      ]],
      group_type: ['', [ ]],
      group_id: ['', [ ]]
    });
  }

  ngOnInit() {
    //console.log(this.postType.activitytype);
  }

  public submitPost() {
    this.loading = true;
    const loginUserId = localStorage.getItem("loginUserId");
    const result = {},
      userValue = this.postform.value;
    userValue.user_id = loginUserId;
    userValue.file_name = this.postImgData;
    //console.log(userValue);
    this.dataService.postDataSend(userValue).subscribe(data => {
        this.showPostImgDive = false;
        this.loading = false;
        this.successMsg = 'Successfully post data';
        this.postImgData='';
        this.postform.controls['description'].setValue('');
        this.getUserPostDetails.emit();
        //this.postform.reset();
      },
      error => {
        alert(error);
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
