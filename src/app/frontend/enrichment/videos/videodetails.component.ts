import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";

@Component({
  selector: 'app-videodetails',
  templateUrl: './videodetails.component.html',
  styleUrls: ['./videodetails.component.css']
})
export class VideodetailsComponent implements OnInit {

  videoDetData=[];
  SlugName='';
  safeyoutube_link='';
  constructor(
    private _video_details: EnrichmentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
        //console.log(this.bookSlugName);
    });

      this._video_details.getVideoDetBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        //console.log(details);
        if (details.Ack=="1") {
            this.videoDetData = details.VideosDetailsBySlug[0];
            this.safeyoutube_link = 'https://www.youtube.com/embed/'+details.VideosDetailsBySlug[0].youtube_link;
            //this.safeyoutube_link = '<iframe width="100%" height="600" src="https://www.youtube.com/embed/'+details.VideosDetailsBySlug[0].youtube_link+'" frameborder="0" allowfullscreen></iframe>';
            //console.log(this.safeyoutube_link);
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
