import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';

import * as actions from './index';
import { State } from '../reducers';
import {
  Planet, Vehicle, Result,
} from '../types/types';


export const planetsApi = (
): ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  const planetFetch:Planet[] = await fetch('https://findfalcone.herokuapp.com/planets')
    .then((response) => response.json());

  console.log(planetFetch);
  dispatch(actions.fetchPlanets(planetFetch));
};

export const VehiclesApi = (
):ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  const vehicleFetch:Vehicle[] = await fetch('https://findfalcone.herokuapp.com/vehicles')
    .then((response) => response.json());
  dispatch(actions.fetchVehicles(vehicleFetch));
};

export const GetTokenFromApi = (
):ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  const tokenFetch:string = await fetch('https://findfalcone.herokuapp.com/token', { headers: { Accept: 'application/json' }, method: 'POST' })
    .then((response) => response.json());
  console.log(tokenFetch);
  dispatch(actions.getToken(tokenFetch));
};

export const GetResultFromApi = (
  selectedData:object,
):ThunkAction<void, State, unknown, Action<string>> => async (dispatch) => {
  console.log('SelectedConsole:::', selectedData);
  const fetchResult:Result = await fetch('https://findfalcone.herokuapp.com/find',
    {
      method: 'POST',
      headers: { Accept: 'application/json', 'Content-Type': 'application/json' },
      body: JSON.stringify(selectedData),
    })
    .then((response) => response.json());
  console.log(fetchResult);
  dispatch(actions.getResult(fetchResult));
};
