import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageComponent } from './page.component';

const routes: Routes = [
    {
        path: '',
        data: {
            title: 'Page'
        },
        children: [
            {
              path: ':slug',
              component: PageComponent,
              data: {
                title: 'Page'
              }
            }
          ]
        /*redirectTo: ':slug',
        pathMatch: 'full',*/
    }/*,  
    {
        path: ':slug',
        component: PageComponent,
        data: {
        title: 'Page'
        }
    }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PageRouting { }
