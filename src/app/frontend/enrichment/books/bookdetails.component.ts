import { Router, ActivatedRoute, Params } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';
import { Meta } from '@angular/platform-browser';
//import { ShareButtons } from '@ngx-share/core';

//import { ShareButtons } from '@ngx-share/core';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css'],
})
export class BookdetailsComponent implements OnInit {
  bookDetData = [];
  bookSlugName = '';
  public postform: FormGroup;
  public bookId = '';
  successMsg = '';
  public ratListData = [];
  public totalRatingList = [];
  public repoUrl = '';
  public isloginUser = '';
  public loginUserDetails: any;
  pageSize = 5;
  public IsShowRatingViewMore = false;
  constructor(
    private builder: FormBuilder,
    private _book_details: EnrichmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private metaService: Meta,
    //public sosShare: ShareButtons
  ) {
    this.postform = builder.group({
      name: ['', [
        Validators.required
      ]],
      comment: ['', [
        Validators.required
      ]],
      rating: ['', [
        Validators.required
      ]],
      femnestymember: ['', [
        //Validators.required
      ]]
    });
    this.repoUrl = environment.website_url + this.router.url;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
      this.bookSlugName = params['slug'];
      //console.log(this.bookSlugName);
    });

    this.isloginUser = localStorage.getItem("isLoggedIn");
    let logUserDet = localStorage.getItem("currentUser");
    this.loginUserDetails = JSON.parse(logUserDet);
    //console.log(this.loginUserDetails);
    this._book_details.getBookDetBySlug(this.bookSlugName).subscribe(data => {
      let details = data;
      if (details.Ack == "1") {
        //console.log(data);
        this.bookDetData = details.BooksDetailsBySlug[0];
        this.bookId = details.BooksDetailsBySlug[0].id;
        this.repoUrl = this.repoUrl + details.BooksDetailsBySlug[0].image_url + details.BooksDetailsBySlug[0].title
        this.metaService.updateTag({ name: 'title', content: details.BooksDetailsBySlug[0].title });
        this.metaService.updateTag({ property: 'og:title', content: details.BooksDetailsBySlug[0].title });
        //this.metaService.updateTag({ name: 'description', content: 'pragati' });
        this.metaService.updateTag({ property: 'og:description', content: details.BooksDetailsBySlug[0].description });
        this.metaService.updateTag({ property: 'og:image', content: details.BooksDetailsBySlug[0].image_url });
        this.metaService.updateTag({ property: 'og:url', content: this.repoUrl });
        this.metaService.updateTag({ property: 'twitter:card', content: details.BooksDetailsBySlug[0].image_url });
        this.metaService.updateTag({ property: 'twitter:site', content: this.repoUrl });
        this.metaService.updateTag({ property: 'twitter:creator', content: details.BooksDetailsBySlug[0].title });
        this.getRatingList();
        return false;
      } else {
        return false;
      }

    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }


  public submitPost() {
    const userValue = this.postform.value;
    userValue.book_id = this.bookId;
    delete userValue.femnestymember;
    //console.log(userValue);
    //exit;
    this._book_details.postRatingData(userValue).subscribe(data => {
      this.successMsg = 'You have successfully post the review';
      this.getRatingList();
      this.postform.reset();
      this.loginUserDetails.first_name=this.loginUserDetails.first_name;
    },
      error => {
        alert(error);
      });

  }
  viewMore() {
    this.pageSize = this.pageSize + 5;
    this.ratListData = [];
    if (this.totalRatingList.length > this.pageSize) {
      this.IsShowRatingViewMore = true;
    }
    else {
      this.IsShowRatingViewMore = false;
    }
    for (let i = 0; i < this.pageSize; i++) {
      if (this.totalRatingList[i]) {
        this.ratListData.push(this.totalRatingList[i]);
      }

    }
  }
  //public checkEmail(values: Object): void {
  public CheckFemnestyUser() {
    let logUserDet = localStorage.getItem("currentUser");
    let userLoginUserDetails = JSON.parse(logUserDet);
    if (this.postform.get('femnestymember').value == '1') {
      this.loginUserDetails.first_name='Femnesty Member';
    }else {
      this.loginUserDetails.first_name=userLoginUserDetails.first_name;
    }
  }
  
  public getRatingList() {
    const book_id = this.bookId;
    if (book_id != '') {
      this._book_details.getRatingData({ "book_id": this.bookId }).subscribe(data => {
        if (data.Ack == 1) {
          this.totalRatingList = data.BookRatingList;
          //console.log(data);
          this.ratListData = [];
          //this.ratListData = data.BookRatingList;
          if (data.BookRatingList.length > 5) {
            this.IsShowRatingViewMore = true;
            for (let i = 0; i < data.BookRatingList.length; i++) {
              if (this.ratListData.length < 5) {
                this.ratListData.push(data.BookRatingList[i]);
              }
            }

          }
          else {
            this.IsShowRatingViewMore = false;
            this.ratListData = data.BookRatingList;
          }
        }
      },
        error => {
          alert(error);
        });
    }
  }

}


export declare class FacebookParams {
  u: string;
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