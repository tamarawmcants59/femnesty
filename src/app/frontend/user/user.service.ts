import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

import { ApiService } from '../../service/api.service';

@NgModule()
export class UserService {
  constructor(
    private apiService: ApiService
  ) { }

  userLogin(form_data) {
    return this.apiService.post(
      `/users/appsignin`,
      form_data
    ).map(data => {
      if (data['Ack'] === 1 && data['UserDetails']['email']) {
        const email = data['UserDetails']['email'];
        const password = data['UserDetails']['email'];
        firebase.auth().signInWithEmailAndPassword(email, password)
          .then(res => {
            console.log(res);
          })
          .catch(err => {
            //console.log(err);
            firebase.auth().createUserWithEmailAndPassword(email, password)
              .then(res => {
                console.log(res);
              })
              .catch(err2 => {
                console.log(err2);
              });
          });
      }
      return data;
    });
  }

  userCheckEmail(form_data) {
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)  
    return this.apiService.post(
      `/users/appsearchbyemail`,
      form_data
    ).map(data => data);
  }

  getUserDetById(form_data: { id: any }) {
    //return this.apiService.get(`/enrichment/apparticlecatsbyslug/${slug}`)
    return this.apiService.post(
      `/users/appuserdetails`,
      form_data
    ).map(data => data);
  }

  userSignup(form_data) {
    return this.apiService.post(
      `/users/appsignup`,
      form_data
    ).map(data => data);
  }

  updateAccountDet(form_data) {
    return this.apiService.post(
      `/users/appupdateaccount`,
      form_data
    ).map(data => data);
  }

  updateImgService(form_data) {
    return this.apiService.post(
      `/users/appupdateaccount`,
      form_data
    ).map(data => data);
  }

  postDataSend(form_data) {
    return this.apiService.post(
      `/enrichment/appuseraddposts`,
      form_data
    ).map(data => data);
  }

  getUserPostById(form_data) {
    return this.apiService.post(
      `/enrichment/appactivepostbyuser`,
      form_data
    ).map(data => data);
  }

  getArticleBySlug(slug) {
    return this.apiService.get(`/enrichment/apparticledetailsbyslug/${slug}`)
      .map(data => data);
  }

  getUserFrndListById(form_data) {
    return this.apiService.post(
      `/users/appuserfriendslistbyid`,
      form_data
    ).map(data => data);
  }

  getRequestFrndListById(form_data) {
    return this.apiService.post(
      `/users/appuserpendfriendlistbyid`,
      form_data
    ).map(data => data);
  }

  searchFrndListByName(form_data) {
    return this.apiService.post(
      `/users/appsearchfriend`,
      form_data
    ).map(data => data);
  }

  sendFrndRequest(form_data) {
    return this.apiService.post(
      `/users/appsendfriendrequest`,
      form_data
    ).map(data => data);
  }

  acceptFrndRequest(form_data) {
    return this.apiService.post(
      `/users/appacceptfriendrequest`,
      form_data
    ).map(data => data);
  }

  rejectFrndRequest(form_data) {
    return this.apiService.post(
      `/users/apprejectfriendrequest`,
      form_data
    ).map(data => data);
  }
  
  getUserDetByUname(form_data) {
    return this.apiService.post(
      `/users/appuserbydisplayname`,
      form_data
    ).map(data => data);
  }

}
