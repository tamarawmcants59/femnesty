import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PagenotfoundComponent } from './pagenotfound.component';

const pagenotRoute: Routes = [
    {
        path: '',
        data: {
            title: "404 Page Not Found"
        },
        children: [{
            path: '',
            data: {
                title: "404 Page Not Found"
            },
            component: PagenotfoundComponent
        }]
    }
];
@NgModule({
    imports: [RouterModule.forChild(pagenotRoute)],
    exports: [RouterModule]
})

export class PagenotfoundRoute { }