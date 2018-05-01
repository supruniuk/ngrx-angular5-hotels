import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Hotel } from '../../models';

@Component({
  selector: 'hot-hotel-info',
  templateUrl: './hotel-info.component.html',
  styleUrls: ['./hotel-info.component.scss']
})
export class HotelInfoComponent implements OnChanges {

  @Input() hotel: Hotel;

  properties: any[];

  constructor() {
    this.properties = [
      { title: 'Availability', name: 'availability', icon: 'event_available', value: undefined },
      { title: 'Rates', name: 'rates', icon: 'monetization_on', value: undefined },
      { title: 'Email', name: 'email', icon: 'mail', value: undefined },
      { title: 'Phone', name: 'phone', icon: 'phone', value: undefined },
      { title: 'Website', name: 'website', icon: 'web', value: undefined },
      { title: 'Location', name: 'location', icon: 'location_city', value: undefined },
    ];
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['hotel']) {
      const hotel = changes['hotel'].currentValue;
      this.properties.forEach(prop => prop.value = hotel[prop.name]);
    }
  }

}
