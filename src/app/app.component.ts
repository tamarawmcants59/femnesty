import { Component } from '@angular/core';
import { FrontendService } from "./components/frontend-app-header/frontend.service";

/*@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})*/

@Component({
  // tslint:disable-next-line
  selector: 'app-root',
  template: '<router-outlet></router-outlet>'
})
export class AppComponent {
  title = 'app';
  constructor(
    private _service: FrontendService
  ) {
    this._service.getSiteSettings().subscribe(data => {
      if (data.Ack == "1") {
        let link;
        //this.siteSettingsDet = data.SiteSettings[0];
        link = document.createElement('link');
        link.type = 'image/x-icon';
        link.rel = 'shortcut icon';
        //link.href = 'http://www.stackoverflow.com/favicon.ico';
        link.href = data.SiteSettings[0].favicon_url;
        document.getElementsByTagName('head')[0].appendChild(link);
      } 
    },
      error => {
        console.log('Something went wrong!');
      }
    );
  }
  /*public setAppFavicon(id: string, icon: string){
      $("#"+id).attr("href", icon);
  }*/
 
}
