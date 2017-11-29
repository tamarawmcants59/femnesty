import { Observable } from 'rxjs/Observable';
import { Component, OnInit, OnDestroy } from '@angular/core';
import * as firebase from 'firebase';
import { ActivatedRoute } from '@angular/router';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../user/user.service';
import { Promise } from 'q';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy {

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
      this.fromUserId = parseInt(params['userId'], 0);
      this.getWithUser(this.fromUserId);
      this.getThisUser(this.loginUserId);
      this.room_id = (this.fromUserId > this.loginUserId) ?
        '' + this.loginUserId + "_" + this.fromUserId
        : '' + this.fromUserId + '_' + this.loginUserId;
      this.getMessages();
    });
    this.isComponentActive = true;
    console.log(firebase.firestore.FieldValue.serverTimestamp());
  }

  ngOnDestroy() {
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
          console.log(id);
          setTimeout(() => {
            this.db.collection('Messages').doc(id).update({ is_read: true }).then(res => {
              console.log(res);
            }).catch(err => {
              console.log(err);
            });
          }, 3000);
        }
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
      to_user_id: this.fromUserId,
      from_user_id: this.loginUserId,
      created: firebase.firestore.FieldValue.serverTimestamp(),
      message: {
        file: file_name
      },
      is_read: false
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

}
