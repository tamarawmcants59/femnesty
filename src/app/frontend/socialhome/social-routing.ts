import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SocialhomeComponent } from './socialhome.component';
import { AuthGuard } from '../../auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [AuthGuard],
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
