import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HubService } from "../../../components/hub-create/hub.service";
import { UserService } from "../user.service";
import { AgmCoreModule } from '@agm/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectModule } from "../../../../../node_modules/ng2-select";
// import { ShareButtons } from "@ngx-share/core";
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

//import { FrontendService } from "../frontend-app-header/frontend.service";
import { AngularFirestore } from 'angularfire2/firestore';
//import { AngularFireDatabase } from 'angularfire2/database';
import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase';
import { forEach } from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-myconnection',
  templateUrl: './myconnection.component.html',
  styleUrls: ['./myconnection.component.css']
})
export class MyconnectionComponent implements OnInit {
  public isloginUser = 1;
  public postform: FormGroup;
  public loginUserId: any;
  public hubSlug = '';
  public hubDetails = { id: '' };
  public groupPostDetData: object = {};
  public groupPostList = {};
  public uninvitedUsers = [];
  public loading = false;
  public address: any;
  public lat: 0;
  public lng: 0;
  public IsShowAddress = true;
  public title: any;
  public activeTab = 'posts';
  IsGroupAdmin = false;
  public successMsg = '';
  public items = [];
  public email: any;
  public phone: any;
  public website: any;
  public organizer: any;
  public friends = [];
  public repoUrl = '';
  public latestArticles = [];
  public startDateString;
  public endDateString;
  public description: any;
  public userFrndList = [];
  public previousUrl:string;
  public userRequestFrndList =[];
  public IsShowMyViewMore = false;
  public IsShowMyViewMoreOn = false;
 public totalMyConList :any;
 public totalMyOnlineConList :any;
public search_group = '';
 private myListPageSize =5;
 private myListOnPageSize =5;
public errorMsg:any;
public  userRequArr=[];

public currentFireUserId: string;
public onlineUserList1 = [];
public firebasOnlineUserList: any;



  prfImageData: any;
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hubService: HubService,
    private builder: FormBuilder,
    private modalService: NgbModal,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth
  ) {

    this.afAuth.authState.do(user => {
      if (user) {
        this.currentFireUserId = user.uid;
      }
    }).subscribe();
    this.postform = builder.group({
      user_ids: ['', [
        Validators.required
      ]]
    });
    this.activatedRoute.params.subscribe((params: Params) => {
      this.hubSlug = params['slug'];
      if (this.hubSlug == '') {
        this.router.navigateByUrl('/');
      }
    });

    this.loginUserId = localStorage.getItem("loginUserId");
    this.repoUrl = environment.website_url + this.router.url;
  }

  ngOnInit() {
    
    this.getConnectionList();
    this.getPendingFrndList();
    this.getLastFourArticle();
    this.getConnectionOnlineList();
  }
  public getLastFourArticle() {
    this.dataService.getFourArticleList().subscribe(data => {
      let details = data;
      if (details.Ack == "1") {
        this.latestArticles = details.LastArticleList;
      }
    },
      error => {
      }
    );
  }
  public getConnectionList() {
    const loginUserId = localStorage.getItem("loginUserId");
    
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserFrndListById(dataUserDet).subscribe(data => {
          const details = data;
          
          if (details.Ack == "1") {
            this.userFrndList = details.FriendListById;
           //console.log(this.userFrndList)
            if (this.userFrndList.length > 5) {
              this.IsShowMyViewMore = true;
              this.totalMyConList = [];
              for (let i = 0; i < this.userFrndList.length; i++) {
                if (this.totalMyConList.length < 5) {
                  this.totalMyConList.push(this.userFrndList[i]);
                }
              }
  
            }
            else {
              this.IsShowMyViewMore = false;
              this.totalMyConList = this.userFrndList;
            }

            //console.log(this.userFrndList)
          } else {

          }
        },
        error => {

        });
    } else {
    }
  }


  viewMoreConnection() {
    // this.IsShowMyViewMore = false;
    // this.totalMyGrpList = [];
    // this.totalMyGrpList = this.totalListOfMyGroups;
    this.myListPageSize=this.myListPageSize+5;
    this.totalMyConList=[];
    if(this.userFrndList.length>this.myListPageSize)
    {
      this.IsShowMyViewMore=true;
    }
    else
    {
      this.IsShowMyViewMore=false;
    }
    for(let i=0;i<this.myListPageSize;i++)
    {
      if(this.userFrndList[i])
      {
        this.totalMyConList.push(this.userFrndList[i]);
      }
      
    }
  }
