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

  uploadFile(form_data) {
    return this.apiService.post(
      `/users/uploadfile`,
      form_data
    ).map(data => {
      console.log(data);
      return data;
    });
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

  getUserIsMyFrnd(form_data) {
    return this.apiService.post(
      `/users/appsearchexistfriendornot`,
      form_data
    ).map(data => data);
  }
  
  getmyGroupList(form_data) {
    return this.apiService.post(
      `/users/appgrouplistbyuserid`,
      form_data
    ).map(data => data);
  }
  
  createGroupDataSend(form_data) {
    return this.apiService.post(
      `/users/appcreategroup`,
      form_data
    ).map(data => data);
  }

  getGroupDetById(form_data) {
    return this.apiService.post(
      `/users/appgroupdetailsbygroupid`,
      form_data
    ).map(data => data);
  }
  
  editGroupDataSend(form_data) {
    return this.apiService.post(
      `/users/appeditgroup`,
      form_data
    ).map(data => data);
  }

  saveShareYourStory(form_data) {
    return this.apiService.post(
      `/users/appuserpendfriendlistbyid`,
      form_data
    ).map(data => data);
  }

  myShareStoryList(form_data) {
    return this.apiService.post(
      `/users/appuserpendfriendlistbyid`,
      form_data
    ).map(data => data);
  }
  
  getGrpDetBySlug(form_data) {
    return this.apiService.post(
      `/users/appgroupdetailsbygroupslug`,
      form_data
    ).map(data => data);
  }
  
  getGroupPostById(form_data) {
    return this.apiService.post(
      `/enrichment/appallallpostbygroupid`,
      form_data
    ).map(data => data);
  }

  getGroupMemberListById(form_data) {
    return this.apiService.post(
      `/users/appgroupmemberbygroupid`,
      form_data
    ).map(data => data);
  }
  
  joinGroupRequestByUser(form_data) {
    return this.apiService.post(
      `/users/appsendjoinrequesttogrp`,
      form_data
    ).map(data => data);
  }
  
  joinGroupMemberByAdmin(form_data) {
    return this.apiService.post(
      `/users/appaddgroupmember`,
      form_data
    ).map(data => data);
  }
  
  getGroupRequestMemberListById(form_data) {
    return this.apiService.post(
      `/users/apppedingrquestcountByGid`,
      form_data
    ).map(data => data);
  }
  
  responseGroupRequestByAdmin(form_data) {
    return this.apiService.post(
      `/users/appacceptorrejectgrouprequest`,
      form_data
    ).map(data => data);
  }

  getGroupImgListById(form_data) {
    return this.apiService.post(
      `/users/appallgroupimagebygrpid`,
      form_data
    ).map(data => data);
  }
  
}
