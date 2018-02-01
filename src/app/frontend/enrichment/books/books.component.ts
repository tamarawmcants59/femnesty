import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { DomSanitizer  } from '@angular/platform-browser';
@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  bookDetData=[];
  booksCatData=[];
  bookBnrImgLink='';
  enrichmentBookData=[];
  booksCatListData=[];
  constructor( 
      private _book_service: EnrichmentService, 
      private sanitizer: DomSanitizer
      //private http:Http
  ) {  
    //this.getData();
  }

  ngOnInit() { 
    this._book_service.getAllBookListData().subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
          this.bookBnrImgLink = details.BooksAll[0].image_url;
          this.booksCatData = details.BooksAll;
          //console.log(enrichmentCatConData);
          return false;
      }else{
          //localStorage.setItem('isLoggedIn', '1');
          return false;
      }
      
    },
    error => {
      console.log('Something went wrong!');
    }
  );

  //this._book_service.getEnrichmentDetData().map(datamap => datamap.EnreachmentCatContent).subscribe(data=>{
    this._book_service.getEnrichmentData().subscribe(data=>{
      //console.log(data);
      if (data.Ack=="1") {
          let SuccessEnrData=data.EnreachmentCatContent;
          SuccessEnrData=SuccessEnrData.filter(item => item.id == 2);
          this.enrichmentBookData = SuccessEnrData; 
          //console.log(this.enrichmentBookData);
          return false;
      }else{
          //localStorage.setItem('isLoggedIn', '1');
          return false;
      }
      //console.log(enrichmentBookData);
      },
      error => {
        console.log('Something went wrong!');
      }
    );
    this.getCatBookList();

  }

  public getCatBookList() {
    this._book_service.getBookCatList().subscribe(data => {
      const details = data;
      //console.log(details);
      if (details.Ack == "1") {
        this.booksCatListData = details.BooksAllCategory;
      } else {

      }
    },
    error => {

    });
  }

}
