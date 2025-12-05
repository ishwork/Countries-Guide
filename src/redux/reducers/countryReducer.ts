import {
  FETCH_COUNTRY_START,
  FETCH_COUNTRY_SUCCESS,
  FETCH_COUNTRY_ERROR,
  CountriesActions
} from "@/redux/actions/countryAction";
import { Country } from "@/types";

export type CountryInitialStateType = {
  countryData: Country[] 
  error: string 
  loading: boolean
} 

const initialState: CountryInitialStateType = {
  countryData: [],
  loading: false,
  error: '',
};

const countryReducer = (state = initialState, action: CountriesActions): CountryInitialStateType => {
  switch (action.type) {
    case FETCH_COUNTRY_START:
      return {
        ...state,
        loading: true,
      };
    case FETCH_COUNTRY_SUCCESS:
      return {
        ...state,
        countryData: action.payload,
        loading: false,
      };
    case FETCH_COUNTRY_ERROR:
      return {
        ...state,
        error: action.payload,
        loading: false,
      };
    default:
      return state;
  }
};

export default countryReducer;
