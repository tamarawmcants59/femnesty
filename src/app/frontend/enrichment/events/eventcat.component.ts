import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { Router, ActivatedRoute, Params} from '@angular/router';

@Component({
  selector: 'app-eventcat',
  templateUrl: './eventcat.component.html',
  styleUrls: ['./eventcat.component.css']
})
export class EventcatComponent implements OnInit {
  articleCatData=[];
  articleListData=[];
  SlugName='';

  constructor(
    private serviceData: EnrichmentService, 
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });

    this.serviceData.getCatDetBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleCatData = details.EventCatBySlug[0];
            this.articleListData = details.TopEventByCat;
            //console.log(this.articleListData)
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
