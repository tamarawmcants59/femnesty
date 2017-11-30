import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../user/user.service';
import { Promise } from 'q';

@Component({
  selector: 'app-group-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class GroupChatComponent implements OnInit, OnDestroy {

  chats: any[];
  groupMemberList =[];
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  groupId: number;
  room_id: string;
  users = [];
  message: string;
  fileData: any;
  dbRef: any;
  isComponentActive: boolean;
  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.groupId = parseInt(params['groupId'], 0);
      this.room_id = '_' + this.groupId;
      this.getMessages();
      this.getGroupMemberList();
    });
    this.isComponentActive = true;
    console.log(firebase.firestore.FieldValue.serverTimestamp());
  }

  ngOnDestroy() {
    console.log('component destroyed');
    this.isComponentActive = false;
  }


  getMessages() {
    this.dbRef = this.db.collection('Messages', ref => {
      return ref.where('room_id', '==', this.room_id).orderBy("created", "asc");
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    this.dbRef.subscribe(data => {
      this.chats = data;
      this.updateUserOfMessages();
    });
  }

  updateUserOfMessages() {
    this.chats.map(chat => {
      if (chat.message.file && /\.(jpeg|jpg|gif|png)$/.test(chat.message.file)) {
        chat.message.image = chat.message.file;
      }
      if (chat.from_user_id === this.loginUserId) {
        chat.isSelf = true;
        chat.cssClass = "even";
      } else {
        chat.isSelf = false;
        chat.cssClass = "odd";
      }
      this.userService.getUserDetById({ id: chat.from_user_id }).subscribe(res => {
        chat.userDetail = res.UserDetails[0];
      });
    });
  }

  sendMessage() {
    const data = {
      room_id: this.room_id,
      from_user_id: this.loginUserId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      message: {
        text: this.message
      },
      is_read: true
    };
    console.log(data);
    this.db.collection('Messages').add(data).then(res => {
      console.log(res);
      this.message = null;
    }).catch(err => {
      console.log('error with fb: ', err);
    });
  }

  sendFile(file_name) {
    const data = {
      room_id: this.room_id,
      from_user_id: this.loginUserId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      message: {
        file: file_name
      },
      is_read: true
    };
    console.log(data);
    this.db.collection('Messages').add(data).then(res => {
      console.log(res);
      this.message = null;
    }).catch(err => {
      console.log('error with fb: ', err);
    });
  }

  public fileChangePost($event) {
    //this.showPostImgDive = true;
    console.log($event);
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
        console.log(data);
        if (data.file_name) {
          this.sendFile(data.file_name);
        }
      },
      error => {
        alert(error);
      });

  }

  public getGroupMemberList() {
    if(this.groupId > 0) {
      const dataUserDet = {
        "group_id": this.groupId
      };
      this.userService.getGroupMemberListById(dataUserDet).subscribe(data => {
          //console.log(data);
          if (data.Ack == "1") {
            this.groupMemberList = data.groupMembers;
          } 
        },
        error => {

        });
    }
  }

}
