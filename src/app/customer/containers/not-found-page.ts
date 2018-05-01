import { Component, ChangeDetectionStrategy } from '@angular/core';

@Component({
  selector: 'hot-not-found-page',
  changeDetection: ChangeDetectionStrategy.OnPush,
  template: `
    <h1>Search Failed</h1>
    <p>No hotels matched your search. Try updating
    <a routerLink="/customer/hotels/search" queryParamsHandling="preserve">search options</a>.</p>
    <button mat-raised-button color="primary" routerLink="/">Take Me Home</button>
  `,
  styles: [
    `
    :host {
      text-align: center;
      height:100%;
      display: flex;
      justify-content: center;
      flex-direction: column;
      align-items: center;
    }
  `,
  ],
})
export class HotelsNotFoundPageComponent {}
