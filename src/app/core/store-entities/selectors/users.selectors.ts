import { createSelector } from '@ngrx/store';
import { adapter } from '../reducers/users.reducers';
import { EntitiesState, getEntitiesState } from '../reducers';


export const getUsersEntitiesState = createSelector(
  getEntitiesState,
  (state: EntitiesState) => state.users
);

export const {
  selectIds: getUserIds,
  selectEntities: getUserEntities,
  selectAll: getAllUsers,
  selectTotal: getTotalUsers,
} = adapter.getSelectors(getUsersEntitiesState);
