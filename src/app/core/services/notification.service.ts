import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material';


@Injectable()
export class NotificationService {
  private config: MatSnackBarConfig = {
    duration: 5000,
    horizontalPosition: 'end',
    verticalPosition: 'bottom',
  };

  constructor(private snackBar: MatSnackBar) { }

  error(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: 'snack-bar-error',
    });
  }

  warning(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: 'snack-bar-warning',
    });
  }

  info(message: string) {
    this.snackBar.open(message, '', {
      ...this.config,
      panelClass: 'snack-bar-info',
    });
  }
}
