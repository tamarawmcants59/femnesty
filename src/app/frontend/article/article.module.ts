import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ArticleComponent } from './article.component';
import { ArticleRouting } from './article-routing';
import { ArticleService } from "./article.service";
//import { ApiService} from "../../service/api.service";
//import { JwtService} from "../../service/jwt.service";

//import { Http,HttpModule } from "@angular/http";
import { ArticlecatComponent } from './articlecat/articlecat.component';
import { ArticlecatwiselistComponent } from './articlecat/articlecatwiselist.component';
import { ArticledetailsComponent } from './articlecat/articledetails.component';
import { ApplicationPipes } from "../../application-pipe.module";

@NgModule({
  imports: [
    CommonModule,
    //HttpModule,
    ArticleRouting,
    ApplicationPipes
  ],
  //declarations: [ArticleComponent, TruncatePipe, SafePipe], 
  declarations: [ArticleComponent, ArticlecatComponent, ArticlecatwiselistComponent, ArticledetailsComponent], 
  //providers: [ApiService,ArticleService,JwtService]
  providers: [ArticleService]
})
export class ArticleModule { }
