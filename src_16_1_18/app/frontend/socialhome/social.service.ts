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
  
  userPostDataSend(form_data){
    return this.apiService.post(
        `/enrichment/appuseraddpostcomment`,
        form_data
    ).map(data => data);
  }

  getFourArticleList(){
    return this.apiService.get(`/enrichment/apparticlelistlast`)
      .map(data => data);
  }
  
  likePostUser(form_data){
    return this.apiService.post(
        `/enrichment/appuseraddpostlike`,
        form_data
    ).map(data => data);
  }
  
  likePostUserList(form_data){
    return this.apiService.post(`/users/apppostlike`,form_data).map(data => data);
  }
  /*getArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }*/

}
