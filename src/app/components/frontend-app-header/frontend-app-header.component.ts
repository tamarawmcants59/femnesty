import { Component, ElementRef } from '@angular/core';
import { NgZone } from "@angular/core";
import { FrontendService } from "./frontend.service";
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'frontend-app-header',
  templateUrl: './frontend-app-header.component.html'
})
export class FrontendAppHeader {
  pageConData=[];
  HeaderNavCls: string ='';
  lastScrollTop: number = 200;
  public userloggedIn: string = '';
  public currentUserDet: Object = {};
  constructor(
    private el: ElementRef, 
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService
  ) { 
    window.onscroll = () => {
        let st = window.pageYOffset;
        let dir = '';
        if (st > this.lastScrollTop) {
            dir = "navbar-white";
        } else {
            dir = "navbar-white";
        }
        //this.lastScrollTop = st;
        lc.run(() => {
            this.HeaderNavCls = dir;
        });

    };  

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

    this._service.getAllPageData().subscribe(data=>{
        let details=data;
        if (details.Ack=="1") {
          let SuccessPageData=details.ContentAllBySlug;
          SuccessPageData=SuccessPageData.filter(item => item.id == 1);
          this.pageConData = SuccessPageData[0]; 
          //console.log( this.pageConData);
            //this.pageConData = details.ContentAllBySlug;
            return false;
        }else{
            return false;
        }
        
      },
      error => {
        console.log('Something went wrong!');
      }
    );

    
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
