import { Component, ElementRef } from '@angular/core';
import { NgZone } from "@angular/core";
import { FrontendService } from "../frontend-app-header/frontend.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'user-sidebar',
  templateUrl: './user-sidebar.component.html'
})
export class UserSidebar{
  public userloggedIn: string = '';
  public currentUserDet: Object = {};
  public currentUserLoginDet: Object = {};
  constructor(
    private el: ElementRef, 
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService
  ) { 
    
    this.userloggedIn = localStorage.getItem("isLoggedIn");
    let getUserDet = localStorage.getItem("currentUser");
    this.currentUserDet = JSON.parse(getUserDet);
    //console.log(this.currentUserDet);
  }

  //wait for the component to render completely
  ngOnInit(): void {
    //console.log(currentUserDet);
    //localStorage.removeItem("isLoggedIn");
    var nativeElement: HTMLElement = this.el.nativeElement,
    parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    this.getUserDetails();
  }

  public getUserDetails(){
    let loginUserId=localStorage.getItem("loginUserId");
    if(loginUserId!=''){
        let dataUserDet ={
          "id": loginUserId
        };
        this._service.getUserDetById(dataUserDet)
        .subscribe(data => {
              let details=data;
              if (details.Ack=="1") {
                this.currentUserLoginDet = details.UserDetails[0];
                //console.log(this.currentUserLoginDet);
              }else{
                
              }
          },
          error => {
            
          }
        ); 
      }else{
      }

    }

  public userLogout(){
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
