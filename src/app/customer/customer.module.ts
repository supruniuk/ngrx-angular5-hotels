import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { MaterialModule } from '../material';
import { VirtualScrollModule } from 'angular2-virtual-scroll';
import { SharedModule } from '../shared/shared.module';
import {
  HotelsPageComponent,
  SearchHotelsComponent,
  SelectedHotelComponent,
  HotelPageComponent,
  BookHotelComponent,
  BookingsPageComponent,
  HotelsNotFoundPageComponent,
  HotelsListComponent
} from './containers';
import { ComponentsModule } from './components';
import { MasterGuard, DetailsGuard, BookingsGuard } from './guards';
import { CustomerRouteNames } from '../core/store';
import { customerReducers } from './store/reducers';
import {
  CustomerHotelEffects,
  CustomerBookingEffects,
  CustomerReviewEffects
} from './store/effects';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'hotels',
  },
  {
    path: 'hotels',
    component: HotelsPageComponent,
    data: {
      routeName: CustomerRouteNames.hotelsMaster,
      isMaster: true,
    },
    children: [
      {
        path: 'search',
        component: SearchHotelsComponent,
        data: {
          routeName: CustomerRouteNames.searchHotels,
        },
      },
      {
        path: ':id',
        component: SelectedHotelComponent,
        canActivate: [DetailsGuard],
        runGuardsAndResolvers: 'paramsChange',
        data: {
          routeName: CustomerRouteNames.hotelDetails,
        },
        children: [
          {
            path: '',
            component: HotelPageComponent
          },
          {
            path: 'book',
            component: BookHotelComponent,
            data: {
              routeName: CustomerRouteNames.bookHotel,
            },
          },
        ]
      },
    ],
  },
  {
    path: 'bookings',
    component: BookingsPageComponent,
    data: {
      routeName: CustomerRouteNames.customerBookings,
      isMaster: true,
    },
  }
];

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    SharedModule,
    ComponentsModule,
    VirtualScrollModule,
    StoreModule.forFeature('customer', customerReducers),
    EffectsModule.forFeature([
      CustomerHotelEffects,
      CustomerBookingEffects,
      CustomerReviewEffects,
    ]),
    RouterModule.forChild(routes),
  ],
  declarations: [
    HotelsPageComponent,
    BookingsPageComponent,
    HotelPageComponent,
    BookHotelComponent,
    SelectedHotelComponent,
    SearchHotelsComponent,
    HotelsNotFoundPageComponent,
    HotelsListComponent,
  ],
  providers: [
    MasterGuard,
    DetailsGuard,
    BookingsGuard,
  ]
})
export class CustomerModule { }
