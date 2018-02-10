import { ChatListnerService } from './../../service/chat.listner.service';
import { Component, ElementRef, ChangeDetectorRef } from '@angular/core';
import { NgZone } from "@angular/core";
import * as firebase from 'firebase';
import { FormControl, AbstractControl, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { FrontendService } from "./frontend.service";
// import { ArticleService } from "../../frontend/article/article.service";
import { Router, ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { AngularFireAuth } from 'angularfire2/auth';
import { UserService } from "../../frontend/user/user.service";
//import { ChangeDetectorRef } from '@angular/core/src/change_detection/change_detector_ref';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'frontend-app-header',
  templateUrl: './frontend-app-header.component.html'
})
export class FrontendAppHeader {
  pageConData = [];
  artCatData=[];
  public loginForm: FormGroup;
  HeaderNavCls: string = '';
  HeaderTopCls: string = '';
  lastScrollTop: number = 100;
  chatHeads: any[];
  successMsg: any;
  errorMsg: any;
  title: any;
  public submitted: boolean = false;
  loading = false;
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0) || 0;
  public userloggedIn: string = '';
  public currentUserDet: Object = {};
  public siteSettingsDet: Object = {};
  public userNotiCnt: number = 0;
  public searchResultStr: string = '';
  public form: FormGroup;
  public currentFireUserId: string = '';
  public getCurrentPageName: string = '';
  public show: boolean = false;
  public articleArr = [];
  public email: any;
  public password: any;
  constructor(
    private el: ElementRef,
    lc: NgZone,
    private route: ActivatedRoute,
    private router: Router,
    private _service: FrontendService,
    //private artService: ArticleService,
    private builder: FormBuilder,
    private _chatListnerService: ChatListnerService,
    private db: AngularFirestore,
    private afAuth: AngularFireAuth,
    private cd: ChangeDetectorRef,
    private loginService: UserService,
    private modalService: NgbModal
  ) {
    // this.loginForm = builder.group({
    //   'email': ['', Validators.compose([Validators.required, Validators.email])],
    //   'password': ['', Validators.compose([Validators.required, Validators.minLength(3)])]
    // });
    // this.email = this.loginForm.controls['email'];
    // this.password = this.loginForm.controls['password'];
    this.afAuth.authState.do(user => {
      if (user) {
        this.currentFireUserId = user.uid;
      }
    }).subscribe();
    //console.log(this.router.url);
    this.getCurrentPageName = this.router.url;
    //let returnUrl = this.route.snapshot.queryParams['returnUrl'];
    /*this.route.params.subscribe((params: Params) => {

        //this.getCurrentPageName = params['slug'];
    });*/

    if (this.getCurrentPageName == '/home') {
      window.onscroll = () => {
        let st = window.pageYOffset;
        let dir = '';
        if (st > this.lastScrollTop) {
          dir = "navbar-white";
        } else {
          dir = "navbar-trans";
        }
        //this.lastScrollTop = st;
        lc.run(() => {
          this.HeaderNavCls = dir;
          this.HeaderTopCls = dir;
        });

      };
    } else {
      this.HeaderNavCls = 'navbar-white';
      window.onscroll = () => {
        let st = window.pageYOffset;
        let dir = '';
        if (st > this.lastScrollTop) {
          dir = "navbar-white";
        } else {
          dir = "navbar-trans";
        }
        //this.lastScrollTop = st;
        lc.run(() => {
          this.HeaderTopCls = dir;
        });

      };
    }

    this.userloggedIn = localStorage.getItem("isLoggedIn");
    let getUserDet = localStorage.getItem("currentUser");
    //this.currentUserDet = JSON.parse(getUserDet);

    this.form = builder.group({
      skeyword: ['', [

      ]]
    });
  }

  //wait for the component to render completely
  ngOnInit(): void {
    //console.log(this.currentUserDet);
    //localStorage.removeItem("isLoggedIn");
    this.getFemnestyEvent();
    if (this.userloggedIn == '1') {
      let self = this;
      setInterval(function () {
        self.userNotiCountList();
      }, 5000)
    }

    var nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);

    this._service.getAllPageData().subscribe(data => {
      let details = data;
      if (details.Ack == "1") {
        let SuccessPageData = details.ContentAllBySlug;
        SuccessPageData = SuccessPageData.filter(item => item.id == 1);
        this.pageConData = SuccessPageData[0];
        //console.log( this.pageConData);
        //this.pageConData = details.ContentAllBySlug;
        return false;
      } else {
        return false;
      }

    },
      error => {
        console.log('Something went wrong!');
      }
    );

    this._service.getSiteSettings().subscribe(data => {
      if (data.Ack == "1") {
        this.siteSettingsDet = data.SiteSettings[0];
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );

    /*if (this.userloggedIn == '1') {
      this.userNotiCountList();
    }*/
    
    this.getUserDetails();
    this.getArticleList();
    this.getUnreadMessages();
  }

  ngOnChanges(): void {
    this.show = false;
  }

  public getFemnestyEvent(){
    this._service.getArticalListData().subscribe(data=>{
        let details=data;
        //console.log(details.EventList[0]);
        if (details.Ack=="1") {
            //this.artDetData = details.BooksAll[0].image_url;
            this.artCatData = details.EventList[0];
        }
      },
      error => {
        console.log('Something went wrong!');
      });
  }

  checkLogin(messageModal) {
    if (this.email && this.password) {
      if (this.validateEmail(this.email)) {
        this.submitted = true;
        this.loading = true;
        const values = { email: this.email, password: this.password };
        this.loginService.userLogin(values)
          .subscribe(data => {
            const details = data;
            if (details.Ack === 1) {
              localStorage.setItem('currentUser', JSON.stringify(details.UserDetails));
              localStorage.setItem('isLoggedIn', '1');
              localStorage.setItem('loginUserId', details.UserDetails.id);
              localStorage.setItem('userName', details.UserDetails.first_name);
              localStorage.setItem('profile_image', details.UserDetails.image_url);
              if (details.UserDetails.user_type == 'CA' || details.UserDetails.user_type == 'CSA') {
                this.router.navigateByUrl('/company/profile');
              } else {
                this.router.navigateByUrl('/social_home');
              }
              this.loading = false;
            } else {
              this.title = "Error!!!";
              this.errorMsg = data.msg;
              this.loading = false;
              this.modalService.open(messageModal);
            }
          },
          error => {
            this.loading = false;
          }
          );
      }
      else {
        this.title = "Error!!!";
        this.errorMsg = "Please give valid email.";
        this.modalService.open(messageModal);
      }


    }
    else {
      this.title = "Error!!!";
      this.errorMsg = "Please give email and password to login";
      this.modalService.open(messageModal);
    }



  }
  getUnreadMessages() {
    var newArray=[];
    const messages = this.db.collection('Messages', ref => {
      return ref.where('to_user_id', '==', this.loginUserId);
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        var isFound=false;
        var index;
        if(newArray.length>0)
        {
          for(var i=0;i<newArray.length;i++)
          {
            if(newArray[i].from_user_id==data.from_user_id)
            {
              isFound=true;
              index=i;
              break;
            }
          }
          if(isFound)
          {
             if(index)
             {
               newArray[index].message.text=data.message.text;
             }
             else if(index==0)
             {
              newArray[index].message.text=data.message.text;
             }
             
          }
          else
          {
            newArray.push(data);
          }
        }
        else
        {
          newArray.push(data);
        }
        
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    messages.subscribe(data => {
      if(newArray && newArray.length)
      {
        this.chatHeads=newArray;
      }
      else
      this.chatHeads = data;
      this.fillUserDetails();
    });
  }

  fillUserDetails() {
    this.chatHeads.map(ch => {
      this._service.getUserDetById({ id: ch.from_user_id }).subscribe(res => {
        ch['userDetails'] = res.UserDetails[0];
      });
    });
  }

  public openChat(chat) {
    this._chatListnerService.onChatHeadClick(chat);
  }

  public getArticleList() {
    this._service.getArticleData().subscribe(data => {
      let details = data;
      //console.log(details);
      if (details.Ack == "1") {
        this.articleArr = details.ArticleCatList;
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }
  public userNotiCountList() {
    let loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "user_id": parseInt(loginUserId)
      };
      this._service.getUserNotiData(dataUserDet).subscribe(data => {
        if (data.Ack == "1") {
          this.userNotiCnt = data.Notificationcount;
        } else {
          this.userNotiCnt = 0;
        }
      }, error => {
        console.log('Something went wrong!');
      });
    }
  }

  public searchResult(values) {
    //console.log(values);
    this.searchResultStr = values;
  }

  public searchDataResult() {

    //console.log(this.searchResultStr);
    //this.searchResultStr =values.skeyword;
    //this.router.navigateByUrl('/home/search/'+values.skeyword);
    this.router.navigateByUrl('/home/search/' + this.searchResultStr);

  }

  public userLogout() {
    let usersRef = firebase.database().ref('presence/' + this.currentFireUserId);
    let connectedRef = firebase.database().ref('.info/connected');
    let fUserId = parseInt(localStorage.getItem("loginUserId"));
    connectedRef.on('value', function (snapshot) {
      usersRef.set({ online: false, userid: fUserId });
      //usersRef.onDisconnect().remove();
    });
    //this.afAuth.logout();
    firebase.auth().signOut().then(function () {
      //console.log('Signed Out');
    }, function (error) {
      //console.error('Sign Out Error', error);
    });
    localStorage.removeItem("currentUser");
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userName");
    localStorage.removeItem("profile_image");
    localStorage.removeItem("loginUserId");
    localStorage.removeItem("groupAdmin");
    this.router.navigateByUrl('/');
    //return false;
  }

  toggleCollapse() {
    this.show = !this.show;
  }
  private validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
  public getUserDetails() {
    const loginUserId = localStorage.getItem("loginUserId");
    if (loginUserId != '') {
      const dataUserDet = {
        "id": parseInt(loginUserId)
      };
      this._service.getUserDetById(dataUserDet).subscribe(data => {
        const details = data;
        if (details.Ack == "1") {
          this.currentUserDet = details.UserDetails[0];
          //console.log(this.currentUserDet);
        }
      },
        error => {
        }
      );
    } else {
    }

  }
}
