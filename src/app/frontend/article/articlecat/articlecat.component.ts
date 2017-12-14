import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-articlecat',
  templateUrl: './articlecat.component.html',
  styleUrls: ['./articlecat.component.css']
})
export class ArticlecatComponent implements OnInit {
  articleCatData=[];
  articleListData=[];
  SlugName='';
  constructor(
    private _artcat_service:ArticleService,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
        this.getCatwiseArticle();
    });
  }

  ngOnInit() {
    
  }

  getCatwiseArticle(){
    this._artcat_service.getCatDetBySlug(this.SlugName).subscribe(data=>{
      let details=data;
      if (details.Ack=="1") {
          this.articleCatData = details.ArticleCatBySlug[0];
          this.articleListData = details.TopArticleByCat;
      }
    },
    error => {
      console.log('Something went wrong!');
    });
  }

}
