import { Component, OnInit } from '@angular/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-findfriends',
  templateUrl: './findfriends.component.html',
  styleUrls: ['./findfriends.component.css']
})
export class FindfriendsComponent implements OnInit {
  public postform:FormGroup;
  returnUrl: string;
  errorMsg: string='';
  successMsg: string='';
  public loading = false;
  public loginUserId:any;
  public userRequestFrndList =[];
  public userSearchFrndList =[];

  constructor(
    private builder:FormBuilder, 
    private dataService: UserService, 
    private route: ActivatedRoute,
    private router: Router
   
  ) { 
    //alert();
    this.postform = builder.group({
			suname: ['', [
			   //Validators.required,
			   //Validators.minLength(3)
			 ]]
    });
  }

  ngOnInit() {
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.loginUserId=localStorage.getItem("loginUserId");
    //this.getPendingFrndList();
    this.submitSearchUser();
  }
  
  /*public getPendingFrndList(){
      if(this.loginUserId!=''){
          let dataUserDet ={
            "user_id": this.loginUserId
          };
          this.dataService.getRequestFrndListById(dataUserDet)
          .subscribe(data => {
                let details=data;
                //console.log(details);
                if (details.Ack=="1") {
                    this.userRequestFrndList = details.PendingFriendListById;
                }else{
                  
                }
            },
            error => {
              
            }
          ); 
        }else{
        }
  }*/

  public submitSearchUser() {
      this.loading = true;
      //this.loginUserId=localStorage.getItem("loginUserId");
      var result,
      userValue = this.postform.value;
      userValue.user_id = this.loginUserId;   
      //this.successMsg='';
      //this.errorMsg='';
      this.dataService.searchFrndListByName(userValue)
        .subscribe(
              data => {
                  this.loading = false;
                  if(data.Ack=='1'){
                      this.userSearchFrndList=data.FriendListById;
                  }else{
                    this.userSearchFrndList=[];
                  }
                  //this.postform.reset();
        },
        error => {
         // alert(error);
        });
  }
  
  public sendFriendRequest(friend_id) {
      this.loading = true;
      this.successMsg='';
      this.errorMsg='';
      //console.log(friend_id);
      let requestJsonData={"user_id": this.loginUserId, "friend_id": friend_id};
      this.dataService.sendFrndRequest(requestJsonData).subscribe(data => {
          this.loading = false;
          //console.log(data);
          if(data.Ack == '1'){
            this.successMsg='Connection request Sent';
            this.submitSearchUser();
          }else{
            this.errorMsg='You have already send the friend request';
          }
          //console.log(data);
          //this.postform.reset();
        },
        error => {
          //alert(error);
        });
  }

  public sendFollowRequest(company_id,sfriendData) {
    this.loading = true;
    //console.log(friend_id);
    if (this.loginUserId != '' && company_id != '') {
      let requestJsonData = { "user_id": this.loginUserId, "company_id": company_id };
      
      this.dataService.sendFollowRequest(requestJsonData)
        .subscribe(
        data => {
          console.log(data);
          if (data.Ack == 1) {
            sfriendData.follow = 1;
            //this.successMsg = 'You have successfully Follow.';
            //this.getFollowerList();
            
          } else {
            this.errorMsg = 'You have unfollow.';
          }
          this.loading = false;
        },
        error => {
          alert(error);
        });
    } else {
      this.router.navigateByUrl('/user/login');
    }
  }

  public unflow_company(company_id,sfriendData) {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId,
        "company_id": company_id,
        "id": ""
      };
      this.dataService.unflowcompany(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            sfriendData.follow = 0;
            //this.successMsg = "You have successfully unfollowed.";
            //this.isEmpRequest = false;
            //this.getFollowerList();
            
          } else {

          }
        },
        error => {

        }
        );
    } else {
    }
  }
  
  /*public acceptFriendRequest(request_id) {
      this.loading = true;
      this.successMsg='';
      this.errorMsg='';
      let requestJsonData={"id": request_id};
      this.dataService.acceptFrndRequest(requestJsonData)
        .subscribe(
              data => {
                  this.loading = false;
                  if(data.Ack==1){
                    this.successMsg=data.msg;
                    //this.getPendingFrndList();
                  }else{
                    //this.errorMsg='You have already send the friend request';
                  }
        },
        error => {
          alert(error);
        });
  }

  public rejectFriendRequest(request_id) {
      this.loading = true;
      this.successMsg='';
      this.errorMsg='';
      let requestJsonData={"id": request_id};
      this.dataService.rejectFrndRequest(requestJsonData).subscribe(data => {
          this.loading = false;
          if(data.Ack==1){
            this.successMsg=data.msg;
            //this.getPendingFrndList();
          }else{
            //this.errorMsg='You have already send the friend request';
          }
        },
        error => {
          alert(error);
        });
  }*/
}
