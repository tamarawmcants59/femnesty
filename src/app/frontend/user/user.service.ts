import { NgModule } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import * as firebase from 'firebase';

import { ApiService } from '../../service/api.service';

@NgModule()
export class UserService {
  //currentFireUserId:string;
  constructor(
    private apiService: ApiService,
    
  ) { 
    

  }

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
            //const fireBaseLogUserId=res.uid;
            //console.log(fireBaseLogUserId);
            //console.log(res);
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

  updateAccountDet(form_data) { //alert(JSON.stringify(form_data))
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
  editPost(form_data) {
    return this.apiService.post(
      `/enrichment/appusereditposts`,
      form_data
    ).map(data => data);
  }
  
  editComment(form_data) {
    return this.apiService.post(
      `/enrichment/appusereditcomment`,
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
  getEmailNotficationSettings() {
    return this.apiService.get(`/enrichment/app_noti_settings`)
      .map(data => data);
  }

  apparticleWithCat() {
    return this.apiService.get(`/enrichment/apparticleWithCat`)
      .map(data => data);
  }
  
  getAllGrpList(form_data) {
    return this.apiService.get(`/users/appactivegrouplist`,form_data).map(data => data);
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
  getcompanylist(form_data) {
    return this.apiService.post(
      `/users/ComapnyListByemployeeId`,
      form_data
    ).map(data => data);
  }
  unflowcompany(form_data){
    return this.apiService.post(
      `/users/appUnflowCompany`,
      form_data
    ).map(data => data);
  }
  sendFollowRequest(form_data) {
    return this.apiService.post(
      `/enrichment/appusercompanyfollowunfollow`,
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

  appsharestory(form_data) {
    return this.apiService.post(
      `/enrichment/appuseraddarticle`,
      form_data
    ).map(data => data);
  }

  mentorship(form_data) {
    return this.apiService.post(
      `/enrichment/appaddmentorship`,
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
  
  getGrpDetById(form_data) {
    return this.apiService.post(`/users/appgroupdetailsbygroupid`,form_data).map(data => data);
  }
  
  getGroupPostById(form_data) {
    return this.apiService.post(
      `/enrichment/appallpostbygroupid`,
      form_data
    ).map(data => data);
  }

  getGroupMemberListById(form_data) {
    return this.apiService.post(
      `/users/appgroupmemberbygroupid`,
      form_data
    ).map(data => data);
  }
  getGroupReqMemberListById(form_data) {
    return this.apiService.post(
      `/users/appgroupmemberReqbygroupid`,
      form_data
    ).map(data => data);
  }

  joinGroupRequestByUser(form_data) {
    return this.apiService.post(
      `/users/appsendjoinrequesttogrp`,
      form_data
    ).map(data => data);
  }

  leaveGroupRequestByUser(form_data) {
    return this.apiService.post(
      `/users/appsendleaverequesttogrp`,
      form_data
    ).map(data => data);
  }

  cancelGroupRequestByUser(form_data) {
    return this.apiService.post(
      `/users/appsendcancelrequesttogrp`,
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
  
  getUserImgListById(form_data) {
    return this.apiService.post(
      `/users/appuserallimagesbyid`,
      form_data
    ).map(data => data);
  }
  
  getUseGroupListById(form_data) {
    return this.apiService.post(
      `/users/appgrouplistbyuserid`,
      form_data
    ).map(data => data);
  }
  
  getAllMentorshipList() {
    return this.apiService.get(`/enrichment/appallmentorlist`)
      .map(data => data);
  }
  
  getMentorshipDetailsById(form_data) {
    return this.apiService.post(
      `/enrichment/appmentorshipdetailsbyid`,
      form_data
    ).map(data => data);
  }

  getUserAllNotiData(form_data){
    return this.apiService.post(`/users/appnotificationall`,form_data ).map(data => data);
  }
  
  editNotificationById(form_data){
    return this.apiService.post(`/users/appallupdateNotifiisreaded`,form_data ).map(data => data);
  }
  
  getUserGrpFrndListById(form_data){
    return this.apiService.post(`/users/appgrprivatememberlist`,form_data ).map(data => data);
  }
  
  getAllUserListforGrp(form_data){
    return this.apiService.post(`/users/appgrpublicmemberlist`,form_data ).map(data => data);
  }

  getmyRequestGroupList(form_data){
    return this.apiService.post(`/users/appusergrprequestlistbyid`,form_data ).map(data => data);
  }
  
  responseGroupRequestByUser(form_data){
    return this.apiService.post(`/users/acceptorRejectgroupRequestbyuser`,form_data ).map(data => data);
  }

  responsePrivateGroupRequestByUser(form_data){
    return this.apiService.post(`/users/appacceptorrejectgrouprequest`,form_data ).map(data => data);
  }

  checkPrivateGroupsStatus(form_data){
    return this.apiService.post(`/users/app_user_grpreqlist`,form_data ).map(data => data);
  }

  
  getUseAllGroupListById(form_data){
    return this.apiService.post(`/users/appusergroupresentlistbyuserid`,form_data ).map(data => data);
  }
  
  inviteMemberTojoinGroup(form_data){
    return this.apiService.post(`/users/apprefferjoinrequesttogrp`,form_data ).map(data => data);
  }

  getFourArticleList(){
    return this.apiService.get(`/enrichment/apparticlelistlast`)
      .map(data => data);
  }
  
  submitNewsLetter(form_data){
    return this.apiService.post(`/users/appusernewsletter`,form_data ).map(data => data);
  }

  teampostData(form_data) {
    return this.apiService.post(`/enrichment/appaddteam`,form_data).map(data => data);
  }
  
  userForgotPwsLink(form_data) {
    return this.apiService.post(`/users/appforgotpassword`,form_data).map(data => data);
  }
  
  userChangePassword(form_data) {
    return this.apiService.post(`/users/appupdatepassword`,form_data).map(data => data);
  }
  
  userActivationLink(form_data) {
    return this.apiService.post(`/users/appactivateaccount`,form_data).map(data => data);
  }

  getCountryList(){
    return this.apiService.get(`/users/appcountrylist`).map(data => data);
  }
 
  getCategoryListWithCount(){
    return this.apiService.post(`/users/appcategorylistBygroupcount`).map(data => data);
  }
  getGroupListByCategoryId(data){
    return this.apiService.post(`/users/appgrouplistbycategory`,data).map(data => data);
  }

  getLatestHubs(user_id) {
    return this.apiService.put(`/hub/latest_hubs/` + user_id + '/4').map(data => data);
  } 

  leaveGroup(data)
  {
    return this.apiService.post(`/users/appLeaveGroup`,data).map(data => data);
  }
  getHubCategories()
  {
      return this.apiService.get(`/hub/categories`).map(data => data);
  }
}