import { NgModule, ModuleWithProviders, ErrorHandler } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlexLayoutModule } from '@angular/flex-layout';
import { LayoutModule } from '@angular/cdk/layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material';
import { SharedModule } from '../shared/shared.module';

import { AgmCoreModule } from '@agm/core';

import {
  LayoutComponent,
  RootRedirectComponent,
  NotFoundPageComponent,
} from './containers/';
import { AppComponent } from './components/app/app.component';
import { CustomerNavListComponent } from './components/customer-nav-list/customer-nav-list.component';
import {
  AlertComponent,
  ConfirmComponent,
} from './components/dialogs';
import { entitiesReducers } from './store-entities/reducers';
import { RouterEffects, LayoutEffects } from './store/effects';
import { BookingBaseEffects,HotelsBaseEffects } from './store-entities/effects';
import {
  HotelsService,
  BookingService,
  ReviewService,
  NotificationService,
  DialogService,
  HttpResponseInterceptor,
  MyErrorHandler,
} from './services';
import { GeocodingService } from './services/geocoding.service';


export const COMPONENTS = [
  AppComponent,
  LayoutComponent,
  RootRedirectComponent,
  NotFoundPageComponent,
  AlertComponent,
  ConfirmComponent,
  CustomerNavListComponent
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    LayoutModule,
    SharedModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAw7dRkUMhTH6NU8xJulih_lt6MR-ZLS_o'}),
    StoreModule.forFeature('entities', entitiesReducers),
    EffectsModule.forFeature([
      RouterEffects,
      LayoutEffects,
      BookingBaseEffects,
      HotelsBaseEffects
    ]),
  ],
  entryComponents: [
    AlertComponent,
    ConfirmComponent,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class CoreModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: CoreModule,
      providers: [
        HotelsService,
        BookingService,
        ReviewService,
        NotificationService,
        DialogService,
        GeocodingService,
        // { provide: ErrorHandler, useClass: MyErrorHandler },
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HttpResponseInterceptor,
          multi: true
        },
      ],
    };
  }
}