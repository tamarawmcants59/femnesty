import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../service/api.service';

@NgModule()
export class UserService {
  constructor (
    private apiService: ApiService
  ) {}

  /*getArticleData(){
    return this.apiService.get(`/enrichment/apparticleWithCat`)
      .map(data => data);
  }*/
  /*add(slug, payload): Observable<Enrichment> {
    return this.apiService
    .post(
      `/articles/${slug}/comments`,
      { comment: { body: payload } }
    ).map(data => data.comment);
  }*/

  userLogin(form_data){
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
        `/users/appsignin`,
        //{comment: { body: form_data } }
        form_data
    ).map(data => data);
  }

  userCheckEmail(form_data){
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
        `/users/appsearchbyemail`,
        form_data
    ).map(data => data);
  }
  
  getUserDetById(form_data){
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
        `/users/appuserdetails`,
        form_data
    ).map(data => data);
  }
  
  userSignup(form_data){
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
        `/users/appsignup`,
        form_data
    ).map(data => data);
  }
  
  updateAccountDet(form_data){
    return this.apiService.post(
        `/users/appupdateaccount`,
        form_data
    ).map(data => data);
  }
  
  updateImgService(form_data){
    return this.apiService.post(
        `/users/appupdateaccount`,
        form_data
    ).map(data => data);
  }
  
  postDataSend(form_data){
    return this.apiService.post(
        `/enrichment/appuseraddposts`,
        form_data
    ).map(data => data);
  }
  
  getUserPostById(form_data){
    return this.apiService.post(
        `/enrichment/appactivepostbyuser`,
        form_data
    ).map(data => data);
  }

  getArticleBySlug(slug){
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }

  getUserFrndListById(form_data){
    return this.apiService.post(
        `/users/appuserfriendslistbyid`,
        form_data
    ).map(data => data);
  }

  getRequestFrndListById(form_data){
    return this.apiService.post(
        `/users/appuserpendfriendlistbyid`,
        form_data
    ).map(data => data);
  }

  searchFrndListByName(form_data){
    return this.apiService.post(
        `/users/appsearchfriend`,
        form_data
    ).map(data => data);
  }
}
