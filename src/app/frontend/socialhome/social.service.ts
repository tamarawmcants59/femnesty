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

  deletePost(data)
  {
    return this.apiService.post(`/users/appuserpostdelete`,data).map(data => data);
  }
  /*blockPost(data){
    return this.apiService.post(`/users/app_user_blockpost`,data).map(data => data);
  }*/
  blockPost(data){
    return this.apiService.post(`/enrichment/app_block_post`,data).map(data => data);
  }
  reportPost(data)
  {
    return this.apiService.post(`/users/app_user_reportpost`,data).map(data => data);
  }
  
  reportComment(data){
    return this.apiService.post(`/users/appreportcomment`,data).map(data => data);
  }
  /*getArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }*/

}
