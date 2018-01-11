import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { EnrichmentService } from "../enrichment.service";

@Component({
  selector: 'app-bookcat',
  templateUrl: './bookcat.component.html',
  styleUrls: ['./bookcat.component.css']
})
export class BookcatComponent implements OnInit {
  bookDetData=[];
  booksCatData=[];
  bookBnrImgLink='';
  bookSlugName='';
  booksCatListData=[];
  enrichmentBookData =[];
  allBooks =[];
  constructor(
    private _book_service: EnrichmentService,
    private activatedRoute: ActivatedRoute
  ) {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.bookSlugName = params['slug'];
        this.getBookDetails();
        this.getCatBookList();
        this.getCatWiseBookList();
        this.getAllBookList();
    });
    
   }

  ngOnInit() {
    
  }

  public getAllBookList() {
    this._book_service.getAllBookListData().subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.allBooks = details.BooksAll;
        }
      },
      error => {
        console.log('Something went wrong!');
    });
  }

  public getCatWiseBookList() {
    this._book_service.getCatWiseBookListData(this.bookSlugName).subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
          //this.bookBnrImgLink = details.BooksCat[0].image_url;
          this.booksCatData = details.BooksCat[0];
      }
    },
    error => {
      console.log('Something went wrong!');
    });
  }

  public getBookDetails() {
    this._book_service.getEnrichmentData().subscribe(data=>{
      if (data.Ack=="1") {
          let SuccessEnrData=data.EnreachmentCatContent;
          SuccessEnrData=SuccessEnrData.filter(item => item.id == 2);
          this.enrichmentBookData = SuccessEnrData; 
          return false;
      }
      },
      error => {
        console.log('Something went wrong!');
      });
  }

  public getCatBookList() {
    this._book_service.getBookCatList().subscribe(data => {
      const details = data;
      if (details.Ack == "1") {
        this.booksCatListData = details.BooksAllCategory;
      } 
    },
    error => {
    });
  }
}
