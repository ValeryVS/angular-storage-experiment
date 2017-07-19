import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UserModule } from './user/user.module';

import { LayoutComponent } from './core/components/layout/layout.component';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'user',
        loadChildren: 'app/user/user.module#UserModule',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
