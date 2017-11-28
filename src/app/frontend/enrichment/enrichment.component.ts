import { Component, OnInit } from '@angular/core';
//import { Headers, Http, Response, URLSearchParams } from '@angular/http';
import { EnrichmentService } from "./enrichment.service";
//import { EnrichmentModel } from "./enrichment.model";
import { DomSanitizer  } from '@angular/platform-browser';
//import { TruncatePipe ,SafePipe} from '../../exponential-strength.pipe';

@Component({
  selector: 'app-enrichment',
  templateUrl: './enrichment.component.html',
  styleUrls: ['./enrichment.component.css']
})
export class EnrichmentComponent implements OnInit {
  enrichmentConData=[];
  enrichmentCatConData=[];
  enrichmentBackGrdImg='';
  //obj: Array<EnrichmentModel>;
  constructor( 
      private _service: EnrichmentService, 
      private sanitizer: DomSanitizer,
      //public limitTo: TruncatePipe
      //private http:Http
  ) {  
    //this.getData();
  }

  ngOnInit() {
    this._service.getEnrichmentData().subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
          this.enrichmentConData = details.EnreachmentContent;
          this.enrichmentCatConData = details.EnreachmentCatContent;
          //const enrichmentBackGrdImgPath = `background-image: url(${details.EnreachmentContent[0].banner_image_url})`;
          //this.sanitizer.bypassSecurityTrustStyle(enrichmentBackGrdImgPath);
          //console.log(details.EnreachmentContent);
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

  /*private getBackImgUrl(ImgPath){
      const style_back_img = `background: url(${ImgPath}) center no-repeat`;
      return this.sanitizer.bypassSecurityTrustStyle(style_back_img);
  }*/

}
