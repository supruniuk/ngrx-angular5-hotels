import { Action } from '@ngrx/store';


export enum LayoutActionTypes {
  openSidenav = '[Layout] Open Sidenav',
  closeSidenav = '[Layout] Close Sidenav',
  activateMobileLayout = '[Layout] Activate Mobile Layout',
  activateDesktopLayout = '[Layout] Activate Desktop Layout',
  showLogoutAlert = '[Layout] Show Logout Alert',
  closeLogoutAlert = '[Layout] Close Logout Alert',
  showLogoutConfirmBox = '[Layout] Show Logout Confirmation Box',
  noAction = '[Layout] No Action',
  showNotificationInfo = '[Layout] Show Notification Info',
  showNotificationError = '[Layout] Show Notification Error',
  showNotificationWarning = '[Layout] Show Notification Warning',
  setPageTitle = '[Layout] Set Page Title',
}

export class OpenSidenav implements Action {
  readonly type = LayoutActionTypes.openSidenav;
}

export class CloseSidenav implements Action {
  readonly type = LayoutActionTypes.closeSidenav;
}

export class ActivateMobileLayout implements Action {
  readonly type = LayoutActionTypes.activateMobileLayout;
}

export class ActivateDesktopLayout implements Action {
  readonly type = LayoutActionTypes.activateDesktopLayout;
}

export class ShowLogoutAlert implements Action {
  readonly type = LayoutActionTypes.showLogoutAlert;
}

export class CloseLogoutAlert implements Action {
  readonly type = LayoutActionTypes.closeLogoutAlert;
}

export class ShowLogoutConfirmBox implements Action {
  readonly type = LayoutActionTypes.showLogoutConfirmBox;
}

export class ShowNotificationInfo implements Action {
  readonly type = LayoutActionTypes.showNotificationInfo;

  constructor(public payload: string) { }
}

export class ShowNotificationError implements Action {
  readonly type = LayoutActionTypes.showNotificationError;

  constructor(public payload: string) { }
}

export class ShowNotificationWarning implements Action {
  readonly type = LayoutActionTypes.showNotificationWarning;

  constructor(public payload: string) { }
}

export class NoAction implements Action {
  readonly type = LayoutActionTypes.noAction;
}

export class SetPageTitle implements Action {
  readonly type = LayoutActionTypes.setPageTitle;

  constructor(public payload: string) { }
}

export type LayoutActions = OpenSidenav
  | CloseSidenav
  | ActivateMobileLayout
  | ActivateDesktopLayout
  | ShowLogoutAlert
  | CloseLogoutAlert
  | ShowLogoutConfirmBox
  | NoAction
  | ShowNotificationInfo
  | ShowNotificationError
  | ShowNotificationWarning
  | SetPageTitle;
