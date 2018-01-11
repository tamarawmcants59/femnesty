import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-allphoto',
  templateUrl: './allphoto.component.html',
  styleUrls: ['./allphoto.component.css']
})
export class AllphotoComponent implements OnInit {
  public otherProfileDet:any;
  public isloginUser:any;
  public isloginUserId:any;

  constructor() { 
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isloginUser = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
  }

}
