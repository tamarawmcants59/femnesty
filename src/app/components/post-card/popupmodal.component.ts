import { Component, OnInit ,Inject} from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { SocialService } from "../../frontend/socialhome/social.service";
@Component({
  selector: 'app-popupmodal',
  templateUrl: './popupmodal.component.html',
  styleUrls: ['./popupmodal.component.css']
})
export class PopupmodalComponent implements OnInit {
  public userList=[];
  constructor(public dialog: MatDialog,
    private dataService: SocialService,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

  ngOnInit() {
    //console.log(this.data);
    this.getUserLikeList();
  }
  
  public getUserLikeList(){
    let dataUserDet ={
      "post_id": this.data.namePid
    };
    this.dataService.likePostUserList(dataUserDet).subscribe(data => {
          let details=data;
          console.log(details);
          if (details.Ack==1) {
            this.userList=details.likeUserList;
          }
      },
      error => {
        
      }
    );
  }
}
