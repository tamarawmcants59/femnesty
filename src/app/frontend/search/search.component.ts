import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FrontendService } from "../../components/frontend-app-header/frontend.service"
import { UserService } from "../user/user.service";
import { HubService } from "../../components/hub-create/hub.service";
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public isloginUser: any;
  public isloginUserId: any;
  public searchData = [];
  public searchKeyword: string = '';

  constructor(
    private dataService: FrontendService,
    private userService: UserService,
    private hubService: HubService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isloginUser = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.searchKeyword = params['keyword'];
      this.getSearchResult();
    });
    //console.log(this.searchKeyword);
    // this.getSearchResult();
  }

  public getSearchResult() {
    const dataUserDet = {
      "keyword": this.searchKeyword,
      "user_id": this.isloginUserId
    };
    this.dataService.getUserSearchdata(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.searchData = data.TotalSearch;
        //console.log(this.searchData);
      }
    },
      error => {

      });
  }

  public joinGroupRequest(join_grpid) {
    if (join_grpid != '') {
        const dataUserDet = {
          "group_id": join_grpid,
          "user_id": this.isloginUserId
        };
        this.userService.joinGroupRequestByUser(dataUserDet).subscribe(data => {
          //location.reload();
          this.getSearchResult();
        },
        error => {

        });
    }
  }

  public attendHubDetails(hubId) {
    const attendData = { hub_id: hubId, user_id: this.isloginUserId };
    this.hubService.attendHub(attendData).subscribe(data => {
      this.getSearchResult();
    },
      error => {
        console.log('Something went wrong!');
      });
  }
}
