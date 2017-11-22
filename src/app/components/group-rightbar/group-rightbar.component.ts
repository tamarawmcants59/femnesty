import { Component, OnInit, Input } from '@angular/core';
import { UserService } from "../../frontend/user/user.service";
//import 'rxjs/add/operator/map';

@Component({
  selector: 'app-group-rightbar',
  templateUrl: './group-rightbar.component.html',
  styleUrls: ['./group-rightbar.component.css']
})
export class GroupRightbarComponent implements OnInit {

  public isloginUserId: string = '';
  public isUserLogin: string = '';

  @Input() groupData: {
    id: number;
    user_id: number;
    slug: string;
    group_uname: string;
    group_name: string;
    short_desc: string;
    long_desc: string;
    status: string;
    first_name: string;
    last_name: string;
    name: string;
    profile_image: string;
    display_name: string;
    group_image: string;
    member_count: number;
    cdate: string;
  };

  constructor(
    private dataService: UserService
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    if(this.groupData.id){
        console.log(this.groupData);
    }
  }
  
}
