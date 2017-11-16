import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit {
  chatHeads: any[];
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0) || 0;
  constructor(private db: AngularFirestore) { }

  ngOnInit() {
    this.getUnreadMessages();
  }

  getUnreadMessages() {
    const messages = this.db.collection('Messages', ref => {
      return ref.where('to_user_id', '==', this.loginUserId).where('is_read', '==', false);
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    messages.subscribe(data => {
      console.log(data);
      this.chatHeads = data;
    });
  }

}
