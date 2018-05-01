import { Action } from '@ngrx/store';
import { NavigationExtras } from '@angular/router';



export enum RouterActionTypes {
  GO = '[Router] Go',
  BACK = '[Router] Back',
  FORWARD = '[Router] Forward',
  ROUTE_RESOLVE_SUCCESS = '[Router] Route is resolved',
}

export class Go implements Action {
  readonly type = RouterActionTypes.GO;

  constructor(public payload: {
    path: any[];
    query?: object;
    extras?: NavigationExtras;
  }) { }
}

export class Back implements Action {
  readonly type = RouterActionTypes.BACK;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.FORWARD;
}

export class RouteResolveSuccess implements Action {
  readonly type = RouterActionTypes.ROUTE_RESOLVE_SUCCESS;

  constructor(
    public payload: {
      pageTitle: string,
      isMasterRouteActive: boolean,
    }
  ) { }
}

export type RouterActions
  = Go
  | Back
  | Forward
  | RouteResolveSuccess;
