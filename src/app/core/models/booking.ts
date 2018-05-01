export class Review {
  id?: string;
  is_liked?: boolean;
  likes_count?: number;
  text: string;
  rating: number;
  created_on: Date;
  customer?: string;
}

export class Booking {
  id?: string;
  start_date: Date | string;
  end_date: Date | string;
  customer: string;
  hotel: string;
  review?: string;
}

export interface BookHotel {
  start_date: string;
  end_date: string;
  customer: string;
  hotel: string;
}

export interface BookingForm {
  bedrooms: number;
  endDate: Date;
  startDate: Date;
}
