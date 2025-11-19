export interface Country {
  id: string;
  name: string;
  flag: string;
}

export interface CountriesState {
  data: Record<string, Country>;
  loading: boolean;
  error: string | null;
}

export const COUNTRIES_LOADING = "COUNTRIES_LOADING" as const;
export const COUNTRIES_SUCCESS = "COUNTRIES_SUCCESS" as const;
export const COUNTRIES_ERROR = "COUNTRIES_ERROR" as const;

interface CountriesLoadingAction {
  type: typeof COUNTRIES_LOADING;
}

interface CountriesSuccessAction {
  type: typeof COUNTRIES_SUCCESS;
  payload: Record<string, Country>;
}

interface CountriesErrorAction {
  type: typeof COUNTRIES_ERROR;
  payload: string;
}

export type CountriesAction =
  | CountriesLoadingAction
  | CountriesSuccessAction
  | CountriesErrorAction;

export const initialState: CountriesState = {
  data: {},
  loading: false,
  error: null,
};


