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

}
