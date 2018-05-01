import { createSelector } from '@ngrx/store';
import { LayoutState, getLayoutState } from '../reducers/layout.reducers';
import * as fromLayout from '../reducers/layout.reducers';


export const getPageTitle = createSelector(
  getLayoutState,
  fromLayout.getPageTitle
);

export const getShowSidenav = createSelector(
  getLayoutState,
  fromLayout.getShowSidenav
);

export const getMobileLayout = createSelector(
  getLayoutState,
  fromLayout.getMobileLayout
);

export const getIsMasterActive = createSelector(
  getLayoutState,
  fromLayout.getIsMasterActive
);

// export const getIsLogoutAlertOpened = createSelector(
//   getLayoutState,
//   fromLayout.getIsLogoutAlertOpened
// );

export const getShowMaster = createSelector(
  getIsMasterActive,
  getMobileLayout,
  (masterActive, isMobileLayout) => {
    return isMobileLayout ? masterActive : true;
  }
);

export const getShowDetails = createSelector(
  getIsMasterActive,
  getMobileLayout,
  (masterActive, isMobileLayout) => {
    return isMobileLayout ? !masterActive : true;
  }
);

export const getShowToolbar = createSelector(
  getIsMasterActive,
  getMobileLayout,
  (masterActive, isMobileLayout) => {
    return isMobileLayout ? masterActive : true;
  }
);
