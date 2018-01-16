import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FrontendService } from "../../components/frontend-app-header/frontend.service"
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  public isloginUser: any;
  public isloginUserId: any;
  public searchData = [];
  public searchKeyword: string = '';

  constructor(
    private dataService: FrontendService,
    private activatedRoute: ActivatedRoute,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.isloginUserId = localStorage.getItem("loginUserId");
    this.isloginUser = localStorage.getItem("isLoggedIn");
  }

  ngOnInit() {
    this.activatedRoute.params.subscribe((params: Params) => {

      this.searchKeyword = params['keyword'];
      this.getSearchResult();
    });
    //console.log(this.searchKeyword);
    // this.getSearchResult();
  }

  public getSearchResult() {
    const dataUserDet = {
      "keyword": this.searchKeyword
    };
    this.dataService.getUserSearchdata(dataUserDet).subscribe(data => {
      if (data.Ack == "1") {
        this.searchData = data.TotalSearch;
        //console.log(this.searchData);
      }
    },
      error => {

      });
  }
}
