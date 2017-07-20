import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { BrowserModule } from '@angular/platform-browser';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

import { AppRoutingModule } from './app-routing.module';
import { CoreModule } from './core/core.module';

import { AppComponent } from './core/components/app/app.component';

import { environment } from '../environments/environment';
import { OrganizationService } from './store/organization/services';
import { metaReducers, reducerProvider, reducerToken } from './store/reducer';
import { UserService } from './store/user/services';

@NgModule({
  declarations: [],
  imports: [
    BrowserModule,
    HttpModule,

    NgbModule.forRoot(),
    StoreModule.forRoot(reducerToken, { metaReducers }),
    EffectsModule.forRoot([OrganizationService, UserService]),
    !environment.production ? StoreDevtoolsModule.instrument({ maxAge: 50 }) : [],

    AppRoutingModule,
    CoreModule,
  ],
  providers: [
    OrganizationService,
    UserService,
    reducerProvider,
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
