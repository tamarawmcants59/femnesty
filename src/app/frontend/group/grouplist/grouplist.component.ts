import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../user/user.service";
import { window } from 'rxjs/operator/window';

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  public isloginUserId: any;
  public isUserLogin: any;
  public groupList = [];
  public IsShowTopViewMore = false;
  public IsShowMyViewMore = false;
  private totalGroupList: any = [];
  public myGrpList = [];
  private topListPageSize = 5;
  private myListPageSize = 5;
  private totalMyGrpList: any = [];
  private totalListOfMyGroups: any = [];
  public latestArticles = [];
  search_group: string;
  public errorMsg: string;
  public filteredTitle: any;
  IsShowNothingForMy = false;
  IsShowMyGrp = true;
  IsShowTopGrp = true;
  IsShowNothingForTop = false;
  public aboutActiveTab: string = 'find';
  private categoryListWithCount: any = [];
  @ViewChild("topGroupsList") topGroupsList: ElementRef;
  @ViewChild("myGroupsList") myGroupsList: ElementRef;
  public search_data = {cat_id: ''};

  constructor(private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }
  ngOnInit() {

    /*this.router.events.subscribe(event => {
      if (event.constructor.name === "ResolveStart") {
        const eventObj: any = event;
        const self = this;
        if (eventObj.state.url.includes('group/find')) {
          setTimeout(function () {
            var elements = document.getElementsByClassName('bottomList');
            if (elements.length > 0)
              elements[0].scrollIntoView();
          }, 100)

        }


      }
    });*/
    this.activatedRoute.params.subscribe((params: Params) => {
      this.aboutActiveTab = params['slug_name'];
      //console.log(this.bookSlugName);
    });
    this.getAllGroupList();
    this.getUserGroupList();
    this.getLastFourArticle();
    this.getcategoryListWithCount();
    const self = this;
    this.router.events.subscribe(event => {
      if (event.constructor.name === "ResolveStart") {
        const eventObj: any = event;

        if (eventObj.url.includes('/group/overview') || eventObj.url.includes('/group/find')) {
          self.errorMsg = '';
          self.myGrpList = [];
          self.topListPageSize = 5;
          self.myListPageSize = 5;
          self.getAllGroupList();
          self.getUserGroupList();
        }


      }
    });
  }
  loadGroupList() {
    this.getAllGroupList();
    this.getUserGroupList();
    this.getLastFourArticle();
    this.getcategoryListWithCount();
  }



  private getcategoryListWithCount() {
    this.dataService.getCategoryListWithCount().subscribe(data => {
      if (data.Ack == "1") {
        this.categoryListWithCount = data.ActiveGroupList;
      }
    },
      error => {
        console.log("Error");
      });
  }

  scrollToTopGroups() {
    this.search_data.cat_id = 'top_grp';
    this.errorMsg = '';
    this.myGrpList = [];
    if (!this.topGroupsList) {
      this.router.navigateByUrl('/group/find');
      // const self = this;
      // setTimeout(function () {
      //   self.topGroupsList.nativeElement.scrollIntoView();
      // }, 200);
      this.IsShowTopGrp = true;
      this.IsShowMyGrp = false;

    }
    else {
      this.IsShowTopGrp = true;
      this.IsShowMyGrp = false;
      //this.topGroupsList.nativeElement.scrollIntoView();
    }

  }
  scrollToMyGroup() {
    this.search_data.cat_id = 'my_grp';
    this.errorMsg = '';
    this.myGrpList = [];
    if (!this.myGroupsList) {
      this.router.navigateByUrl('/group/find');
      // const self = this;
      // setTimeout(function () {
      //   self.myGroupsList.nativeElement.scrollIntoView();
      // }, 200);
      this.IsShowTopGrp = false;
      this.IsShowMyGrp = true;
    }
    else {
      this.IsShowTopGrp = false;
      this.IsShowMyGrp = true;
     // this.myGroupsList.nativeElement.scrollIntoView();
    }

  }
  private getCatDetails(id, title) {
    this.search_data.cat_id = id;
    this.filteredTitle = title.toUpperCase();
    let data = {
      "category_id": id,
      "user_id": this.isloginUserId
    };
    this.dataService.getGroupListByCategoryId(data).subscribe(data => {
      if (data.Ack == "1") {
        this.IsShowTopGrp = false;
        this.IsShowMyGrp = false;
        this.myGrpList = data.ActiveGroupList
        this.errorMsg = "";
      }
      else if (data.Ack == "0") {
        this.IsShowTopGrp = false;
        this.IsShowMyGrp = false;
        this.myGrpList = [];
        this.errorMsg = 'No record found.';
      }
      //console.log(this.myGrpList);
    }, error => {
      console.log("Error");
    });
    this.router.navigateByUrl('/group/find');
  }

  public getAllGroupList() {
    const dataUserDet = {
      "user_id": this.isloginUserId
    };
    this.dataService.getAllGrpList(this.isloginUserId).subscribe(data => {
      if (data.Ack == "1") {
        //console.log(data.ActiveGroupList);
        if (data.ActiveGroupList.length > 5) {
          this.IsShowTopViewMore = true;
          this.groupList = [];
          for (let i = 0; i < data.ActiveGroupList.length; i++) {
            if (this.groupList.length < 5) {
              this.groupList.push(data.ActiveGroupList[i]);
            }
          }

        }
        else {
          this.IsShowTopViewMore = false;
          this.groupList = data.ActiveGroupList;
        }

        this.totalGroupList = data.ActiveGroupList;
      }
    },
      error => {
      });
  }

  viewMoreTop() {
    // this.IsShowTopViewMore = false;
    // this.groupList = [];
    // this.groupList = this.totalGroupList;
    this.topListPageSize = this.topListPageSize + 5;
    this.groupList = [];
    if (this.totalGroupList.length > this.topListPageSize) {
      this.IsShowTopViewMore = true;
      this.IsShowNothingForTop = false;
    }
    else {
      this.IsShowTopViewMore = false;
      this.IsShowNothingForTop = true;
    }
    for (let i = 0; i < this.topListPageSize; i++) {
      if (this.totalGroupList[i]) {
        this.groupList.push(this.totalGroupList[i]);
      }

    }
  }

  public getUserGroupList() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId
      };
      this.dataService.getUseAllGroupListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {

          //this.myGrpList = data.GroupListByuserID;
          this.totalListOfMyGroups = data.GroupListByuserID;
          if (data.GroupListByuserID.length > 5) {
            this.IsShowMyViewMore = true;
            this.totalMyGrpList = [];
            for (let i = 0; i < data.GroupListByuserID.length; i++) {
              if (this.totalMyGrpList.length < 5) {
                this.totalMyGrpList.push(data.GroupListByuserID[i]);
              }
            }

          }
          else {
            this.IsShowMyViewMore = false;
            this.totalMyGrpList = data.GroupListByuserID;
          }


          //console.log(this.groupMemberList);
        }
      }, error => {
        console.log(error);
      });
    }
  }
  viewMoreMy() {
    // this.IsShowMyViewMore = false;
    // this.totalMyGrpList = [];
    // this.totalMyGrpList = this.totalListOfMyGroups;
    this.myListPageSize = this.myListPageSize + 5;
    this.totalMyGrpList = [];
    if (this.totalListOfMyGroups.length > this.myListPageSize) {
      this.IsShowMyViewMore = true;
      this.IsShowNothingForMy = false;
    }
    else {
      this.IsShowMyViewMore = false;
      this.IsShowNothingForMy = true;
    }
    for (let i = 0; i < this.myListPageSize; i++) {
      if (this.totalListOfMyGroups[i]) {
        this.totalMyGrpList.push(this.totalListOfMyGroups[i]);
      }

    }
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

  public searchGroup() {
    this.filteredTitle = this.search_group.toUpperCase();
    if (this.search_group != '') {

      // //this.getConnectionList();
      // let goodFriends = this.groupList.filter(item => {
      //   if (item.group_name.search(this.search_group) !== -1) {
      //     return item;
      //   }
      // });
      // this.groupList = goodFriends;
      // let myGrplistData = this.myGrpList.filter(item1 => {
      //   if (item1.group_name.search(this.search_group) !== -1) {
      //     return item1;
      //   }
      // });
      // this.myGrpList = myGrplistData;
      //this.getConnectionList();
      this.search_group = this.search_group.toLowerCase();
      let goodFriends = this.totalGroupList.filter(item => {
        if (item.group_name.toLowerCase().search(this.search_group) !== -1) {
          return item;
        }
      });
      // this.groupList = goodFriends;
      let myGrplistData = this.totalMyGrpList.filter(item1 => {
        if (item1.group_name.toLowerCase().search(this.search_group) !== -1) {

          return item1;
        }
      });
      this.myGrpList = [];
      if (goodFriends) {
        if (goodFriends.length) {
          for (let i = 0; i < goodFriends.length; i++) {
            this.myGrpList.push(goodFriends[i]);
          }
        }

      }
      if (myGrplistData) {
        if (myGrplistData.length) {
          for (let i = 0; i < myGrplistData.length; i++) {
            this.myGrpList.push(myGrplistData[i]);
          }
        }

      }
      //this.myGrpList = myGrplistData;

      if (this.myGrpList.length > 0) {
        this.errorMsg = '';
      }
      else
        this.errorMsg = 'No record found.';
    } else {
      this.getAllGroupList();
      this.getUserGroupList();
    }
    this.router.navigateByUrl('/group/find');
  }

  public joinGroupRequest(join_grpid) {
    if (join_grpid != '') {
        const dataUserDet = {
          "group_id": join_grpid,
          "user_id": this.isloginUserId
        };
        this.dataService.joinGroupRequestByUser(dataUserDet).subscribe(data => {
          //console.log(data);
          //this.router.navigateByUrl('/group/find');
          location.reload();
        },
        error => {

        });
    }
  }

}
