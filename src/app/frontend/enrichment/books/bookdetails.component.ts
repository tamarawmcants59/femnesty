import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";

@Component({
  selector: 'app-bookdetails',
  templateUrl: './bookdetails.component.html',
  styleUrls: ['./bookdetails.component.css']
})
export class BookdetailsComponent implements OnInit {
  bookDetData=[];
  bookSlugName='';
  
  constructor(
    private _book_details: EnrichmentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.bookSlugName = params['slug'];
        //console.log(this.bookSlugName);
    });

    this._book_details.getBookDetBySlug(this.bookSlugName).subscribe(data=>{
      let details=data;
      //console.log(details);
      if (details.Ack=="1") {
          this.bookDetData = details.BooksDetailsBySlug[0];
          //console.log(this.bookDetData);
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
  }

}
