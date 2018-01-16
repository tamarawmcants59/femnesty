import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { UserService } from "../../user/user.service";
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-mentorshipdetails',
  templateUrl: './mentorshipdetails.component.html',
  styleUrls: ['./mentorshipdetails.component.css']
})
export class MentorshipdetailsComponent implements OnInit {
  public mentorshipDet:any ;
  public SlugName='';
  public repoUrl = '';

  constructor(
    private dataService: UserService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) { 
    this.repoUrl=environment.website_url+this.router.url;
  }

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

export declare class FacebookParams {
  u: string;  
}

export class GooglePlusParams {
  url: string
}

export class LinkedinParams {
  url:string
}

export declare class PinterestParams {
  url: string;
  media: string;
  description: string;
}

export class TwitterParams {
  text: string;
  url: string;
  hashtags: string;
  via: string;
}