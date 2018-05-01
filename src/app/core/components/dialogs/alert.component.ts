import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'hot-alert',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content class="mat-typography">
      <p>{{data.content}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button (click)="onOkClick()">Ok</button>
    </div>
  `,
  styles: []
})
export class AlertComponent {

  constructor(
    public dialogRef: MatDialogRef<AlertComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) { }

    onOkClick(): void {
    this.dialogRef.close();
  }

}
