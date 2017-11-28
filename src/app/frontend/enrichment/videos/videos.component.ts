import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";

@Component({
  selector: 'app-videos',
  templateUrl: './videos.component.html',
  styleUrls: ['./videos.component.css']
})
export class VideosComponent implements OnInit {
  videoListData=[];
  enrichmentVideoData=[];
  constructor(private _video_service: EnrichmentService) { }

  ngOnInit() {
    this._video_service.getVideoListData().subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
          //this.artDetData = details.BooksAll[0].image_url;
          this.videoListData = details.VideosAll;
          //console.log(this.booksCatData);
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

  this._video_service.getEnrichmentData().subscribe(data=>{
    //console.log(data);
    if (data.Ack=="1") {
        let SuccessEnrData=data.EnreachmentCatContent;
        SuccessEnrData=SuccessEnrData.filter(item => item.id == 4);
        this.enrichmentVideoData = SuccessEnrData; 
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
