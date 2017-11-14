import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home/home.component";
//import { EnrichmentComponent } from "./enrichment/enrichment.component";
const frontendRoute: Routes = [
    {
        path:'',
        data:{
            title:"Frontend"
        },
        children:[{
            path:'',
            data:{
                title: "Home Page"
            },
            component:HomeComponent
        }
        ]
    }/*,
    {
        path:'enrichment',
        data:{
            title:"Enrichment Frontend"
        },
        children:[{
            path:'',
            data:{
                title: "Enrichment Page"
            },
            component:EnrichmentComponent
        }
        ]
    }*/
];
@NgModule({
    imports: [ RouterModule.forChild(frontendRoute) ],
    exports: [ RouterModule ]
  })
  export class FrontendRoute {}