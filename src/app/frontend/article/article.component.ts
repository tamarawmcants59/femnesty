import { Component, OnInit } from '@angular/core';
import { ArticleService } from "./article.service";
import { DomSanitizer  } from '@angular/platform-browser';
@Component({
  selector: 'app-article',
  templateUrl: './article.component.html',
  styleUrls: ['./article.component.css']
})
export class ArticleComponent implements OnInit {
  articleConData=[];
  articleCatConData=[];

  constructor(
    private _service: ArticleService, 
    private sanitizer: DomSanitizer
  ) { }

  ngOnInit() {
    this._service.getArticleData().subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleConData = details.ArticleList;
            this.articleCatConData = details.ArticleCatList;
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
