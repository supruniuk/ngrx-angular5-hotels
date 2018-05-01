import { Action } from '@ngrx/store';
import { Booking } from '../../models';


export enum BookingActionTypes {
  bookHotel = '[Entities] Book Hotel',
  bookHotelSuccess = '[Entities] Book Hotel Success',
  bookHotelFail = '[Entities] Book Hotel Fail',
  loadBookings = '[Entities] Load Bookings',
  loadBookingsSuccess = '[Entities] Load Bookings Success',
  loadBookingsFail = '[Entities] Load Bookings Fail',
  startEditBooking = '[Entities] Start Edit Booking',
  cancelEditBooking = '[Entities] Cancel Edit Booking',
}

export class BookHotel implements Action {
  readonly type = BookingActionTypes.bookHotel;

  constructor(public payload: Booking) { }
}

export class BookHotelSuccess implements Action {
  readonly type = BookingActionTypes.bookHotelSuccess;

  constructor(public payload: Booking) { }
}

export class BookHotelFail implements Action {
  readonly type = BookingActionTypes.bookHotelFail;

  constructor(public payload: any) { }
}

export class LoadBookings implements Action {
  readonly type = BookingActionTypes.loadBookings;
}

export class LoadBookingsSuccess implements Action {
  readonly type = BookingActionTypes.loadBookingsSuccess;

  constructor(public payload: any) { }
}

export class LoadBookingsFail implements Action {
  readonly type = BookingActionTypes.loadBookingsFail;

  constructor(public payload: any) { }
}

export class StartEditBooking implements Action {
  readonly type = BookingActionTypes.startEditBooking;

  constructor(public payload: string) { }
}

export class CancelEditBooking implements Action {
  readonly type = BookingActionTypes.cancelEditBooking;
}

export type BookingsActions = 
  | BookHotel
  | BookHotelSuccess
  | BookHotelFail
  | LoadBookings
  | LoadBookingsSuccess
  | LoadBookingsFail
  | StartEditBooking
  | CancelEditBooking;
