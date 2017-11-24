import { Component, ElementRef } from '@angular/core';
import { NgZone } from "@angular/core";
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup} from '@angular/forms';
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
  public currentUserDet: Object = { };
  public userNotiCnt: number = 0;
  public searchResultStr:string ='';
  public form:FormGroup;
  
  constructor(
    private el: ElementRef, 
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService,
    private builder:FormBuilder
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

    this.form = builder.group({
      skeyword: ['', [
        
      ]]
    });
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

    if(this.userloggedIn=='1'){
        this.userNotiCountList();
    }
  }

  public userNotiCountList(){
    let loginUserId=localStorage.getItem("loginUserId");
    if(loginUserId!=''){
      const dataUserDet = {
        "user_id": parseInt(loginUserId)
      };
      this._service.getUserNotiData(dataUserDet).subscribe(data=>{
        //console.log(data);
          if (data.Ack=="1") {
            this.userNotiCnt = data.Notificationcount; 
          }
        },error => {
          console.log('Something went wrong!');
        });
    }
  }
    
  public searchResult(values) {
    //console.log(values);
    this.searchResultStr = values; 
  }
  
  public searchDataResult() {
    //console.log(values);
    this.router.navigateByUrl('/home/search/'+this.searchResultStr);
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
