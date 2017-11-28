import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { ArticleService } from "../article.service";

@Component({
  selector: 'app-articledetails',
  templateUrl: './articledetails.component.html',
  styleUrls: ['./articledetails.component.css']
})
export class ArticledetailsComponent implements OnInit {
  articleData=[];
  SlugName='';
  constructor(
    private _article_service:ArticleService,
    private activatedRoute: ActivatedRoute
  ) { }

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
