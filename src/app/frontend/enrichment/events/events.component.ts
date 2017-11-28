import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { DomSanitizer  } from '@angular/platform-browser';

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.css']
})
export class EventsComponent implements OnInit {

  //artDetData=[];
  artCatData=[];
  enrichmentEventData=[];
  constructor( 
      private _book_service: EnrichmentService, 
      private sanitizer: DomSanitizer
      //private http:Http
  ) {  
    //this.getData();
  }

  ngOnInit() {
    this._book_service.getArticalListData().subscribe(data=>{
      let details=data;
      //console.log(details);
      if (details.Ack=="1") {
          //this.artDetData = details.BooksAll[0].image_url;
          this.artCatData = details.EventList;
          
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

  this._book_service.getEnrichmentData().subscribe(data=>{
    //console.log(data);
    if (data.Ack=="1") {
        let SuccessEnrData=data.EnreachmentCatContent;
        SuccessEnrData=SuccessEnrData.filter(item => item.id == 5);
        this.enrichmentEventData = SuccessEnrData; 
        //console.log(this.enrichmentBookData);
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

}
