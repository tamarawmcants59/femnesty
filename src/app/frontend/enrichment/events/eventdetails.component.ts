import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-eventdetails',
  templateUrl: './eventdetails.component.html',
  styleUrls: ['./eventdetails.component.css']
})
export class EventdetailsComponent implements OnInit {

  SlugName='';
  articleData=[];
  constructor(
    private serviceData: EnrichmentService, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this.serviceData.getEventBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleData = details.EventListBySlug[0];
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
