import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { UserService } from "../../user/user.service";

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
  private topListPageSize =5;
  private myListPageSize =5;
  private totalMyGrpList: any = [];
  private totalListOfMyGroups: any = [];
  public latestArticles = [];
  search_group: string;
  public errorMsg: string;
  public filteredTitle: any;
  public aboutActiveTab: string = 'find';
  private categoryListWithCount: any = [];
  @ViewChild("topGroupsList") topGroupsList: ElementRef;
  @ViewChild("myGroupsList") myGroupsList: ElementRef;
  constructor(private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }
  ngOnInit() {

    this.router.events.subscribe(event => {
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
    });
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
          self.topListPageSize=5;
          self.myListPageSize=5;
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
    this.errorMsg = '';
    this.myGrpList = [];
    if (!this.topGroupsList) {
      this.router.navigateByUrl('/group/find');
      const self = this;
      setTimeout(function () {
        self.topGroupsList.nativeElement.scrollIntoView();
      }, 200);

    }
    else {
      this.topGroupsList.nativeElement.scrollIntoView();
    }

  }
  scrollToMyGroup() {
    this.errorMsg = '';
    this.myGrpList = [];
    if (!this.myGroupsList) {
      this.router.navigateByUrl('/group/find');
      const self = this;
      setTimeout(function () {
        self.myGroupsList.nativeElement.scrollIntoView();
      }, 200);
    }
    else {
      this.myGroupsList.nativeElement.scrollIntoView();
    }

  }
  private getCatDetails(id, title) {
    //this.aboutActiveTab='find';
    this.filteredTitle = title.toUpperCase();
    let data = { "category_id": id }
    this.dataService.getGroupListByCategoryId(data).subscribe(data => {
      if (data.Ack == "1") {
        this.myGrpList = data.ActiveGroupList
        this.errorMsg = "";
      }
      else if (data.Ack == "0") {
        this.myGrpList = [];
        this.errorMsg = 'No record found.';
      }

    }, error => {
      console.log("Error");
    });
    this.router.navigateByUrl('/group/find');
  }

  public getAllGroupList() {
    this.dataService.getAllGrpList().subscribe(data => {
      if (data.Ack == "1") {
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
    this.topListPageSize=this.topListPageSize+5;
    this.groupList=[];
    if(this.totalGroupList.length>this.topListPageSize)
    {
      this.IsShowTopViewMore=true;
    }
    else
    {
      this.IsShowTopViewMore=false;
    }
    for(let i=0;i<this.topListPageSize;i++)
    {
      if(this.totalGroupList[i])
      {
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

      });
    }
  }
  viewMoreMy() {
    // this.IsShowMyViewMore = false;
    // this.totalMyGrpList = [];
    // this.totalMyGrpList = this.totalListOfMyGroups;
    this.myListPageSize=this.myListPageSize+5;
    this.totalMyGrpList=[];
    if(this.totalListOfMyGroups.length>this.myListPageSize)
    {
      this.IsShowMyViewMore=true;
    }
    else
    {
      this.IsShowMyViewMore=false;
    }
    for(let i=0;i<this.myListPageSize;i++)
    {
      if(this.totalListOfMyGroups[i])
      {
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
      this.myGrpList = myGrplistData;

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
}
