import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";
import { environment } from '../../../../environments/environment';
import {Router} from "@angular/router";
@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public userNotiList = [];
  public repoUrl='';
  public IsShowSubMainCommentAction:any;

  constructor(
    private dataService: UserService,
    private router: Router
  ) { }

  ngOnInit() {
    this.repoUrl=environment.website_url;
    this.getAllNotificationList();
  }

  public getAllNotificationList(){
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserAllNotiData(dataUserDet).subscribe(data => {
          if (data.Ack == "1") {
            this.userNotiList = data.AllNotification;
            if(this.userNotiList.length>0){
              let viewNotiIdStr='';
              this.userNotiList.forEach(element => {
                if(element.id!=''){
                  viewNotiIdStr+=element.id+',';
                }
              });
              // if(viewNotiIdStr!=''){
              //   this.dataService.editNotificationById({ "id": viewNotiIdStr }).subscribe(res => {
              //   });
              // }
            }
            //console.log(this.userNotiList);
          }
        },
        error => {
        });
    }
  }

  public go_notification_details(url,id)
  {
    this.dataService.editNotificationById({ "id": id }).subscribe(res => {
      if(res.Ack == 1)
      {
        this.router.navigate([url]);
      }
    });
    //alert(id);
  }

  public notificationAction(noti_id,type){
    if(type=='H' && noti_id!=''){
      this.dataService.deleteNotification({ "id": noti_id }).subscribe(res => {
        if(res.Ack == 1)
        {
          //this.router.navigate([url]);
        }
      }); 
    }else if(type=='R' && noti_id!=''){
      this.dataService.unreadNotification({ "id": noti_id }).subscribe(res => {
        
      }); 
    }
    location.reload();
  }
  
  togglenotiList(id){
    
    if(!this.IsShowSubMainCommentAction){
      this.IsShowSubMainCommentAction=[];
    }
    if(this.IsShowSubMainCommentAction[id]){
      this.IsShowSubMainCommentAction[id]=false;
    }else{
      this.IsShowSubMainCommentAction[id]=true;
    }
  }

}
