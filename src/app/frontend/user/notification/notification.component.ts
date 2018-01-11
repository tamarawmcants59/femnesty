import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrls: ['./notification.component.css']
})
export class NotificationComponent implements OnInit {
  public userNotiList = [];
  constructor(
    private dataService: UserService
  ) { }

  ngOnInit() {
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
              if(viewNotiIdStr!=''){
                this.dataService.editNotificationById({ "id": viewNotiIdStr }).subscribe(res => {
                });
              }
            }
          }
        },
        error => {
        });
    }
  }
}
