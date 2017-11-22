import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-shareyourstory',
  templateUrl: './shareyourstory.component.html',
  styleUrls: ['./shareyourstory.component.css']
})
export class ShareyourstoryComponent implements OnInit {
  public form: FormGroup;
  public allArticlecat = [];
  postImgData: any;
  showPostImgDive: boolean;
  public loginUserId: any;
  successMsg: string = '';

  constructor(
    private builder: FormBuilder,
    private dataService: UserService
  ) { 
    this.form = builder.group({
      mag_category_id: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]],
      author_name: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      title: ['', [
        Validators.required,
        Validators.minLength(3)
      ]],
      short_desc: ['', [
        Validators.required,
        //Validators.minLength(10)
      ]],
      description: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]],
      image: ['', [
        Validators.required,
        //Validators.minLength(3)
      ]]
    });
   
  }
     

  ngOnInit() {
    this.loginUserId = localStorage.getItem("loginUserId");
    this.getcategory();
  }
    public getcategory(){
     
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
      const userValue = this.form.value;
      userValue.user_id = this.loginUserId;
      userValue.image = this.postImgData;
      console.log(userValue);
      this.dataService.appsharestory(userValue).subscribe(data => {
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
