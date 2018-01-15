import { Component, OnInit } from '@angular/core';
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
  public myGrpList = [];
  public latestArticles = [];
  search_group: string;
  private errorMsg:string;
  private categoryListWithCount: any = [];
  constructor(private dataService: UserService) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
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


  private getCatDetails(id) {
    let data={"category_id":id}
    this.dataService.getGroupListByCategoryId(data).subscribe(data => {
    if(data.Ack=="1")
    {
      this.myGrpList=data.ActiveGroupList
      this.errorMsg="";
    }
    else if(data.Ack=="0")
    {
      this.myGrpList=[];
      this.errorMsg='No record found.';
    }
    }, error => {
      console.log("Error");
    });
  }

  public getAllGroupList() {
    this.dataService.getAllGrpList().subscribe(data => {
      if (data.Ack == "1") {
        this.groupList = data.ActiveGroupList;
      }
    },
      error => {

      });
  }

  public getUserGroupList() {
    if (this.isloginUserId != '') {
      const dataUserDet = {
        "user_id": this.isloginUserId
      };
      this.dataService.getUseAllGroupListById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
          this.myGrpList = data.GroupListByuserID;
          //console.log(this.groupMemberList);
        }
      }, error => {

      });
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
    console.log(this.search_group);
    if (this.search_group != '') {
      //this.getConnectionList();
      let goodFriends = this.groupList.filter(item => {
        if (item.group_name.search(this.search_group) !== -1) {
          return item;
        }
      });
      this.groupList = goodFriends;
      let myGrplistData = this.myGrpList.filter(item1 => {
        if (item1.group_name.search(this.search_group) !== -1) {
          return item1;
        }
      });
      this.myGrpList = myGrplistData;
    } else {
      this.getAllGroupList();
      this.getUserGroupList();
    }
  }
}
