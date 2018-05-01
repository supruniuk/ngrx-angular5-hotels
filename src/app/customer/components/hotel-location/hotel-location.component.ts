import { Component, Input, ViewChild } from '@angular/core';
import { AgmMap } from '@agm/core';

@Component({
  selector: 'hot-hotel-location',
  templateUrl: './hotel-location.component.html',
  styleUrls: ['./hotel-location.component.css'],
})
export class HotelLocationComponent {

  @ViewChild(AgmMap) map: AgmMap;

  @Input() location: { lat: number, lng: number };

  constructor() { }
}
