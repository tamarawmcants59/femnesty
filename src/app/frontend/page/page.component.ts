import { Router, ActivatedRoute, Params} from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrls: ['./page.component.css']
})
export class PageComponent implements OnInit {

  pageDetData=[];
  pageSlugName='';
  
  constructor(
    private _page_service: FrontendService,
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    //alert('hi');
    this.activatedRoute.params.subscribe((params: Params) => {
        this.pageSlugName = params['slug'];
    });

    this._page_service.getPageDetBySlug(this.pageSlugName).subscribe(data=>{
        let details=data;
        //console.log(details);
        if (details.Ack=="1") {
            this.pageDetData = details.ContentAllBySlug[0];
            //console.log(this.pageDetData);
            return false;
        }else{
            //localStorage.setItem('isLoggedIn', '1');
            return false;
        }
      },
      error => {
        console.log('Something went wrong!');
      }
    ); 


  }

}
