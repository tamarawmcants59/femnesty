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
  public search_con: string;
  public onlineUserList = [];
  public firebasOnlineUserList: any;
  //public showAllLi:boolean=false;
  loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0) || 0;
  constructor(private db: AngularFirestore, private userService: UserService) { }

  ngOnInit() {
    this.getUnreadMessages();
    this.getConnectionList();
  }

  getUnreadMessages() {
    /*const db_chat = firebase.firestore();
    //const citiesRef = this.db.collection("Messages");
    const queryChat =db_chat.collection("Messages").where('to_user_id', '==', this.loginUserId).get()
    .then(function(querySnapshot) {
      //console.log(querySnapshot);
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
      return ref.where('to_user_id', '==', this.loginUserId).orderBy('created', 'desc');
    }).snapshotChanges().map(actions => {
      return actions.map(action => {
        const data = action.payload.doc.data();
        newArray.push(data);

        const id = action.payload.doc.id;
        return { id, ...data };
      });
    });
    messages.subscribe(data => {
      
      var isFound = false;
      var index;
      var finalArray = [];
      if (data && data.length > 0) {
        for (var i = 0; i < data.length; i++) {
          if (i == 0) {
            finalArray.push(data[i]);
          }
          else {
            var isfound=false;
            for (var j = 0; j < finalArray.length; j++) {
              if (finalArray[j].from_user_id == data[i]["from_user_id"]) {
                isfound=true;
                break;
              }
              else {
                isfound=false;
                //finalArray.push(data[i]);
              }
            }
            if(isfound==false)
            {
              finalArray.push(data[i]);
            }
          }
        }
        this.chatHeads = finalArray;
      }
      else
        this.chatHeads = data;
      //console.log(this.chatHeads);
      this.fillUserDetails();
    });
  }

  fillUserDetails() {
    this.chatHeads.map(ch => {
      this.userService.getChatUserDetById({ id: ch.from_user_id,login_id:this.loginUserId }).subscribe(res => {
        //console.log(res);
        ch['userDetails'] = res.UserDetails[0];
      });
    });
  }

  public getConnectionList() {
    if (this.loginUserId != 0) {
      let onlineUsersRef = firebase.database().ref('presence/');
      const dataUserDet = {
        "user_id": this.loginUserId
      };
      this.userService.getUserFrndListById(dataUserDet)
        .subscribe(data => {
          const details = data;
          if (details.Ack == "1") {
            this.userFrndList = details.FriendListById;
            //console.log(this.userFrndList);
            onlineUsersRef.on('value', (snapshot)=> {
              for (let key in snapshot.val()) {
                  if (snapshot.val()[key].online && snapshot.val()[key].userid!=this.loginUserId) {
                    let onlineUserDet = details.FriendListById.filter(item => item.friend_id == snapshot.val()[key].userid);
                    let checkOnlineUserlist = this.onlineUserList.filter(item => item.friend_id == snapshot.val()[key].userid);
                    if(onlineUserDet.length>0 && checkOnlineUserlist.length==0){
                      onlineUserDet[0].is_online=true;
                      //console.log(onlineUserDet);
                      //this.onlineUserList.push(onlineUserDet[0]);
                    }
                  }
              }
            });
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

  public searchConnection() {
    //console.log(this.search_con);
    if (this.loginUserId != 0 && this.search_con!='') {
      this.search_con = this.search_con.toLowerCase();
      //this.getConnectionList();
      let goodFriends = this.userFrndList.filter(item => {
        if(item.name.toLowerCase().search(this.search_con)!==-1){
          return item;
        }
      });
      this.userFrndList = goodFriends;
    }else{
      this.getConnectionList();
    }
  }
}
