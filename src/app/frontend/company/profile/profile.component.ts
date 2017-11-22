import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CompanyService } from "../company.service";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  public userNameByUrl: string='';
  public isloginUserId:any;
  public otherProfileDet:any;
  public otherProfileId:any;
  public isloginUser:any;
  public userPostList = [];
  public userFrndList = [];
  public activeTab: string = 'activity';
  public aboutActiveTab: string = 'overview';
  public successMsg: string ='';
  public errorMsg: string = '';
  public checkIsFriend:boolean = false;

  constructor(
    private dataService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
      this.isloginUserId = localStorage.getItem("loginUserId");
      this.isloginUser = localStorage.getItem("isLoggedIn");
   }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.userNameByUrl = params['uname'];
    });
    this.getUserDetailsByUname();
  }

  public getUserDetailsByUname() {   
    if (this.userNameByUrl != '') {
      const dataUserDet = {
        "display_name": this.userNameByUrl
      };
      this.dataService.getUserDetByUname(dataUserDet)
        .subscribe(data => {
         //console.log(data);
          if (data.Ack == "1") {
            this.otherProfileDet = data.UserDetails[0];
            //console.log(this.otherProfileDet.id);
            this.otherProfileId = this.otherProfileDet.id;

            this.getUserPostDetails();
            this.getConnectionList();
            this.checkMyFrndData();
          }
        },
        error => {

        });
    }
  }
  
  public checkMyFrndData() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '' && this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId, "friend_id": this.otherProfileId
      };
      this.dataService.getUserIsMyFrnd(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.msg == "Friend" && details.Ack == "1") {
            this.checkIsFriend = true;
          }else{
            this.checkIsFriend = false;
          }
        },
        error => {

        }
        );
    }
  }

  public getUserPostDetails() {
    //console.log(this.otherProfileId);
    if (this.otherProfileId != '') {
      const dataUserDet = {
        "user_id": this.otherProfileId
      };
      this.dataService.getUserPostById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userPostList = details.ActivePostByUser;
          }
        },
        error => {

        }
        );
    }
  }

  public getConnectionList() {
      if (this.otherProfileId != '') {
        const dataUserDet = {
          "user_id": this.otherProfileId
        };
        this.dataService.getUserFrndListById(dataUserDet)
          .subscribe(data => {
            const details = data;
            if (details.Ack == "1") {
              this.userFrndList = details.FriendListById;
            } 
            //console.log(this.userFrndList);
          },
          error => {

          });
      }
    }

    public toggleTab(data: any) {
      //console.log(data);
      this.activeTab = data;
      this.successMsg = '';
      this.errorMsg = '';
    }
  
    public aboutToggleTab(data: any) {
      this.successMsg = '';
      this.errorMsg = '';
      this.aboutActiveTab = data;
    }

    public sendFriendRequest(friend_id) {
      //console.log(friend_id);
      if (this.isloginUserId != '' && friend_id != '') {
        let requestJsonData={"user_id": this.isloginUserId, "friend_id": friend_id};
        this.dataService.sendFrndRequest(requestJsonData)
          .subscribe(
            data => {
                if(data.Ack==1){
                  this.successMsg='You have successfully send the friend request';
                }else{
                  this.errorMsg='You have already send the friend request';
                }
            },
          error => {
            alert(error);
          });
      }else{
        this.router.navigateByUrl('/user/login');
      }
    }
}
