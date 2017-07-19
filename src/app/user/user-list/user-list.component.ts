import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { OrganizationService } from '../../store/organization/services';
import { User, UserDenormalized } from '../../store/user/model';
import { UserService } from '../../store/user/services';

@Component({
  selector: 'se-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.sass'],
})
export class UserListComponent {

  public currentUser$ = this.userService.getCurrent();

  public users$ = Observable.combineLatest(
    this.userService.getAll(),
    this.organizationService.getEntities(),
  ).map(([users, organizationEntities]) => {
    // TODO
    // move denormalization to reducer
    return users.map<UserDenormalized>((user) => {
      const userDenormalized = Object.assign({}, user as UserDenormalized);
      userDenormalized.organization = organizationEntities[userDenormalized.id];
      return userDenormalized;
    });
  });

  constructor(
    private organizationService: OrganizationService,
    private userService: UserService,
  ) {
    this.organizationService.fetchAll();
    this.userService.fetchAll();
    this.userService.setCurrent(1);
  }

}
