import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { EnrichmentService } from "../enrichment.service";

@Component({
  selector: 'app-eventcatlist',
  templateUrl: './eventcatlist.component.html',
  styleUrls: ['./eventcatlist.component.css']
})
export class EventcatlistComponent implements OnInit {
  articleDetData=[];
  articleListData=[];
  SlugName='';

  constructor(
    private _artcat_service:EnrichmentService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this._artcat_service.getArticleData().subscribe(data=>{
        let details=data;
        //console.log(details);
        if (details.Ack=="1") {
            this.articleDetData = details.EventList;
            return false;
        }else{
            return false;
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    );


    this._artcat_service.getAllEventBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        //console.log(details);
        if (details.Ack=="1") {
            this.articleListData = details.EventAllBycatSlug;
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
