import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialhomeComponent } from './socialhome.component';

const routes: Routes = [
  {
    path: '',
    component: SocialhomeComponent,
    data: {
      title: 'Social Home'
    }
  }/*,
  {
    path: ':slug',
    component: ArticlecatComponent,
    data: {
      title: 'Category Details'
    }
  }*/
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SocialRouting { }
