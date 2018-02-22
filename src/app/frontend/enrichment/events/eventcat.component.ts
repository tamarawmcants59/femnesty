import { Component, OnInit } from '@angular/core';
import { EnrichmentService } from "../enrichment.service";
import { Router, ActivatedRoute, Params} from '@angular/router';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-eventcat',
  templateUrl: './eventcat.component.html',
  styleUrls: ['./eventcat.component.css']
})
export class EventcatComponent implements OnInit {
  articleCatData=[];
  articleListData=[];
  articleListData2=[];
  SlugName='';
  public repoUrl = '';

  constructor(
    private serviceData: EnrichmentService, 
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() { 
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this.repoUrl=environment.website_url+this.router.url;
//alert(this.SlugName)
    this.serviceData.getCatDetBySlug(this.SlugName).subscribe(data=>{
        let details=data;
       // alert(JSON.stringify(details))
        if (details.Ack=="1") {
            this.articleCatData = details.EventCatBySlug[0];
            this.articleListData = details.TopEventByCat;
           // alert(JSON.stringify(this.articleCatData))
            //console.log(this.articleListData)
            return false;
        }else{
            return false;
        }
        
      },
      error => {
        //alert('err')
        console.log('Something went wrong!');
      }
    );
    this.serviceData.getArticleBySlug('start-by-taking-care-of-yourself').subscribe(data=>{
      let details=data;
     // alert(JSON.stringify(details))
      if (details.Ack=="1") {
          //this.articleCatData = details.ArticleListBySlug[0];
          //alert(JSON.stringify(this.articleCatData))
          this.articleListData2 =details.ArticleListBySlug[0];
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