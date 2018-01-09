import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { ApiService } from '../../service/api.service';

@NgModule()
export class HubService {
    //currentFireUserId:string;
    constructor(
        private apiService: ApiService,

    ) {


    }

    getmyRequestGroupList(id) {
        return this.apiService.get(`/hub/list/` + id).map(data => data);
    }

    createNewHub(form_data){
        return this.apiService.post(
            `/hub/add`,
            form_data
        ).map(data => data);
    }

    getMyHubRequest(user_id)
    {
        return this.apiService.get(`/hub/invites/` + user_id).map(data => data);
    }

    getHubCategories()
    {
        return this.apiService.get(`/hub/categories`).map(data => data);
    }

    getHubDetails(slug)
    {
        return this.apiService.get(`/hub/details/` + slug).map(data => data);
    }

    attendHub(data)
    {
        return this.apiService.post(
            `/hub/attend`,
            data
        ).map(data => data);
    }

    acceptHubRequest(data) {
        return this.apiService.post(
            `/hub/accept`,
            data
        ).map(data => data);
    }

    rejectHubRequest(data) {
        return this.apiService.post(
            `/hub/reject`,
            data
        ).map(data => data);
    }

    uninvitedUsers(data){
        return this.apiService.post(
            `/hub/uninvited`,
            data
        ).map(data => data);
    }

    sendInvites(data){
        return this.apiService.post(
            `/hub/send_invites`,
            data
        ).map(data => data);
    }


}
