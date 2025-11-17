import { COUNTRIES_ERROR, COUNTRIES_LOADING, COUNTRIES_SUCCESS, type CountriesState, type CountriesAction, initialState } from "./types";

export const countriesReducer = (
  state: CountriesState = initialState,
  action: CountriesAction
): CountriesState => {
  switch (action.type) {
    case COUNTRIES_LOADING:
      return { ...state, loading: true, error: null };
    case COUNTRIES_SUCCESS:
      return { data: action.payload, loading: false, error: null };
    case COUNTRIES_ERROR:
      return { ...state, loading: false, error: action.payload };
    default:
      return state;
  }
};

