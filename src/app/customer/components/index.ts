import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../../material';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {} from '@types/googlemaps';
import { AgmCoreModule } from '@agm/core';

import { SharedModule } from '../../shared/shared.module';
// import { PipesModule } from '../../shared/pipes';
import { CustomerBookingComponent } from './customer-booking/customer-booking.component';
import { HotelsFilterComponent } from './hotels-filter/hotels-filter.component';
import { HotelMenuComponent } from './hotel-menu/hotel-menu.component';
import { BookingFormComponent } from './booking-form/booking-form.component';
import { HotelInfoComponent } from './hotel-info/hotel-info.component';
import { HotelReviewsComponent } from './hotel-reviews/hotel-reviews.component';
import { HotelLocationComponent } from './hotel-location/hotel-location.component';


export const COMPONENTS = [
  CustomerBookingComponent,
  HotelsFilterComponent,
  HotelMenuComponent,
  BookingFormComponent,
  HotelInfoComponent,
  HotelReviewsComponent,
  HotelLocationComponent
];

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    RouterModule,
    // PipesModule,
    FlexLayoutModule,
    AgmCoreModule,
  ],
  declarations: COMPONENTS,
  exports: COMPONENTS,
})
export class ComponentsModule { }
