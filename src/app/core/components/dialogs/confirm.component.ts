import { Component, Inject } from '@angular/core';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from '@angular/material';

@Component({
  selector: 'hot-confirm',
  template: `
    <h1 mat-dialog-title>{{data.title}}</h1>
    <div mat-dialog-content class="mat-typography">
      <p>{{data.content}}</p>
    </div>
    <div mat-dialog-actions>
      <button mat-button [mat-dialog-close]="false">Cancel</button>
      <button mat-button [mat-dialog-close]="true" cdkFocusInitial>Ok</button>
    </div>
  `,
  styles: []
})
export class ConfirmComponent {

  constructor(
    public dialogRef: MatDialogRef<ConfirmComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

}
