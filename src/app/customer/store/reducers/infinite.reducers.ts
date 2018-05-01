import { HotelActionTypes, HotelsActions } from '../../../core/store-entities';

export interface InfiniteState {
  busy: boolean;
  completed: boolean;
  next: string | undefined;
  previous: string | undefined;
  count: number | undefined;
  page: number | undefined;
}

const initialState: InfiniteState = {
  busy: false,
  completed: false,
  next: undefined,
  previous: undefined,
  count: undefined,
  page: 0,
};

export function reducer(
  state = initialState,
  action: HotelsActions
): InfiniteState {
  switch (action.type) {
    case HotelActionTypes.searchHotels: {
      return {
        ...state,
        busy: true,
      };
    }

    case HotelActionTypes.startHotelsNewSearch: {
      return {
        ...initialState,
      };
    }

    case HotelActionTypes.searchHotelsSuccess: {
      const response = action.payload.infiniteParams;

      return {
        busy: false,
        completed: !response.next,
        next: response.next,
        previous: response.previous,
        count: response.count,
        page: state.page + 1,
      };
    }

    default: {
      return state;
    }
  }
}

export const getIsBusy = (state: InfiniteState) => {
  return state.busy;
};

export const getIsCompleted = (state: InfiniteState) => {
  return state.completed;
};

export const getCurrentPage = (state: InfiniteState) => {
  return state.page;
};
