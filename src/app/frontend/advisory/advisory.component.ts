import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";
@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.css']
})
export class AdvisoryComponent implements OnInit {
advisoryContentList:any;
advisoryContent:any;
  constructor(private frontEndService: FrontendService) { 
  this.frontEndService.getAdvisoryContent().subscribe(data => {
    if (data.Ack == "1") {
      this.advisoryContentList = data.Members;
      this.advisoryContent=data.Advisory[0];
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
