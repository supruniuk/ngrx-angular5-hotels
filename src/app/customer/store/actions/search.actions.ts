import { Action } from '@ngrx/store';
import { SearchParams } from '../../models';


export enum SearchActionTypes {
  setSearchParams = '[Customer] Set Search Parameters',
  // startNewSearch = '[Customer] Start New Search',
}

export class SetSearchParams implements Action {
  readonly type = SearchActionTypes.setSearchParams;

  constructor(public payload: SearchParams) { }
}

// export class StartNewSearch implements Action {
//   readonly type = SearchActionTypes.startNewSearch;

//   constructor(public payload: SearchParams) { }
// }

export type SearchActions = 
  | SetSearchParams;
  // | StartNewSearch;
