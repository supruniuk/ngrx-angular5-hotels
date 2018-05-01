import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HotelMenuComponent } from './hotel-menu.component';

describe('HotelMenuComponent', () => {
  let component: HotelMenuComponent;
  let fixture: ComponentFixture<HotelMenuComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HotelMenuComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HotelMenuComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