public acceptFriendRequest(request_id) {
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
                    this.getPendingFrndList();
                    window.location.reload();
                  }else{
                    this.errorMsg='You have already send the friend request';
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
            this.getPendingFrndList();
            window.location.reload();
          }else{
            this.errorMsg='You have already send the friend request';
          }
        },
        error => {
          alert(error);
        });
  }
  public searchConnection() { 
    if (this.search_group != '') {

      this.search_group = this.search_group.toLowerCase();
      let goodFriends = this.userFrndList.filter(item => {
        if (item.first_name
          .toLowerCase().search(this.search_group) !== -1) {
          return item;
        }
      });
      // this.groupList = goodFriends;
      let myGrplistData = this.userFrndList.filter(item1 => {
        if (item1.first_name
          .toLowerCase().search(this.search_group) !== -1) {

          return item1;
        }
      });
      this.totalMyConList = myGrplistData;

      if (this.totalMyConList.length > 0) {
        this.errorMsg = '';
      }
      else
        this.errorMsg = 'No record found.';
    } else {
      //this.getAllGroupList();
      //this.getUserGroupList();
    }
   // this.router.navigateByUrl('/group/find');
  }

  public getConnectionOnlineList() { 
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      let onlineUsersRef = firebase.database().ref('presence/');
      const dataUserDet = {
        "user_id": loginUserId
      };
      this.dataService.getUserFrndListById(dataUserDet).subscribe(data => {
        const details = data;
        //alert(JSON.stringify(details))
        if (details.Ack == "1") {
          this.userFrndList = details.FriendListById;

          onlineUsersRef.on('value', (snapshot)=> {
            for (let key in snapshot.val()) {
                if (snapshot.val()[key].online && snapshot.val()[key].userid!=loginUserId) {
                  let onlineUserDet = details.FriendListById.filter(item => item.friend_id == snapshot.val()[key].userid);
                  let checkOnlineUserlist = this.onlineUserList1.filter(item => item.friend_id == snapshot.val()[key].userid);
                  if(onlineUserDet.length>0 && checkOnlineUserlist.length==0){
                    //console.log(onlineUserDet[0]);
                    this.onlineUserList1.push(onlineUserDet[0]);
                  }
                }
            }
          });

          if (this.onlineUserList1.length > 5) {
            this.IsShowMyViewMoreOn = true;
            this.totalMyOnlineConList = [];
            for (let i = 0; i < this.onlineUserList1.length; i++) {
              if (this.totalMyOnlineConList.length < 5) {
                this.totalMyOnlineConList.push(this.onlineUserList1[i]);
              }
            }

          }else {
            this.IsShowMyViewMoreOn = false;
            this.totalMyOnlineConList = this.onlineUserList1;
          }

        } else {
        }

      },
        error => {
        });
    } else {
    }
    //console.log(this.onlineUserList);
  }


  viewMoreOnConnection() {
    // this.IsShowMyViewMore = false;
    // this.totalMyGrpList = [];
    // this.totalMyGrpList = this.totalListOfMyGroups;
    this.myListOnPageSize=this.myListOnPageSize+5;
    this.totalMyOnlineConList=[];
    if(this.onlineUserList1.length>this.myListOnPageSize)
    {
      this.IsShowMyViewMoreOn=true;
    }
    else
    {
      this.IsShowMyViewMoreOn=false;
    }
    for(let i=0;i<this.myListOnPageSize;i++)
    {
      if(this.onlineUserList1[i])
      {
        this.totalMyOnlineConList.push(this.onlineUserList1[i]);
      }
      
    }
  }



  public getPendingFrndList(){
    const loginUserId = localStorage.getItem("loginUserId");
    //this.userRequArr=[];
    let viewNotiIdStr='';
    if(loginUserId!=''){
        let dataUserDet ={
          "user_id": loginUserId
        };
        this.dataService.getRequestFrndListById(dataUserDet)
        .subscribe(data => {
              let details=data;
              if (details.Ack=="1") {
                  this.userRequestFrndList = details.PendingFriendListById;
                  /*this.userRequestFrndList.forEach(element => {
                      if(element.id!=''){
                        //this.userRequArr.push(element.id);
                        viewNotiIdStr+=element.id+',';
                      }
                  });
                  if(viewNotiIdStr!=''){
                    this.dataService.updateViewNotiById({'ids':viewNotiIdStr}).subscribe(data => {
                      },
                      error => {
                      }); 
                  }*/
              }
          },
          error => {
          }); 
      }else{
      }
  }

 

}
