import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-articlecat',
  templateUrl: './articlecat.component.html',
  styleUrls: ['./articlecat.component.css']
})
export class ArticlecatComponent implements OnInit {
  articleCatData=[];
  articleListData=[];
  SlugName='';
  public repoUrl = '';
  constructor(
    private _artcat_service:ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
        this.getCatwiseArticle();
    });
    this.repoUrl=environment.website_url+this.router.url;
  }

  ngOnInit() {
    
  }

  getCatwiseArticle(){
    this._artcat_service.getCatDetBySlug(this.SlugName).subscribe(data=>{
      let details=data;
      if (details.Ack==1) {
          //console.log(details);
          this.articleCatData = details.ArticleCatBySlug[0];
          this.articleListData = details.TopArticleByCat;
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