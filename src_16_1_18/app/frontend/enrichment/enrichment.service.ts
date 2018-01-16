import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../service/api.service';
//import { Enrichment } from "./enrichment.model";

@NgModule()
export class EnrichmentService {
  constructor (
    private apiService: ApiService
  ) {}

  getEnrichmentData(){
    return this.apiService.get(`/enrichment/appenrichmentcontent`)
      .map(data => data);
  }

  getAllBookListData(){
    return this.apiService.get(`/enrichment/appbooksall`)
      .map(data => data);
  }

  getBookCatList(){
    return this.apiService.get(`/enrichment/appbookallcategory`).map(data => data);
  }
  
  getArticalListData(){
    return this.apiService.get(`/enrichment/appeventlist`)
      .map(data => data);
  }
  getVideoListData(){
    return this.apiService.get(`/enrichment/appvideosall`)
      .map(data => data);
  }

  getEnrichmentDetData(){
    return this.apiService.get(`/enrichment/appenrichmentcontent`);
  }

  getBookDetBySlug(slug){
    return this.apiService.get(`/enrichment/appbooksdetailsbyslug/${slug}`)
      .map(data => data);
  }
  
  getCatWiseBookListData(slug){
    return this.apiService.get(`/enrichment/appbookslistorbyslug/${slug}`).map(data => data);
  }

  getVideoDetBySlug(slug){
    return this.apiService.get(`/enrichment/appvideodetailsbyslug/${slug}`)
      .map(data => data);
  }
  
  getCatDetBySlug(slug){
    return this.apiService.get(`/enrichment/appeventcatsbyslug/${slug}`)
      .map(data => data);
  }
  
  getAllEventBySlug(slug){
    return this.apiService.get(`/enrichment/appeventallcatsbyslug/${slug}`)
      .map(data => data);
  }
  getArticleData(){
    return this.apiService.get(`/enrichment/appeventWithCat`)
      .map(data => data);
  }
  
  getEventBySlug(slug){
    return this.apiService.get(`/enrichment/eventDetailsBySlug/${slug}`)
      .map(data => data);
  }
  
  postRatingData(form_data){
    return this.apiService.post(`/enrichment/appbookaddrating`,form_data ).map(data => data);
  }

  getRatingData(form_data){
    return this.apiService.post(`/enrichment/appbookratinglist`,form_data ).map(data => data);
  }
  /*add(slug, payload): Observable<Enrichment> {
    return this.apiService
    .post(
      `/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).map(data => data.comment);
  }

  getAll(slug): Observable<Comment[]> {
    return this.apiService.get(`/articles/${slug}/comments`)
           .map(data => data.comments);
  }

  destroy(commentId, articleSlug) {
    return this.apiService
           .delete(`/articles/${articleSlug}/comments/${commentId}`);
  }*/

}
