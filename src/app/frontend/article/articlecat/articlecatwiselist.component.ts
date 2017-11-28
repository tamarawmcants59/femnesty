import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-articlecatwiselist',
  templateUrl: './articlecatwiselist.component.html',
  styleUrls: ['./articlecatwiselist.component.css']
})
export class ArticlecatwiselistComponent implements OnInit {
  articleDetData=[];
  articleListData=[];
  SlugName='';
  constructor(
    private _artcat_service:ArticleService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['slug'];
    });
    this._artcat_service.getArticleData().subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleDetData = details.ArticleList;
            return false;
        }else{
            return false;
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    );


    this._artcat_service.getAllArticleBySlug(this.SlugName).subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
            this.articleListData = details.ArticleAllBycatSlug;
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
