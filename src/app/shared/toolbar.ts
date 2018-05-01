import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hot-toolbar',
  template: `
    <mat-toolbar color="primary" class="mat-elevation-z4">
      <button mat-icon-button (click)="openMenu.emit()">
        <mat-icon>menu</mat-icon>
      </button>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class ToolbarComponent {
  @Output() openMenu = new EventEmitter();
}
