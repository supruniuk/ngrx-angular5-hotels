import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hot-hotel-menu',
  templateUrl: './hotel-menu.component.html',
  styleUrls: ['./hotel-menu.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HotelMenuComponent {

  @Input() isFavorite: boolean;

  @Output() onFavorite = new EventEmitter();

  @Output() onContact = new EventEmitter();

  @Output() onBook = new EventEmitter();

  constructor() { }
}
