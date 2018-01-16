import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrls: ['./articledetails.component.css']
})
export class ArticledetailsComponent implements OnInit {
  articleData=[];
  SlugName='';
  public repoUrl = '';
  constructor(
    private _article_service:ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.repoUrl=environment.website_url+this.router.url;
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this._article_service.getArticleBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleData = details.ArticleListBySlug[0];
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