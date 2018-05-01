import { createSelector } from '@ngrx/store';
import { createEntityAdapter, EntityAdapter, EntityState } from '@ngrx/entity';
import { 
  HotelActionTypes,
  HotelsActions
} from '../actions';
import { Hotel } from '../../models';


export interface HotelsState extends EntityState<Hotel> {
  selectedHotelId: string | null;
  loading: boolean;
  loaded: boolean;
  latlng: {lat: number, lng: number};
}

export function sortByRating(a: Hotel, b: Hotel): number {
  return a.avg_rating < b.avg_rating ? 1 : -1;
}

export const adapter: EntityAdapter<Hotel> = createEntityAdapter<Hotel>({
  selectId: (hotel: Hotel) => hotel.id,
  sortComparer: false,
});

export const initialState: HotelsState = adapter.getInitialState({
  selectedHotelId: null,
  loading: false,
  loaded: false,
  latlng: {lat: 0, lng: 0},
});

export function hotelsReducer(
  state = initialState,
  action: HotelsActions
): HotelsState {
  switch (action.type) {
    case HotelActionTypes.startHotelsNewSearch: {
      return {
        ...adapter.removeAll(state),
        selectedHotelId: null,
        loading: false,
        loaded: false,
      };
    }

    case HotelActionTypes.searchHotels: {
      return {
        ...state,
        loading: true,
      };
    }

    case HotelActionTypes.searchHotelsSuccess: {
      return {
        ...adapter.addMany(action.payload.hotels, state),
        selectedHotelId: state.selectedHotelId,
        loading: false,
        loaded: true,
      };
    }

    case HotelActionTypes.preloadHotel: {
      const hotel = action.payload.hotels[0];
      return {
        ...adapter.addOne(hotel, state),
        selectedHotelId: state.selectedHotelId,
        loading: false,
        loaded: false,
      };
    }

    case HotelActionTypes.searchHotelsFail: {
      return {
        ...state,
        loading: false,
        loaded: true,
      };
    }

    case HotelActionTypes.selectHotel: {
      return {
        ...state,
        selectedHotelId: action.payload,
        // latlng: {lat: 0, lng: 0},
      };
    }

    case HotelActionTypes.deselectHotel: {
      return {
        ...state,
        selectedHotelId: null,
        latlng: {lat: 0, lng: 0},
      };
    }

    case HotelActionTypes.favoriteHotelSuccess: {
      const updatedHotel = { id: action.payload.id, changes: action.payload };

      return {
        ...adapter.updateOne(updatedHotel, state),
        selectedHotelId: state.selectedHotelId,
      };
    }

    case HotelActionTypes.geocodeSelectedLocationSuccess: {
      return {
        ...state,
        latlng: action.payload,
      };
    }
  
    default: {
      return state;
    }
  }
}

export const getSelectedId = (state: HotelsState) => state.selectedHotelId;

export const getHotelsLoading = (state: HotelsState) => state.loading;

export const getHotelsLoaded = (state: HotelsState) => state.loaded;

export const getLatLng = (state: HotelsState) => state.latlng;
