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
  articleCatData:any;
  articleListData=[];
  articleMainData=[];
  articleAllCatData=[];
  catWiseAllArt=[];
  SlugName='';
  public repoUrl = '';
  public AllArtCnt:number=0;
  constructor(
    private _artcat_service:ArticleService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
        if(this.SlugName=='all'){
          this.getArticleMainImg();
          this.getAllCatwiseArticle();
          this.getAllCatArticle();
        }else{
          this.getCatwiseArticle();
        }
        
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

  getAllCatArticle(){
    this._artcat_service.getCatAllArticleList().subscribe(data=>{
      let details=data;
      if (details.Ack==1) {
          this.articleAllCatData = details.ArticleAllCategory;
          if(details.ArticleAllCategory.length>0){
            details.ArticleAllCategory.forEach(element => {
              if(element.count>0){
                this.AllArtCnt+=element.count;
              }
            });
          }
      }
    },
    error => {
      console.log('Something went wrong!');
    });
  }

  getAllCatwiseArticle(){
    this._artcat_service.getAllArticleByCategory().subscribe(data=>{
      let details=data;
      if (details.Ack==1) {
          //console.log(details);
          this.catWiseAllArt = details.ArticleAllBycatSlug;
      }
    },
    error => {
      console.log('Something went wrong!');
    });
  }

  getArticleMainImg(){
    this._artcat_service.getArticleData().subscribe(data=>{
          let details=data;
          if (details.Ack=="1") {
              //this.articleMainData = details.ArticleList;
              this.articleCatData = {'banner_image_url':details.ArticleList[0].banner_image_url,'name':details.ArticleList[0].title};
            //console.log(this.articleCatData);
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