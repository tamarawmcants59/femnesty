import { Component, OnInit } from '@angular/core';
import { HubService } from "../../../components/hub-create/hub.service";
import { AgmCoreModule } from '@agm/core';
import { UserService } from "../user.service";
@Component({
  selector: 'app-browsehub',
  templateUrl: './browsehub.component.html',
  styleUrls: ['./browsehub.component.css']
})
export class BrowsehubComponent implements OnInit {
  public isloginUser =1;
  public loginUserId: any;
  public allHubs;
  public allCategories;
  public lat;
  public lng;
  private search_con;
  public search_date;
  public latestArticles = [];
  public search_data = { keyword: '', cat_id: '', search_date:''};
  constructor(private hubService: HubService, private dataService: UserService,) {
    this.loginUserId = localStorage.getItem("loginUserId");
  }

  ngOnInit() {
    this.getAllHubs();
    this.getLastFourArticle();
  }

  public getAllHubs(){
    //console.log('search keyword', this.search_con);
    //const search_data = { keyword: this.search_con};
    this.hubService.getAllHubs(this.loginUserId, this.search_data).subscribe(data => {
      if(data.Ack == 1)
      {
        this.allHubs = data.details;
        this.allCategories = data.categories;
        this.lat = data.lat;
        this.lng = data.lng;
      }
    }, 
      error => {
        console.log('Something went wrong!');
      })
  }

  public searchByKeyword(){
    this.search_data.keyword = this.search_con;
    this.getAllHubs();
  }

  public searchByDate() {
    this.search_data.search_date = this.search_date;
    this.getAllHubs();
  }

  public searchByCategory(id)
  {
    this.search_data.cat_id = id;
    this.getAllHubs();
  }

  public getLastFourArticle() {
    this.dataService.getFourArticleList().subscribe(data => {
      let details = data;
      if (details.Ack == "1") {
        this.latestArticles = details.LastArticleList;
      }
    },
      error => {
      }
    );
  }
}
