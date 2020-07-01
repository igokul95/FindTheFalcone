import * as actionTypes from './types';
import {
  Planet, Vehicle, Result,
} from '../types/types';


type FetchPlanets = {
  type:actionTypes.SET_PLANET_TO_STORE;
  payload:Planet[];
};
export const fetchPlanets = (payload:Planet[]):FetchPlanets => ({
  type: actionTypes.SET_PLANET_TO_STORE,
  payload,
});

type FetchVehicles = {
  type:actionTypes.SET_VEHICLES_TO_STORE;
  payload:Vehicle[];
};
export const fetchVehicles = (payload:Vehicle[]):FetchVehicles => ({
  type: actionTypes.SET_VEHICLES_TO_STORE,
  payload,
});

type GetToken ={
  type:actionTypes.GET_TOKEN;
  payload:string;
};
export const getToken = (payload:string):GetToken => ({
  type: actionTypes.GET_TOKEN,
  payload,
});
type GetResult ={
  type:actionTypes.FIND_FALCON;
  payload:Result;
};
export const getResult = (payload:Result):GetResult => ({
  type: actionTypes.FIND_FALCON,
  payload,
});
type GetTime ={
  type:actionTypes.TIME_TAKEN;
  payload:number;
};
export const getTime = (payload:number):GetTime => ({
  type: actionTypes.TIME_TAKEN,
  payload,
});


export type ReduxActions = FetchPlanets | FetchVehicles | GetToken | GetResult | GetTime;

// export * from "./thunkActions"
