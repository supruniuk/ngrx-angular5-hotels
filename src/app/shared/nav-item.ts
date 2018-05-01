import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hot-nav-item',
  template: `
    <mat-list-item 
      [routerLink]="routerLink" 
      (click)="navigate.emit()" 
      [queryParamsHandling]="queryParamsHandling">

      <mat-icon mat-list-icon>{{ icon }}</mat-icon>
      <span mat-line><ng-content></ng-content></span>
      <span mat-line class="secondary">{{ hint }}</span>
    </mat-list-item>
  `,
})
export class NavItemComponent {
  @Input() icon = '';
  @Input() hint = '';
  @Input() routerLink: string | any[];
  @Input() queryParamsHandling = '';
  @Output() navigate = new EventEmitter();
}
