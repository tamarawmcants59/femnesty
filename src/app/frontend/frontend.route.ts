import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
import { SearchComponent } from "./search/search.component";
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
    }
];
@NgModule({
    imports: [RouterModule.forChild(frontendRoute)],
    exports: [RouterModule]
})
export class FrontendRoute { }