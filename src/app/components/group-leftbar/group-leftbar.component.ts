import { Component, OnInit, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { UserService } from "../../frontend/user/user.service";

@Component({
  selector: 'app-group-leftbar',
  templateUrl: './group-leftbar.component.html',
  styleUrls: ['./group-leftbar.component.css']
})
export class GroupLeftbarComponent implements OnInit {

  /*public commentform: FormGroup;
  public IsloginUserId: any;
  public isLoggedIn: any;
  public postCmtId: any;
  //public postCmtDiv:boolean = false;
  public postCmtDiv: any = {};
  public postCmtLike: any = {};
  public postCmtHtml: string = '';
  public userPrfImgStr: string = '';
  public userNameStr: string = '';
  public getCurrentUser: any;
  public currentDate: Date = new Date();*/
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
    private builder: FormBuilder,
    private dataService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isUserLogin = localStorage.getItem("isLoggedIn");
   }

  ngOnInit() {
    //console.log(this.groupData);
  }

  public userLogout() {
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("loginUserId");
    //this.router.navigate(['/']);
    this.router.navigateByUrl('/');
    //return false;
  }
}
