import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})
export class GroupComponent implements OnInit {
  public groupNameByUrl: string='';
  public isloginUserId:any;
  public isUserLogin:any;
  public isGroupId:any;
  public groupDetailsData: object = {
    id : "",
    user_id: "",
    slug: "",
    group_uname: "",
    group_name: "",
    short_desc: "",
    image: "",
    long_desc: "",
    status: "",
    cdate: "",
    first_name: "",
    last_name: "",
    name: "",
    profile_image: "",
    display_name: "",
    group_image: "",
    member_count: ""
  };
  //public userPostList = [];
  //public userFrndList = [];
  public activeTab: string = 'activity';
  //public aboutActiveTab: string = 'overview';
  public successMsg: string ='';
  public errorMsg: string = '';
  
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.groupNameByUrl = params['gname'];
    });
    this.getGroupDetailsByName();
  }

  public getGroupDetailsByName() {
    if (this.groupNameByUrl != '') {
      const dataUserDet = {
        "group_slug": this.groupNameByUrl
      };
      this.dataService.getGrpDetBySlug(dataUserDet)
        .subscribe(data => {
         //console.log(data);
          if (data.Ack == "1") {
            this.groupDetailsData = data.GroupDetails[0];
            //console.log(this.otherProfileDet.id);
            this.isGroupId = data.GroupDetails[0].id;
            //this.getGroupPostDetails();
            //this.getGroupMemberList();
          }
        },
        error => {

        });
    }
  }

}
