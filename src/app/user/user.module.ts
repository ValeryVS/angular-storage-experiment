import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';

import { UserListComponent } from './user-list/user-list.component';

@NgModule({
  imports: [
    CommonModule,

    UserRoutingModule,
  ],
  declarations: [
    UserListComponent,
  ],
})
export class UserModule { }
