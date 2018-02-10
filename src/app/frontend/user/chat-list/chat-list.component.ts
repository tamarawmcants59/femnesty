import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFirestore } from 'angularfire2/firestore';
import { UserService } from '../../user/user.service';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})

export class ChatListComponent implements OnInit {
  chatHeads: any[];
  userFrndList = [];
  public showLi:boolean=false;
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0) || 0;
  constructor(private db: AngularFirestore, private userService: UserService) { }

  ngOnInit() {
    this.getUnreadMessages();
    this.getConnectionList();
  }

  getUnreadMessages() {
    /*const db_chat = firebase.firestore();
    //const citiesRef = this.db.collection("Messages");
    const queryChat =db_chat.collection("Messages").orderBy('created').get()
    .then(function(querySnapshot) {
      
        querySnapshot.forEach(function(doc) {
            // doc.data() is never undefined for query doc snapshots
            //console.log(doc.id, " => ", doc.data());
            console.log(doc.id, " => ", doc.data());
        });
    })
    .catch(function(error) {
        console.log("Error getting documents: ", error);
    });*/

    /*$scope.empArray = Object.keys($scope.employees)
    .map(function (value, index) {
        return { joinDate: new Date(value), values: $scope.employees[value] }
    }
    );*/
    /*const queryChat = this.db.collection("Messages", ref => {
      return ref.where('to_user_id', '==', this.loginUserId).orderBy("created", "desc");
       //ref.orderBy('created');
    });*/
    //console.log(queryChat);
    var newArray = [];
    const messages = this.db.collection('Messages', ref => {
      return ref.where('to_user_id', '==', this.loginUserId);
       //ref.orderBy('created');
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        /*const data1 = action.payload.doc.data();
        const data2 = Object.keys(data1).map(function (value, index) {
            return { created: new Date(value), values: data1[value] }
        });
        console.log(data2);*/
        var isFound = false;
        var index;
        if (newArray.length > 0) {
          for (var i = 0; i < newArray.length; i++) {
            if (newArray[i].from_user_id == data.from_user_id) {
              isFound = true;
              index = i;
              break;
            }
            //console.log(isFound);
            //console.log(index);
          }
          if (isFound) {
            if (index) {
              newArray[index].message.text = data.message.text;
            }
            else if (index == 0) {
              newArray[index].message.text = data.message.text;
            }

          }
          else {
            newArray.push(data);
          }
        }
        else {
          newArray.push(data);
        }
      });
    });
    messages.subscribe(data => {
      if (newArray && newArray.length) {
        this.chatHeads = newArray;
      }
      else
        this.chatHeads = data;
      this.fillUserDetails();
    });
  }

  fillUserDetails() {
    this.chatHeads.map(ch => {
      this.userService.getUserDetById({ id: ch.from_user_id }).subscribe(res => {
        //console.log(res);
        ch['userDetails'] = res.UserDetails[0];
      });
    });
  }

  public getConnectionList() {
    if (this.loginUserId != 0) {
      const dataUserDet = {
        "user_id": this.loginUserId
      };
      this.userService.getUserFrndListById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userFrndList = details.FriendListById;
            //console.log(this.userFrndList);
          }
        },
        error => {

        });
    }
  }

  public show_more(){
    this.showLi = true;
  }
}
