import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EnrichmentComponent } from './enrichment.component';
import { BooksComponent } from "./books/books.component";
import { VideosComponent } from "./videos/videos.component";
import { EventsComponent } from "./events/events.component";
import { BookdetailsComponent } from "./books/bookdetails.component";
import { VideodetailsComponent } from "./videos/videodetails.component";
import { EventcatComponent } from "./events/eventcat.component";
import { EventcatlistComponent } from "./events/eventcatlist.component";
import { EventdetailsComponent } from "./events/eventdetails.component";
const routes: Routes = [
  {
    path: '',
    component: EnrichmentComponent,
    data: {
      title: 'Enrichment'
    }
  },
  {
    path: 'books',
    component: BooksComponent,
    data: {
      title: 'Books'
    }/*,
    children: [
      {
        path: '',
        component: BooksComponent
      },
      {
        path: 'book_details/:slug',
        component: BookdetailsComponent
      }
    ]*/
  },
  {
    path: 'book_details/:slug',
    component: BookdetailsComponent,
    data: {
      title: 'Book Details'
    }/*,
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]*/
  },
  {
    path: 'video_details/:slug',
    component: VideodetailsComponent,
    data: {
      title: 'Video Details'
    }/*,
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]*/
  },
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
  },
  {
    path: 'category_details/:slug',
    component: EventcatComponent,
    data: {
      title: 'Events Category Details'
    }
  },
  {
    path: 'list/:slug',
    component: EventcatlistComponent,
    data: {
      title: 'Events Category List'
    }
  },
  {
    path: 'eventdetails/:slug',
    component: EventdetailsComponent,
    data: {
      title: 'Event Details'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EnrichmentRouting { }
