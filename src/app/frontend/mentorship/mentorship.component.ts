import { Component, OnInit } from '@angular/core';
import { UserService } from "../user/user.service";

@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  public mentorshipList =[];

  constructor(
    private dataService: UserService
  ) { }

  ngOnInit() {
    this.getMentorshipList();
  }

  public getMentorshipList() {
    this.dataService.getAllMentorshipList().subscribe(data => {
        console.log(data);
        if (data.Ack == "1") {
            this.mentorshipList = data.AllmentorList;
        } 
    },error => {
    });

  }
}
