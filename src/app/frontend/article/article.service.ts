import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../service/api.service';

@NgModule()
export class ArticleService {
  constructor (
    private apiService: ApiService
  ) {}

  getArticleData(){
    return this.apiService.get(`/enrichment/apparticleWithCat`)
      .map(data => data);
  }

  getCatDetBySlug(slug){
    return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)
      .map(data => data);
  }
  
  getAllArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticleallcatsbyslug/${slug}`)
      .map(data => data);
  }
  
  getArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }

  getAllArticleByCategory(){
    return this.apiService.get(`/enrichment/apparticleallcatsbyslug/all`).map(data => data);
  }
}
