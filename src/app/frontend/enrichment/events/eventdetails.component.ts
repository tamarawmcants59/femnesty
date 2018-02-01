import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { Router, ActivatedRoute, Params} from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {

  SlugName='';
  articleData=[];
  public repoUrl = '';
  startDateString:any;
  constructor(
    private serviceData: EnrichmentService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.repoUrl=environment.website_url+this.router.url;
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this.serviceData.getEventBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
          debugger;
          if(details.EventListBySlug[0].created_on)
          {
            this.startDateString = new Date(details.EventListBySlug[0].created_on).toISOString().replace(/[-:.]/g, "").replace('000Z', "Z");
          }
            this.articleData = details.EventListBySlug[0];
            return false;
        }else{
            return false;
        }
    },
    error => {
      console.log('Something went wrong!');
    });
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