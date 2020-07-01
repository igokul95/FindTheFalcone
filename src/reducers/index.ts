import { combineReducers } from 'redux';

import { ReduxActions } from '../actions';
import * as actionTypes from '../actions/types';
import {
  Planet, Vehicle, Result,
} from '../types/types';

export type State = {
  planet:Planet[];
  vehicle:Vehicle[];
  token:string;
  result:Result;
  time:number
};

export default combineReducers<State, ReduxActions>({
  planet: (state = [], action) => {
    switch (action.type) {
      case actionTypes.SET_PLANET_TO_STORE:
        return action.payload;
      default:
        return state;
    }
  },
  vehicle: (state = [], action) => {
    switch (action.type) {
      case actionTypes.SET_VEHICLES_TO_STORE:
        return action.payload;
      default:
        return state;
    }
  },
  token: (state = '', action) => {
    switch (action.type) {
      case actionTypes.GET_TOKEN:
        return action.payload;
      default:
        return state;
    }
  },
  result: (state = {}, action) => {
    switch (action.type) {
      case actionTypes.FIND_FALCON:
        return action.payload;
      default:
        return state;
    }
  },
  time: (state = 0, action) => {
    switch (action.type) {
      case actionTypes.TIME_TAKEN:
        return action.payload;
      default:
        return state;
    }
  },

});
