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
  
  userContactDataSend(form_data){
    return this.apiService.post(`/users/appusercontactus`, form_data).map(data => data);
  }
  
  getUserNotiData(form_data){
    return this.apiService.post(`/users/appallviewnotifibycount`,form_data ).map(data => data);
  }
}
