import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params} from '@angular/router';
import { CompanyService } from "../../frontend/company/company.service";

@Component({
  selector: 'app-company-rightbar',
  templateUrl: './company-rightbar.component.html',
  styleUrls: ['./company-rightbar.component.css']
})
export class CompanyRightbarComponent implements OnInit {
  public companyNameByUrl: string='';
  public otherProfileDet = [];
  public userFollowerList = [];
  public otherProfileId: any;

  constructor(
    private dataService: CompanyService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    
  }

  ngOnInit() {

    
  }

 
  

}
