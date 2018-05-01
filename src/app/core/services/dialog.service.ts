import { Injectable, Component } from '@angular/core';
import { ComponentType } from '@angular/cdk/portal';
import {
  MatDialog,
  MatDialogRef,
  MatDialogConfig,
  MAT_DIALOG_DATA
} from '@angular/material';
import { AlertComponent, ConfirmComponent } from '../components/dialogs';


@Injectable()
export class DialogService {

  constructor(public dialog: MatDialog) { }

  // overlay: MatDialogRef<any, any>;

  logoutAlert() {
    return this.openDialog(
      AlertComponent,
      {
        data: {
          title: 'Sign out',
          content: 'Web token is expired, you will be signed out.',
        },
        disableClose: true,
      }
    );
  }

  logoutConfirmBox() {
    return this.openDialog(
      ConfirmComponent,
      {
        data: {
          title: 'Sign out',
          content: 'Are you sure you want to Sign out?',
        },
        disableClose: true,
      }
    );
  }

  openDialog(component: ComponentType<any>, config: MatDialogConfig) {
    return this.dialog.open(component, config);
  }

}
