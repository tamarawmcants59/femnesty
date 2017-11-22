import { Component, OnInit } from '@angular/core';
import { UserService } from "../user.service";

@Component({
  selector: 'app-shareyourstory',
  templateUrl: './shareyourstory.component.html',
  styleUrls: ['./shareyourstory.component.css']
})
export class ShareyourstoryComponent implements OnInit {

  constructor(
    private dataService: UserService
  ) { }

  ngOnInit() {
  }

}
