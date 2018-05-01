import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelReviewsComponent } from './hotel-reviews.component';

describe('HotelReviewsComponent', () => {
  let component: HotelReviewsComponent;
  let fixture: ComponentFixture<HotelReviewsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelReviewsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelReviewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
