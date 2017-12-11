import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../service/api.service';

@NgModule()
export class FrontendService {
  constructor (
    private apiService: ApiService
  ) {
      //alert("ffffffffff");
  }

  getAllPageData(){
    return this.apiService.get(`/enrichment/appcontentallbyslug/all`)
      .map(data => data);
  }

  getPageDetBySlug(slug){
    return this.apiService.get(`/enrichment/appcontentallbyslug/${slug}`)
      .map(data => data);
  }
  
  getUserDetById(form_data){
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
        `/users/appuserdetails`,
        form_data
    ).map(data => data);
  }

  getSiteSettings(){
    return this.apiService.get(`/enrichment/appallsitesettings`)
      .map(data => data);
  }
  
  getHomePageData(){
    return this.apiService.get(`/enrichment/apphomepagecontent`).map(data => data);
  }
  
  getHomePageTopArtData(){
    return this.apiService.get(`/enrichment/appisfeaturedarticlelist`).map(data => data);
  }

  userContactDataSend(form_data){
    return this.apiService.post(`/users/appusercontactus`, form_data).map(data => data);
  }
  
  getUserNotiData(form_data){
    return this.apiService.post(`/users/appallviewnotifibycount`,form_data ).map(data => data);
  }
  
  getUserSearchdata(form_data){
    return this.apiService.post(`/enrichment/appsearchbykeyword`,form_data ).map(data => data);
  }

  getUserFrndListById(form_data) {
    return this.apiService.post(`/users/appuserfriendslistbyid`,form_data).map(data => data);
  }
}
