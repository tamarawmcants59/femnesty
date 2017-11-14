import { NgModule } from '@angular/core';

import { FrontendRoute  } from "./frontend.route";
import { HomeComponent } from "./home/home.component";
import { FrontendComponent } from "./frontend.component";
//import { FrontendService } from "../components/frontend-app-header/frontend.service";
//import { TruncatePipe, SafePipe } from '../exponential-strength.pipe';
//import { EnrichmentComponent } from "./enrichment/enrichment.component";
//import { ArticleComponent } from "./article/article.component";
//import { ArticleModule } from "./article/article.module";
//import { EnrichmentModule } from "./enrichment/enrichment.module";
@NgModule({
  imports: [
    FrontendRoute,
    //EnrichmentModule,
    //ArticleModule
  ],
  //exports:[TruncatePipe, SafePipe],
  declarations: [
    HomeComponent, 
    FrontendComponent, 
    //TruncatePipe, 
    //SafePipe
  ],providers:[]
})

export class FrontendModule {
  constructor(){
    //alert();
  }

}
