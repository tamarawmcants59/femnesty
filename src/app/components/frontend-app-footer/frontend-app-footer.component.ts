//import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { ChatListnerService } from './../../service/chat.listner.service';
import { Component, ElementRef, OnInit, OnDestroy, ViewChild, AfterViewChecked } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../frontend/user/user.service';
import { FrontendService } from "../frontend-app-header/frontend.service";
import { AngularFireAuth } from 'angularfire2/auth';
import { AngularFireDatabase } from 'angularfire2/database';
//import { DatePipe } from '@angular/common';
//@Injectable()

@Component({
  selector: 'frontend-app-footer',
  templateUrl: './frontend-app-footer.component.html'
})
export class FrontendAppFooter implements OnInit, OnDestroy, AfterViewChecked {
  @ViewChild('scrollMe') private myChatContainer: ElementRef;

  public currentFireUserId:string;

  current_year = '';
  chatClass = 'live-chat hide';
  chats: any[];
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  fromUserId: number;
  withUser = {
    first_name: '',
    last_name: '',
    image_url: ''
  };
  thisUser = {
    first_name: '',
    last_name: '',
    image_url: ''
  };
  room_id: string;
  users = [];
  message: string;
  newsletteremail:string;
  fileData: any;
  dbRef: any;
  isComponentActive: boolean;
  public pageContactData: string = '';
  public siteSettingsDet: Object = {};

  constructor(
    private el: ElementRef,
    private _chatListnerService: ChatListnerService,
    private db: AngularFirestore,
    private userService: UserService,
    private _service: FrontendService,
    private afAuth: AngularFireAuth,
    private firedb: AngularFireDatabase
  ) {
    this._chatListnerService.listen().subscribe((chat: any) => {
      this.openChatWindow(chat);
    });

    this.afAuth.authState.do(user => {
      if (user) {
         this.currentFireUserId = user.uid;
         //console.log(this.currentFireUserId);
         this.updateOnConnect();
      }
    }).subscribe();
  }

  scrollToBottom(): void {
    try {
      this.myChatContainer.nativeElement.scrollTop = this.myChatContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  //wait for the component to render completely
  ngOnInit(): void {
    //console.log(this.currentFireUserId);
    const nativeElement: HTMLElement = this.el.nativeElement,
      parentElement: HTMLElement = nativeElement.parentElement;
    // move all children out of the element
    while (nativeElement.firstChild) {
      parentElement.insertBefore(nativeElement.firstChild, nativeElement);
    }
    // remove the empty element(the host)
    parentElement.removeChild(nativeElement);
    this.current_year=Date();
    this.pageContactData = 'contact-us';

    this._service.getSiteSettings().subscribe(data => {
      if (data.Ack == "1") {
        this.siteSettingsDet = data.SiteSettings[0];
      } 
    },
    error => {
      console.log('Something went wrong!');
    });

  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  openChatWindow(chat) {
    this.fromUserId = chat.from_user_id;
    this.room_id = chat.room_id;
    this.getWithUser(this.fromUserId);
    this.getThisUser(this.loginUserId);
    this.getMessages();
    this.isComponentActive = true;
    this.chatClass = 'live-chat';
  }

  closeChat() {
    this.chatClass = 'live-chat hide';
    this.isComponentActive = false;
  }

  ngOnDestroy(): void {
    console.log('component destroyed');
    this.isComponentActive = false;
  }

  getWithUser(user_id) {
    return this.userService.getUserDetById({ id: user_id }).subscribe(res => {
      this.withUser = res.UserDetails[0];
    });
  }
  getThisUser(user_id) {
    return this.userService.getUserDetById({ id: user_id }).subscribe(res => {
      this.thisUser = res.UserDetails[0];
    });
  }

  getMessages() {
    this.dbRef = this.db.collection('Messages', ref => {
      return ref.where('room_id', '==', this.room_id).orderBy("created", "asc");
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        if (data.to_user_id == this.loginUserId && this.isComponentActive) {
          //console.log(id);
          setTimeout(() => {
            this.db.collection('Messages').doc(id).update({ is_read: true }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          }, 3000);
        }
        const liveChat = document.getElementById('chat-container-popup');
        //liveChat.scrollTop = liveChat.scrollHeight;
        //console.log(liveChat.scrollHeight);
        return { id, ...data };
      });
    });
    this.dbRef.subscribe(data => {
      this.chats = data;
      this.updateUserOfMessages();
      console.log(this.chats);
    });
  }

  updateUserOfMessages() {
    this.chats.map(chat => {
      if (chat.message.file && /\.(jpeg|jpg|gif|png)$/.test(chat.message.file)) {
        chat.message.image = chat.message.file;
      }
      if (chat.from_user_id === this.loginUserId) {
        chat.isSelf = true;
        chat.cssClass = "right-section";
      } else {
        chat.isSelf = false;
        chat.cssClass = "";
      }
    });
  }

  sendMessage() {
    const data = {
      room_id: this.room_id,
      to_user_id: this.fromUserId,
      from_user_id: this.loginUserId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      message: {
        text: this.message
      },
      is_read: false
    };
    //console.log(data);
    this.message = null;
    this.db.collection('Messages').add(data).then(res => {
      //console.log(res);
      this.message = null;
    }).catch(err => {
      //console.log('error with fb: ', err);
    });
  }
  
  sendNewsletter() {
    if(this.newsletteremail!=''){
      this.userService.submitNewsLetter({ email: this.newsletteremail }).subscribe(res => {
        console.log(res);
        //this.thisUser = res.UserDetails[0];
      });
    }
    
    
    this.newsletteremail = null;
    
  }

  sendFile(file_name) {
    const data = {
      room_id: this.room_id,
      to_user_id: this.fromUserId,
      from_user_id: this.loginUserId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      message: {
        file: file_name
      },
      is_read: false
    };
    //console.log(data);
    this.db.collection('Messages').add(data).then(res => {
      //console.log(res);
      this.message = null;
    }).catch(err => {
      //console.log('error with fb: ', err);
    });
  }

  public fileChangePost($event) {
    //this.showPostImgDive = true;
    //console.log($event);
    const image: any = new Image();
    const file: File = $event.target.files[0];
    this.fileData = file;
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.fileData = image.src;
      this.submitPost();
    };
    myReader.readAsDataURL(file);
  }

  public submitPost() {
    const formData = {
      file_name: this.fileData
    };
    this.userService.uploadFile(formData)
      .subscribe(
      data => {
        //console.log(data);
        if (data.file_name) {
          this.sendFile(data.file_name);
        }
      },
      error => {
        alert(error);
      });

  }

  /// Updates status when connection to Firebase starts
  private updateOnConnect() {
    //console.log('hi');
    let usersRef = firebase.database().ref('presence/'+this.currentFireUserId);
    let connectedRef = firebase.database().ref('.info/connected');
    const fUserId=this.loginUserId;
    connectedRef.on('value', function(snapshot) {
      if (snapshot.val()) {
        // User is online.
        //usersRef.onDisconnect().remove();
        usersRef.onDisconnect().set({ online: false, userid:fUserId});
        usersRef.set({ online: true, userid:fUserId});
        //console.log('online');
      } else {
        // User is offline.
        // WARNING: This won't work! See an explanation below.
        usersRef.set({ online: false, userid:fUserId});
      }
    });   
  }


}
