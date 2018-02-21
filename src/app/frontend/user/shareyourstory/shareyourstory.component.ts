import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FrontendService } from '../../../components/frontend-app-header/frontend.service';
@Component({
  selector: 'app-shareyourstory',
  templateUrl: './shareyourstory.component.html',
  styleUrls: ['./shareyourstory.component.css']
})
export class ShareyourstoryComponent implements OnInit {
  public form: FormGroup;
  public allArticlecat = [];
  public loading = false;
  postImgData: any;
  showPostImgDive: boolean;
  public loginUserId: any;
  successMsg: string = '';
  shareYorStoryContent: any;
  constructor(
    private builder: FormBuilder,
    private dataService: UserService,
    private frontEndSrvc: FrontendService
  ) {
    this.frontEndSrvc.getShareYourStoryContent().subscribe(data => {
      if (data.Ack == "1") {
        this.shareYorStoryContent = data.Sharestories[0];
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
    this.form = builder.group({
      mag_category_id: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]],
      author_name: ['', [
        Validators.required,
        //Validators.pattern('([a-zA-Z])+([a-zA-Z])+'),
        Validators.pattern('^$|^[A-Za-z\d ]+$'),
        Validators.minLength(3)
      ]],
      title: ['', [
        Validators.required,
        Validators.pattern('^$|^[A-Za-z0-9\d ]+$'),
        Validators.minLength(3)
      ]],
      // short_desc: ['', [
      //   Validators.required,
      //   //Validators.minLength(10)
      // ]],
      // description: ['', [
      //   Validators.required,
      //   //Validators.minLength(3)
      // ]],
      auther_email: ['', [
        Validators.required,
        Validators.email
      ]],
      image: ['', [
        //Validators.required,
        //Validators.minLength(3)
      ]],
      agreetab: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]]
    });
  }


  ngOnInit() {
    this.loginUserId = localStorage.getItem("loginUserId");
    this.getcategory();
  }
  public getcategory() {

    this.dataService.apparticleWithCat()
      .subscribe(data => {
        const details = data;
        if (details.Ack == "1") {
          this.allArticlecat = details.ArticleCatList;
        }
      },
      error => {

      }
      );
  }

  public shareStoryArticle() {
    this.loading = true;
    const userValue = this.form.value;
    userValue.user_id = this.loginUserId;
    userValue.image = this.postImgData;
    //console.log(userValue.agreetab);
    this.dataService.appsharestory(userValue).subscribe(data => {
      //console.log(data);
      if (data.Ack == "1") {
        this.showPostImgDive = false;
        this.loading = false;
        this.postImgData = '';
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
