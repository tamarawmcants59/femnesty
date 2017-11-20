import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './auth.guard';
// Import Containers
import {
  //FullLayout,
  //SimpleLayout,
  FrontendLayout
} from './containers';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  /*{
    path: 'admin',
    component: FullLayout,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: './views/dashboard/dashboard.module#DashboardModule'
      },
      {
        path: 'components',
        loadChildren: './views/components/components.module#ComponentsModule'
      },
      {
        path: 'icons',
        loadChildren: './views/icons/icons.module#IconsModule'
      },
      {
        path: 'widgets',
        loadChildren: './views/widgets/widgets.module#WidgetsModule'
      },
      {
        path: 'charts',
        loadChildren: './views/chartjs/chartjs.module#ChartJSModule'
      }
    ]
  },*/
  {
    path:'home',
    component: FrontendLayout,
    data:{
      title: 'Home Page'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/frontend.module#FrontendModule'
      }
    ]
  },
  {
    path:'group',
    component: FrontendLayout,
    data:{
      title: 'Group Page'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/group.module#GroupModule'
      }
    ]
  },
  {
    path:'enrichment',
    component: FrontendLayout,
    data:{
      title: 'Enrichment'
    },
    children: [
      {
        path: '',
        //loadChildren: './frontend/frontend.module#FrontendModule'
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      }/*,
      {
        path: 'books',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'book_details/:slug',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'videos',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'video_details/:slug',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'events',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'category_details/:slug',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'list/:slug',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      },
      {
        path: 'eventdetails/:slug',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
      }*/
    ]
  },
  {
    path:'articles',
    component: FrontendLayout,
    //canActivateChild: [AuthGuard],
    data:{
      title: 'Articles'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/article/article.module#ArticleModule'
      }/*,
      {
        path: ':slug',
        loadChildren: './frontend/article/article.module#ArticleModule'
      },
      {
        path: 'list/:slug',
        loadChildren: './frontend/article/article.module#ArticleModule'
      },
      {
        path: 'details/:slug',
        loadChildren: './frontend/article/article.module#ArticleModule'
      }*/
    ]
  },
  {
    path: 'user',
    component: FrontendLayout,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/user/user.module#UserModule',
      }/*,
      {
        path: 'login',
        loadChildren: './frontend/user/user.module#UserModule',
      },
      {
        path: 'signup',
        loadChildren: './frontend/user/user.module#UserModule',
      },
      {
        path: 'profile',
        //canActivateChild: [AuthGuard],
        loadChildren: './frontend/user/user.module#UserModule',
      }*/
      
    ]
  },
  {
    path:'social_home',
    component: FrontendLayout,
    //canActivateChild: [AuthGuard],
    data:{
      title: 'Home'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/socialhome/socialhome.module#SocialhomeModule'
      }
    ]
  },
  {
    path: 'page',
    component: FrontendLayout,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        //path: '',
        loadChildren: './frontend/page/page.module#PageModule',
      }
    ]
  }/*,
  {
    path:'book_details/:slug',
    component: FrontendLayout,
    data:{
      title: 'Book Details'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/enrichment/enrichment.module#EnrichmentModule'
        //loadChildren: './frontend/enrichment/books/books.module#BooksModule'
      }
    ]
  }*/
  /*,
  {
    path: 'pages',
    component: SimpleLayout,
    data: {
      title: 'Pages'
    },
    children: [
      {
        path: '',
        loadChildren: './views/pages/pages.module#PagesModule',
      }
    ]
  }*/
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
