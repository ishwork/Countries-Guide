import { combineReducers } from "redux";

import countryReducer from "@/redux/reducers/countryReducer";
import favouriteListReducer from "@/redux/reducers/favouriteListReducer";

const rootReducer = combineReducers({
  country: countryReducer,
  favCountries: favouriteListReducer,
});

export default rootReducer;
