import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerNavListComponent } from './customer-nav-list.component';

describe('CustomerNavListComponent', () => {
  let component: CustomerNavListComponent;
  let fixture: ComponentFixture<CustomerNavListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CustomerNavListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CustomerNavListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
