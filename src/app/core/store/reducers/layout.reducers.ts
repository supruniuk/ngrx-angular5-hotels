import { createFeatureSelector } from '@ngrx/store';
import { LayoutActionTypes, LayoutActions } from '../actions/layout.actions';
import { RouterActionTypes, RouterActions } from '../actions/router.actions';


export interface LayoutState {
  showSidenav: boolean;
  isMobile: boolean;
  pageTitle: string;
  isMasterRouteActive: boolean;
}

const initialState: LayoutState = {
  showSidenav: false,
  isMobile: undefined,
  pageTitle: '',
  isMasterRouteActive: true,
};

export function layoutReducer(state = initialState, action: LayoutActions | RouterActions): LayoutState {
  switch (action.type) {
    case LayoutActionTypes.openSidenav:
      return {
        ...state,
        showSidenav: true,
      };

    case LayoutActionTypes.closeSidenav:
      return {
        ...state,
        showSidenav: false,
      };

  //   case LayoutActionTypes.hideToolbar:
  //   return {
  //     ...state,
  //     showToolbar: false,
  //   };

  // case LayoutActionTypes.showToolbar:
  //   return {
  //     ...state,
  //     showToolbar: true,
  //   };

    case LayoutActionTypes.activateDesktopLayout:
      return {
        ...state,
        isMobile: false,
      };

    case LayoutActionTypes.activateMobileLayout:
      return {
        ...state,
        isMobile: true,
      };

    case RouterActionTypes.ROUTE_RESOLVE_SUCCESS:
      const routeData : { 
        pageTitle: string,
        isMasterRouteActive: boolean
      } = action.payload;
      return {
        ...state,
        ...routeData,
      };

    // case LayoutActionTypes.showLogoutAlert:
    //   return {
    //     ...state,
    //     isLogoutAlertOpened: true,
    //   };

    // case LayoutActionTypes.closeLogoutAlert:
    //   return {
    //     ...state,
    //     isLogoutAlertOpened: false,
    //   };

    // case LayoutActionTypes.setPageTitle:
    // return {
    //   ...state,
    //   pageTitle: action.payload
    // };

    default:
      return state;
  }
}

export const getLayoutState = createFeatureSelector<LayoutState>('layout');

export const getShowSidenav = (state: LayoutState) => state.showSidenav;

export const getMobileLayout = (state: LayoutState) =>  state.isMobile;

export const getPageTitle = (state: LayoutState) =>  state.pageTitle;

export const getIsMasterActive = (state: LayoutState) => state.isMasterRouteActive;
