import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../user.service";

@Component({
  selector: 'app-activationlink',
  templateUrl: './activationlink.component.html',
  styleUrls: ['./activationlink.component.css']
})
export class ActivationlinkComponent implements OnInit {
  public isLoggedIn: any;
  public userPIdEncode='';

  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.isLoggedIn=localStorage.getItem("isLoggedIn");
    if(this.isLoggedIn == 1){
        this.router.navigateByUrl('/user/edit_profile/activity');
    }
    
    this.activatedRoute.params.subscribe((params: Params) => {
        this.userPIdEncode = params['uid'];
        if(this.userPIdEncode == ''){
            this.router.navigateByUrl('/');
        }
    });
  }

  ngOnInit() {
    this.accountActivate();
  }

  public accountActivate() {
    if (this.userPIdEncode!='') {
      let signupJsonData={
        "id": this.userPIdEncode
      };
      this.dataService.userActivationLink(signupJsonData).subscribe(data => {
          /*setTimeout(() => {
            this.router.navigateByUrl('/user/signup');
          }, 5000);*/
            return false;
        },
        error => {
        }); 
      }
    }
}
