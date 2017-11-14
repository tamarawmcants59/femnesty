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
    this.getPendingFrndList();
  }
  
  public getPendingFrndList(){
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
  }

  public submitSearchUser() {
      this.loading = true;
      this.loginUserId=localStorage.getItem("loginUserId");
      var result,
      userValue = this.postform.value;
      userValue.user_id = this.loginUserId;   
      
      this.dataService.searchFrndListByName(userValue)
        .subscribe(
              data => {
                  this.loading = false;
                  if(data.Ack==1){
                      this.userSearchFrndList=data.FriendListById;
                  }
                  //console.log(data);
                  //this.postform.reset();
        },
        error => {
          alert(error);
        });
  }
}
