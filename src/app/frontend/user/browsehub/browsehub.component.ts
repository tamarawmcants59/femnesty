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
  public isloginUser = 1;
  public loginUserId: any;
  public searchCatName: any;
  public allHubs;
  public allCategories;
  public lat;
  public lng;
  currentLat : any;
  currentLng :any;
  private search_con;
  public search_date;
  public latestArticles = [];
  public search_data = { keyword: '', cat_id: '', search_date: '',currentLat:'', currentLng:''};
  constructor(private hubService: HubService, private dataService: UserService, ) {
    this.loginUserId = localStorage.getItem("loginUserId");
  }

  ngOnInit() {
    const self = this;
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {

        self.currentLat = position.coords.latitude;
        self.currentLng = position.coords.longitude;
        self.getAllHubs();

      }, function (err) {
        self.getAllHubs();
      }, { timeout: 10000 });
    }

    this.getLastFourArticle();
  }



  private ReturnDayFromDate(date: Date) {
    let result: any;
    let day = date.getDay();
    switch (day) {
      case 0: {
        result = 'Sunday';
        break;
      }
      case 1: {
        result = 'Monday';
        break;
      }
      case 2: {
        result = 'Tuesday';
        break;
      }
      case 3: {
        result = 'Wednesday';
        break;
      }
      case 4: {
        result = 'Thursday';
        break;
      }
      case 5: {
        result = 'Friday';
        break;
      }
      case 6: {
        result = 'Saturday';
        break;
      }
      default: {
        result = 'Sunday';
        break;
      }
    }
    return result;
  }
  public getAllHubs() {
    //console.log('search keyword', this.search_con);
    //const search_data = { keyword: this.search_con};
    const self = this;
    if(this.currentLat==0)
    {
      this.currentLat="";
    }
    if(this.currentLng==0)
    {
      this.currentLng="";
    }
    //const data={search_data:this.search_data,currentLat:this.currentLat,currentLng:this.currentLng};
    const data=this.search_data;
    data.currentLat=this.currentLat;
    data.currentLng=this.currentLng;
    this.hubService.getAllHubs(this.loginUserId, data).subscribe(data => {
      if (data.Ack == 1) {
        this.allHubs = data.details;
        if (self.allHubs.length && self.allHubs.length > 0) {
          for (var i = 0; i < self.allHubs.length; i++) {
            if (self.allHubs[i].type == 'R') {
              if (self.allHubs[i].recurring_start)
                self.allHubs[i].day = self.ReturnDayFromDate(new Date(self.allHubs[i].recurring_start));
            }
          }
        }
        this.allCategories = data.categories;
        if(data.lat==0)
        {
          if(this.currentLat!=''){
            this.lat=this.currentLat;
          }else{
            this.lat= 51.5050328;
          }
          
        }
        else
        {
          this.lat = data.lat;
        }
        if(data.lng==0)
        {
          if(this.currentLng!=''){
            this.lng=this.currentLng;
          }else{
            this.lng= -0.08745629999998;
          }
        }
        else
        {
          this.lng = data.lng;
        }
        //console.log(this.allHubs);
      }
    },
      error => {
        console.log('Something went wrong!');
      })
  }

  public searchByKeyword() {
    this.search_data.keyword = this.search_con;
    this.getAllHubs();
  }

  public searchByDate() {
    this.search_data.search_date = this.search_date;
    this.getAllHubs();
  }

  public searchByCategory(id,name=null) {
    this.search_data.cat_id = id;
    this.searchCatName=name;
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

  private handleKeyDown(event: any) {
    //alert(event.keyCode)
    if (event.keyCode == 13) {
      // action
      this.searchByKeyword();
    }
    // else if (event.keyCode == 40) {
    //   // action
    // }
    // else if (event.keyCode == 38) {
    //   // action
    // }
  }

  private handleKeyDown1(event: any) {
    //alert(event.keyCode)
    if (event.keyCode == 13) {
      // action
      this.searchByDate();
    }
    // else if (event.keyCode == 40) {
    //   // action
    // }
    // else if (event.keyCode == 38) {
    //   // action
    // }
  }

  public attendHubDetails(hubId) {
    const attendData = { hub_id: hubId, user_id: this.loginUserId };
    this.hubService.attendHub(attendData).subscribe(data => {
      location.reload();
    },
      error => {
        console.log('Something went wrong!');
      });
  }

}
