import { Dispatch } from "redux";

import { Country } from "@/types";

export const FETCH_COUNTRY_START = "FETCH_COUNTRY_START";
export const FETCH_COUNTRY_SUCCESS = "FETCH_COUNTRY_SUCCESS";
export const FETCH_COUNTRY_ERROR = "FETCH_COUNTRY_ERROR";

export function fetchCountryStart(): CountryStartAction {
  return {
    type: FETCH_COUNTRY_START,
  };
}

export function fetchCountrySuccess(payload: Country[]): CountrySuccessAction {
  return {
    type: FETCH_COUNTRY_SUCCESS,
    payload: payload,
  };
}

export function fetchCountryError(payload: string): CountryErrorAction {
  return {
    type: FETCH_COUNTRY_ERROR,
    payload: payload,
  };
}

export const fetchCountryAsMiddleWare = (countryName: string | null) => {
  return async (dispatch: Dispatch) => {
    try {
      dispatch(fetchCountryStart());
      const response = await fetch(
        `https://restcountries.com/v3.1/name/${countryName}`
      );
      const data = await response.json();
      dispatch(fetchCountrySuccess(data));
    } catch (error) {
      dispatch(fetchCountryError(`${error}`));
    }
  };
};

export type CountryStartAction = {
  type: typeof FETCH_COUNTRY_START;
}

export type CountrySuccessAction = {
  type: typeof FETCH_COUNTRY_SUCCESS;
  payload: Country[];
}

export type CountryErrorAction = {
  type: typeof FETCH_COUNTRY_ERROR;
  payload: string;
}

export type CountriesActions = CountryStartAction | CountrySuccessAction | CountryErrorAction
