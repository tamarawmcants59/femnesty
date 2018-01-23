import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HubService } from "../../../components/hub-create/hub.service";
import { UserService } from "../user.service";
import { AgmCoreModule } from '@agm/core';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { SelectModule } from "../../../../../node_modules/ng2-select";
// import { ShareButtons } from "@ngx-share/core";
import { environment } from '../../../../environments/environment';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {
  public isloginUser =1;
  public postform: FormGroup;
  public loginUserId: any;
  public hubSlug = '';
  public hubDetails = {id:''};
  public groupPostDetData: object = {};
  public groupPostList = {};
  public uninvitedUsers = [];
  public activeTab = 'posts';
  public successMsg = '';
  public items = [];
  public friends = [];
  public repoUrl = '';
  public latestArticles = [];
  public startDateString;
  public endDateString;
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hubService: HubService,
    private builder: FormBuilder,
    private modalService: NgbModal
    ) {
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
    this.getHubDetails();
    this.getLastFourArticle();
  }
  public acceptHubRequest() {

    this.hubService.acceptHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public rejectHubRequest() {

    this.hubService.rejectHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }
  public getHubDetails()
  {
    this.hubService.getHubDetails(this.hubSlug, this.loginUserId).subscribe(data => {
      if(data.Ack == 1){
        localStorage.setItem("groupAdmin",data.details.user_id);
        if(data.details.type=="R" && data.details.recurring_start)
        {
          let day=new Date(data.details.recurring_start).getDay();
          let result='';
          switch (day) {
            case 0: {
              result = 'Sunday';
              break;
            }
            case 1: {
              result = 'Monday';
              break;
            }
            case 2: {
              result = 'Tuesday';
              break;
            }
            case 3: {
              result = 'Wednesday';
              break;
            }
            case 4: {
              result = 'Thursday';
              break;
            }
            case 5: {
              result = 'Friday';
              break;
            }
            case 6: {
              result = 'Saturday';
              break;
            }
            default: {
              result = 'Sunday';
              break;
            }
          }
          data.details.day=result;
        }
        this.hubDetails = data.details;
        this.startDateString = new Date(data.details.start_date).toISOString().replace(/[-:.]/g, "").replace('000Z',"Z");
        this.endDateString = new Date(data.details.end_date).toISOString().replace(/[-:.]/g, "").replace('000Z', "Z");
        
        this.groupPostDetData = { activitytype: '4', activityid: this.hubDetails.id };
         
        this.getUserPostDetails();
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }


  public getUserPostDetails() {
    if (this.hubDetails.id != '') {
      const dataUserDet = {
        "page_no": 1,
        "group_id": this.hubDetails.id,
        "type": '4'
      };
      this.dataService.getGroupPostById(dataUserDet)
        .subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupPostList = data.AllPost;
          }
        },
        error => {

        });
    }
  }

  public attendHub(hubDetails)
  {
    // const attendData = { hub_id: this.hubDetails.id, user_id: this.loginUserId};
    // this.hubService.attendHub(attendData).subscribe(data => {
    //   this.getHubDetails();
    // },
    //   error => {
    //     console.log('Something went wrong!');
    //   });
    this.hubService.rejectHubRequest({ hub_id: this.hubDetails.id, user_id: this.loginUserId }).subscribe(data => {
      console.log(data);
      this.getHubDetails();
    }, error => {
      console.log('Something went wrong!');
    });
  }

  public deleteInvites(user_id) {
    const attendData = { hub_id: this.hubDetails.id, user_id: user_id };
    this.hubService.attendHub(attendData).subscribe(data => {
      this.getHubDetails();
    },
      error => {
        console.log('Something went wrong!');
      });
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

  public getUnivitedUsers(){
    const attendData = { hub_id: this.hubDetails.id, user_id: this.loginUserId };
    this.hubService.uninvitedUsers(attendData).subscribe(data => {
      if (data.Ack == 1) {
        console.log('uninvited',data.details);
        this.uninvitedUsers = data.details;
        this.uninvitedUsers.forEach((color: { first_name: string,id: string }) => {
          console.log(color);
          this.items.push({
            id: color.id,
            text: color.first_name 
          });
        });
        console.log('items',this.items);
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public sendInvites(){
    const userValue = this.postform.value;
    userValue.hub_id = this.hubDetails.id;
    console.log(userValue);
    this.hubService.sendInvites(userValue).subscribe(data => {
      if (data.Ack == 1) {
        this.successMsg = 'Request Sent Successfully';
        this.postform.reset();
        this.getUnivitedUsers();
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

  public openBetaInfo(content) {
    this.modalService.open(content);
  }
}
export declare class FacebookParams {
  u: string;
}

export class GooglePlusParams {
  url: string
}

export class LinkedinParams {
  url: string
}

export declare class PinterestParams {
  url: string;
  media: string;
  description: string;
}

export class TwitterParams {
  text: string;
  url: string;
  hashtags: string;
  via: string;
}
