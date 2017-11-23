import { Component, OnInit, Input } from '@angular/core';
import { CompanyService } from "../../frontend/company/company.service";

@Component({
  selector: 'app-company-rightbar',
  templateUrl: './company-rightbar.component.html',
  styleUrls: ['./company-rightbar.component.css']
})
export class CompanyRightbarComponent implements OnInit {
 

  @Input() profileData: {
    id: number;
    company_name: string;
    bio: string;
    address: string;
    city: string;
    website: string;
    phone: string;
   
  };

  /*@Input() followerList: {
    id: number;
    user_id: number;
    slug: string;
    group_uname: string;
    group_name: string;
    short_desc: string;
    long_desc: string;
    status: string;
    first_name: string;
    last_name: string;
    name: string;
    profile_image: string;
    display_name: string;
    group_image: string;
    member_count: number;
    cdate: string;
  };*/

  constructor(
    private dataService: CompanyService
   
  ) { 
    
  }

  ngOnInit() {

    
  }

 
  

}
