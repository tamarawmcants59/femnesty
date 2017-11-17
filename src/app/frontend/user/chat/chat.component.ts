import { Observable } from 'rxjs/Observable';
import { Component, OnInit } from '@angular/core';
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
export class ChatComponent implements OnInit {

  chats: any[];
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  fromUserId: number;
  withUser: object;
  thisUser: object;
  room_id: string;
  users = [];
  message: string;
  fileData: any;
  constructor(
    private db: AngularFirestore,
    private userService: UserService,
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(params => {
      console.log(params);
      this.fromUserId = parseInt(params['userId'], 0);
      this.getWithUser(this.fromUserId);
      this.getThisUser(this.loginUserId);
      this.room_id = (this.fromUserId > this.loginUserId) ?
        '' + this.loginUserId + "_" + this.fromUserId
        : '' + this.fromUserId + '_' + this.loginUserId;
      this.getUnreadMessages();
    });
  }



  getWithUser(user_id) {
    console.log(user_id);
    return this.userService.getUserDetById({ id: user_id }).subscribe(res => {
      this.withUser = res.UserDetails[0];
    });
  }
  getThisUser(user_id) {
    console.log(user_id);
    return this.userService.getUserDetById({ id: user_id }).subscribe(res => {
      this.thisUser = res.UserDetails[0];
    });
  }

  getUnreadMessages() {
    const messages = this.db.collection('Messages', ref => {
      return ref.where('room_id', '==', this.room_id).orderBy("created", "asc");
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    messages.subscribe(data => {
      this.chats = data;
      this.updateUserOfMessages();
    });
  }

  updateUserOfMessages() {
    this.chats.map(chat => {
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
      created: Date(),
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

  public fileChangePost($event) {
    //this.showPostImgDive = true;
    console.log($event);
    const image: any = new Image();
    const file: File = $event.target.files[0];
    const myReader: FileReader = new FileReader();
    myReader.onloadend = (loadEvent: any) => {
      image.src = loadEvent.target.result;
      this.fileData = image.src;
      //that.cropper.setImage(image);
      //console.log(image.src);
    };
    myReader.readAsDataURL(file);
  }

  public submitPost() {
    const formData = {
      file_name : this.fileData
    };
    this.userService.uploadFile(formData)
      .subscribe(
      data => {
        console.log(data);
      },
      error => {
        alert(error);
      });

  }

}
