import { Component, OnInit } from '@angular/core';
import { UserService } from "../user/user.service";
import { FrontendService } from '../../components/frontend-app-header/frontend.service';
@Component({
  selector: 'app-mentorship',
  templateUrl: './mentorship.component.html',
  styleUrls: ['./mentorship.component.css']
})
export class MentorshipComponent implements OnInit {
  public mentorshipList = [];
  mentorShipContent: any;
  constructor(
    private dataService: UserService,
    private frontEndSrvc: FrontendService
  ) {

    this.frontEndSrvc.getMentorshipContent().subscribe(data => {
      if (data.Ack == "1") {
        this.mentorShipContent = data.MentorshipsContent[0];
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }

  ngOnInit() {
    this.getMentorshipList();
  }

  public getMentorshipList() {
    this.dataService.getAllMentorshipList().subscribe(data => {
      if (data.Ack == "1") {
        this.mentorshipList = data.AllmentorList;
      }
    }, error => {
    });

  }
}
