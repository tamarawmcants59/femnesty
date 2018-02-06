import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homepageData: any;
  public homepageArtData = [];
  public rForm: FormGroup;
  loading = false;
  public homepageSliderData = [];
  successMsg:any;
  public IsShowFeedForm = false;
  public isShowPlus = true;
  public loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  public homepageCls = '';
  public shhover = '';
  constructor(
    private dataService: FrontendService,
    private fb: FormBuilder
  ) {
    if (this.loginUserId > 0) {
      this.homepageCls = 'pt-64';
    } else {
      this.homepageCls = 'pt-150';
    }
    this.rForm = fb.group({
      'description': [null, Validators.compose([Validators.required])],
      'email': [null, Validators.compose([Validators.required, Validators.email])],
      'feedback': [null, Validators.compose([Validators.required])],
      'rating': [null, Validators.compose([Validators.required])],
    });
    //console.log(this.homepageCls);
  }

  ngOnInit() {
    this.getHomePageContent();
    this.getHomePageTopArticle();
    this.getHomePageTestomonial();
  }


  sendFeedBack() {
    this.loading = true;
    this.dataService.giveFeedback(this.rForm.value).subscribe(data => {
      if (data.Ack == "1") {
        this.successMsg=data.msg;
        this.loading = false;
        this.rForm.reset();
      }
    }, error => {
      this.loading = false;
      console.log('Something went wrong!');
    });
  }

  getHomePageContent() {
    this.dataService.getHomePageData().subscribe(data => {
      if (data.Ack == "1") {
        this.homepageData = data.Homepage[0];
        //console.log(this.homepageData);
      }
    }, error => {
      console.log('Something went wrong!');
    });
  }

  getHomePageTopArticle() {
    this.dataService.getHomePageTopArtData().subscribe(data => {
      if (data.Ack == "1") {
        this.homepageArtData = data.ArticleList;
        //console.log(this.homepageArtData);
      }
    }, error => {
      console.log('Something went wrong!');
    });
  }
  openForm() {
    this.shhover = "feedhover";
    this.IsShowFeedForm = true;
    this.isShowPlus = false;
  }
  closeForm() {
    this.shhover = "";
    this.isShowPlus = true;
    this.IsShowFeedForm = false;
  }
  getHomePageTestomonial() {
    this.dataService.getHomePageSliderData().subscribe(data => {
      if (data.Ack == "1") {
        //console.log(data);
        this.homepageSliderData = data.testimonial;
      }
    }, error => {
      console.log('Something went wrong!');
    });
  }
}
