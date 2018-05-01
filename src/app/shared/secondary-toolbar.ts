import { Component, Output, Input, EventEmitter } from '@angular/core';

@Component({
  selector: 'hot-secondary-toolbar',
  template: `
    <mat-toolbar>
      <button mat-icon-button *ngIf="showBackButton" (click)="onGoBack.emit()">
        <mat-icon>arrow_back</mat-icon>
      </button>
      <span class="hot-toolbar-title">{{title}}</span>
      <span class="spacer"></span>
      <ng-content></ng-content>
    </mat-toolbar>
  `,
})
export class SecondaryToolbarComponent {
  @Input() showBackButton: boolean;
  @Input() title: string;

  @Output() onGoBack = new EventEmitter();
}
