import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

import { ApiService } from '../../service/api.service';

@NgModule()
export class CompanyService {
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

  companySignup(form_data) {
    return this.apiService.post(
      `/users/appaddcomadmin`,
      form_data
    ).map(data => data);
  }

  getCompanyRequestList(form_data) {
    return this.apiService.post(
      `/users/apppendingemployeeListBycompanyId`,
      form_data
    ).map(data => data);
  }

  getCompanyImageList(form_data) {
    return this.apiService.post(
      `users/appallgroupimagebygrpid`,
      form_data
    ).map(data => data);
  }

  getCompanyEmployeetList(form_data) {
    return this.apiService.post(
      `/users/appemployeelistbycompanyid`,
      form_data
    ).map(data => data);
  }

  getCompanyFollowerList(form_data) {
    return this.apiService.post(
      `/enrichment/appcompanyfollowerlist`,
      form_data
    ).map(data => data);
  }

  RequestAcceptReject(form_data) {
    return this.apiService.post(
      `/users/appacceptorrejectemployeerequest`,
      form_data
    ).map(data => data);
  }
  
  getCompanyDetByname(form_data) {
    return this.apiService.post(
      `/users/appsearchbycompanyslug`,
      form_data
    ).map(data => data);
  }

  getUserIsMyFrnd(form_data) {
    return this.apiService.post(
      `/users/appsearchexistfriendornot`,
      form_data
    ).map(data => data);
  }

  getUserPostById(form_data) {
    return this.apiService.post(
      `/enrichment/appactivepostbyuser`,
      form_data
    ).map(data => data);
  }

  getUserFrndListById(form_data) {
    return this.apiService.post(
      `/users/appuserfriendslistbyid`,
      form_data
    ).map(data => data);
  }

  sendEmployeeRequest(form_data) {
    return this.apiService.post(
      `/users/appsendjoinrequesttocompany`,
      form_data
    ).map(data => data);
  }
  sendFollowRequest(form_data) {
    return this.apiService.post(
      `/users/appusercompanyfollowunfollow`,
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

  updateAccountDet(form_data) {
    return this.apiService.post(
      `/users/appupdateaccount`,
      form_data
    ).map(data => data);
  }

  createEmployeeDet(form_data) {
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

}
