import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
import { AdvisoryComponent } from "./advisory/advisory.component";
import { CorporateComponent } from "./corporate/corporate.component";
import { PartnershipComponent } from './partnership/partnership.component';

const frontendRoute: Routes = [
    {
        path: '',
        data: {
            title: "Frontend"
        },
        children: [{
            path: '',
            data: {
                title: "Home Page"
            },
            component: HomeComponent
        }
        ]
    },
    {
      path: 'search/:keyword',
      component: SearchComponent,
      data: {
        title: 'Search'
      }
    },
    {
        path: 'corporate',
        component: CorporateComponent,
        data: {
          title: 'Corporate'
        }
    },
    {
        path: 'advisory',
        component: AdvisoryComponent,
        data: {
          title: 'Advisory'
        }
    },
    {
        path: 'partnership',
        component: PartnershipComponent,
        data: {
          title: 'Partnership'
        }
    }
];
@NgModule({
    imports: [RouterModule.forChild(frontendRoute)],
    exports: [RouterModule]
})
export class FrontendRoute { }