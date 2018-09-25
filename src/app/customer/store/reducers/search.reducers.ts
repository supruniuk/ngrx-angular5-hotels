import { HotelsActions, HotelActionTypes } from '@app/core/store-entities/actions';
import { SearchParams } from '@app/core/models/search';

export interface SearchState {
  name: string;
  rating: number;
  favorites: boolean;
}

const initialState: SearchState = {
  name: null,
  rating: null,
  favorites: null,
};

export function searchReducer(
  state = initialState,
  action: HotelsActions
): SearchState {
  switch (action.type) {
    case HotelActionTypes.startHotelsNewSearch: {
      const searchParams = action.payload;

      return {
        ...state,
        ...searchParams
      };
    }

    default: {
      return state;
    }
  }
}

// export function searchReducer(
//   state = initialState,
//   action: SearchActions
// ): SearchState {
//   switch (action.type) {
//     case SearchActionTypes.setSearchParams: {
//       const searchParams = action.payload;

//       return {
//         ...state,
//         ...searchParams
//       };
//     }

//     default: {
//       return state;
//     }
//   }
// }

export const getFilter = (state: SearchState) => state;
