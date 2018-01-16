import { Component, OnInit } from '@angular/core';
import { FrontendService } from "../../components/frontend-app-header/frontend.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public homepageData:any;
  public homepageArtData =[];
  public loginUserId: number = parseInt(localStorage.getItem("loginUserId"), 0);
  public homepageCls='';
  constructor(
    private dataService: FrontendService
  ) { 
    if(this.loginUserId>0){
      this.homepageCls='pt-64';
    }else{
      this.homepageCls='pt-150';
    }
    //console.log(this.homepageCls);
  }

  ngOnInit() {
    this.getHomePageContent();
    this.getHomePageTopArticle();
  }

  getHomePageContent() {
    this.dataService.getHomePageData().subscribe(data => {
      if (data.Ack == "1") {
        this.homepageData = data.Homepage[0];
        //console.log(this.homepageData);
      }
    }, error => {
      console.log('Something went wrong!');
    });
  }

  getHomePageTopArticle() {
    this.dataService.getHomePageTopArtData().subscribe(data => {
      if (data.Ack == "1") {
        this.homepageArtData = data.ArticleList;
        //console.log(this.homepageData);
      }
    }, error => {
      console.log('Something went wrong!');
    });
  }
}
