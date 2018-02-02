import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";
@Component({
  selector: 'app-partnership',
  templateUrl: './partnership.component.html',
  styleUrls: ['./partnership.component.css']
})
export class PartnershipComponent implements OnInit {
partnerShipContent:any;
  constructor(private frontEndService: FrontendService) { 
    this.frontEndService.getPartnershipContent().subscribe(data => {
      if (data.Ack == "1") {
       this.partnerShipContent=data.PartnerShip[0];
      }
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }

  ngOnInit() {
  }

}
