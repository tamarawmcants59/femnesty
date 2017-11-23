import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../../user/user.service";

@Component({
  selector: 'app-mentorshipdetails',
  templateUrl: './mentorshipdetails.component.html',
  styleUrls: ['./mentorshipdetails.component.css']
})
export class MentorshipdetailsComponent implements OnInit {
  public mentorshipDet:any ;
  public SlugName='';
  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {
        this.SlugName = params['id'];
    });
    this.getMentorshiDetails();
  }

  public getMentorshiDetails() {
    const dataUserDet = {
      "id": this.SlugName
    };
    this.dataService.getMentorshipDetailsById(dataUserDet).subscribe(data => {
        //console.log(data);
        if (data.Ack == "1") {
            this.mentorshipDet = data.MentorListById[0];
        } 
    },error => {
    });

  }
}
