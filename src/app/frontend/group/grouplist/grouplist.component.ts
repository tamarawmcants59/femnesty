import { Component, OnInit } from '@angular/core';
import { UserService } from "../../user/user.service";

@Component({
  selector: 'app-grouplist',
  templateUrl: './grouplist.component.html',
  styleUrls: ['./grouplist.component.css']
})
export class GrouplistComponent implements OnInit {
  public isloginUserId:any;
  public isUserLogin:any;
  public groupList = [];
  constructor(private dataService: UserService) { 
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.getAllGroupList();
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
}
