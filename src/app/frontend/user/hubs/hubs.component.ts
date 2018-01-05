import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { HubService } from "../../../components/hub-create/hub.service";
import { UserService } from "../user.service";

@Component({
  selector: 'app-hubs',
  templateUrl: './hubs.component.html',
  styleUrls: ['./hubs.component.css']
})
export class HubsComponent implements OnInit {
  public isloginUser =1;
  public loginUserId: any;
  public hubSlug = '';
  public hubDetails = {id:''};
  public groupPostDetData: object = {};
  public groupPostList = {};
  public activeTab = 'posts';
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private hubService: HubService) { 
      this.activatedRoute.params.subscribe((params: Params) => {
        this.hubSlug = params['slug'];
        if (this.hubSlug == '') {
          this.router.navigateByUrl('/');
        }
      });

      this.loginUserId = localStorage.getItem("loginUserId");
  }

  ngOnInit() {
    this.getHubDetails();
  }

  public getHubDetails()
  {
    this.hubService.getHubDetails(this.hubSlug).subscribe(data => {
      if(data.Ack == 1)
      {
        this.hubDetails = data.details;
        this.groupPostDetData = { activitytype: '4', activityid: this.hubDetails.id };
        this.getUserPostDetails();
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

  public attendHub()
  {
    const attendData = { hub_id: this.hubDetails.id, user_id: this.loginUserId};
    this.hubService.attendHub(attendData).subscribe(data => {
      if (data.Ack == 1) {
        //this.hubDetails = data.details;
      }
    },
      error => {
        console.log('Something went wrong!');
      });
  }

}
