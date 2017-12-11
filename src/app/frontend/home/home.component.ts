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
  constructor(
    private dataService: FrontendService
  ) { 
    //alert('home');
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
