import { Component, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hot-customer-nav-list',
  templateUrl: './customer-nav-list.component.html',
  styleUrls: ['./customer-nav-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomerNavListComponent{

  @Output() onItemClicked = new EventEmitter();
  
  @Output() onLogoutClicked = new EventEmitter();
  
  navListItems = [
    {
      routerLink: '/customer/hotels',
      title: 'Hotels',
      icon: 'hotel',
      hint: 'View hotels',
      queryParams: '',
      queryParamsHandling: ''
    },
    {
      routerLink: '/customer/hotels',
      title: 'Favorite hotels',
      icon: 'star',
      hint: 'Find your favorite hotels',
      queryParams: {favorites: 'true'},
      queryParamsHandling: ''
    },
    {
      routerLink: '/customer/bookings',
      title: 'My bookings',
      icon: 'book',
      hint: 'Observe your bookings',
      queryParams: '',
      queryParamsHandling: ''
    },
    { 
      routerLink: '/customer/hotels/search',
      title: 'Search',
      icon: 'search',
      hint: 'Search hotels',
      queryParams: '',
      queryParamsHandling: 'preserve'
    },
  ];

  constructor() { }
}
