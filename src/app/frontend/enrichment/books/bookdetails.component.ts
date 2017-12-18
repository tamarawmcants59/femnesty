import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  bookDetData=[];
  bookSlugName='';
  public postform: FormGroup;
  public bookId='';
  successMsg='';
  public ratListData=[];
  public repoUrl = '';

  constructor(
    private builder: FormBuilder,
    private _book_details: EnrichmentService,
    private activatedRoute: ActivatedRoute,
    private router: Router
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
      ]]
    });
    this.repoUrl=environment.website_url+this.router.url;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.bookSlugName = params['slug'];
        //console.log(this.bookSlugName);
    });

    this._book_details.getBookDetBySlug(this.bookSlugName).subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
        //console.log(data);
          this.bookDetData = details.BooksDetailsBySlug[0];
          this.bookId=details.BooksDetailsBySlug[0].id;
          this.getRatingList();
          return false;
      }else{
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
    //console.log(userValue);
    this._book_details.postRatingData(userValue).subscribe(data => {
        this.successMsg = 'You have successfully post the review';
        this.getRatingList();
        this.postform.reset();
      },
      error => {
        alert(error);
      });

  }

  public getRatingList() {
    const book_id = this.bookId;
    if(book_id!=''){
      this._book_details.getRatingData({"book_id":this.bookId}).subscribe(data => {
        if(data.Ack==1){
          //console.log(data);
          this.ratListData = data.BookRatingList;
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
  url:string
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