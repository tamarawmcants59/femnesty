import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ArticleComponent } from './article.component';
import { ArticlecatComponent } from "./articlecat/articlecat.component";
import { ArticlecatwiselistComponent } from "./articlecat/articlecatwiselist.component";
import { ArticledetailsComponent } from "./articlecat/articledetails.component";
const routes: Routes = [
  {
    path: '',
    component: ArticleComponent,
    data: {
      title: 'Articles'
    }
  },
  {
    path: ':slug',
    component: ArticlecatComponent,
    data: {
      title: 'Category Details'
    }
  },
  {
    path: 'list/:slug',
    component: ArticlecatwiselistComponent,
    data: {
      title: 'List Article'
    }
  },
  {
    path: 'details/:slug',
    component: ArticledetailsComponent,
    data: {
      title: 'Article Details'
    }
  }/*,
  {
    path: 'videos',
    component: VideosComponent,
    data: {
      title: 'Video'
    }
  },
  {
    path: 'events',
    component: EventsComponent,
    data: {
      title: 'Events'
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ArticleRouting { }
