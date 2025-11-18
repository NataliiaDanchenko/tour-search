import {
  type Country,
  COUNTRIES_LOADING,
  COUNTRIES_SUCCESS,
  COUNTRIES_ERROR,
  type CountriesAction,
} from "../types";

export const setCountries = (countries: Record<string, Country>): CountriesAction => ({
  type: COUNTRIES_SUCCESS,
  payload: countries,
});

export const setCountriesError = (error: string): CountriesAction => ({
  type: COUNTRIES_ERROR,
  payload: error,
});

export const setCountriesLoading = (): CountriesAction => ({
  type: COUNTRIES_LOADING,
});
