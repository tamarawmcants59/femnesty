import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { ApiService } from '../../service/api.service';

@NgModule()
export class SocialService {
  constructor (
    private apiService: ApiService
  ) {}

  /*getArticleData(){
    return this.apiService.get(`/enrichment/apparticleWithCat`)
      .map(data => data);
  }*/
  
  getAllUserPost(form_data){
    return this.apiService.post(
        `/enrichment/appallpostbyuser`,
        form_data
    ).map(data => data);
  }

  getUserPostById(form_data){
    return this.apiService.post(
        `/enrichment/appallpostbyfrienduser`,
        form_data
    ).map(data => data);
  }
  
  postDataSend(form_data){
    return this.apiService.post(
        `/enrichment/appuseraddposts`,
        form_data
    ).map(data => data);
  }
  
  /*getArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }*/

}
