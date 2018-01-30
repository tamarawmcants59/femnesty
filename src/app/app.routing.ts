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
        loadChildren: './frontend/group/group.module#GroupModule'
      }
    ]
  },
  {
    path:'mentorship',
    component: FrontendLayout,
    data:{
      title: 'Mentorship Page'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/mentorship/mentorship.module#MentorshipModule'
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
      }
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
      }      
    ]
  },
  {
    path: 'company',
    component: FrontendLayout,
    data: {
      title: 'Login'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/company/company.module#CompanyModule',
      }
      
    ]
  },
  {
    path:'social_home',
    component: FrontendLayout,
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
  },
  {
    path:'**',
    component: FrontendLayout,
    data:{
      title: '404 Page Not Found'
    },
    children: [
      {
        path: '',
        loadChildren: './frontend/frontend.module#FrontendModule'
      }
    ]
  }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes,{useHash: true}) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
