import { createSelector } from '@ngrx/store';
import * as fromHotels from '../reducers/hotels.reducers';
import { EntitiesState, getEntitiesState } from '../reducers';


export const getHotelEntitiesState = createSelector(
  getEntitiesState,
  (state: EntitiesState) => state.hotels
);

export const {
  selectIds: getHotelIds,
  selectEntities: getHotelEntities,
  selectAll: getAllHotels,
  selectTotal: getTotalHotels,
} = fromHotels.adapter.getSelectors(getHotelEntitiesState);

export const getHotelsLoading = createSelector(
  getHotelEntitiesState,
  fromHotels.getHotelsLoading
);

export const getHotelsLoaded = createSelector(
  getHotelEntitiesState,
  fromHotels.getHotelsLoaded
);

export const getSelectedHotelId = createSelector(
  getHotelEntitiesState,
  fromHotels.getSelectedId
);

export const getSelectedHotel = createSelector(
  getHotelEntities,
  getSelectedHotelId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId];
  }
);

export const getSelectedHotelLocation = createSelector(
  getHotelEntitiesState,
  fromHotels.getLatLng
);

export const getSelectedHotelFavorite = createSelector(
  getHotelEntities,
  getSelectedHotelId,
  (entities, selectedId) => {
    return selectedId && entities[selectedId].is_favorite;
  }
);

export const getHotelsNotFound = createSelector(
  getTotalHotels,
  getHotelsLoading,
  (total, loading) => {
    return total === 0 && !loading;
  }
);
