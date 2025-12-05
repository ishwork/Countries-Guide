import { createStore, applyMiddleware } from "redux";
import thunk, { ThunkDispatch } from "redux-thunk";
import { AnyAction } from "redux";

import { Country } from "@/types";

//for integrating with Chrome's devtool extension to see the Redux states
import { composeWithDevTools } from "redux-devtools-extension";

import rootReducer from "@/redux/reducers/rootReducer";

export type InititalState = {
  favCountries: {
    favouriteCountries: string[]
  }
  country: {
    countryData: Country[]
    loading: boolean
    error: string 
  },
}

const initialState: InititalState = {
  favCountries: { favouriteCountries: [] },
  country: {
    countryData: [],
    loading: false,
    error: '',
  },
};

const storeHouse = () => {
  const favoriteList = localStorage.getItem("countries");
  //if there is favoritelist value in the localStorage, modify the initialState with this value
  if (favoriteList) {
    initialState.favCountries.favouriteCountries = JSON.parse(favoriteList);
  }

  //initialState is used to hydrate the store
  const store = createStore(
    rootReducer,
    initialState,
    composeWithDevTools(applyMiddleware(thunk))
  );
  store.subscribe(() => {
    const currentState = store.getState();
    const favoriteList = currentState.favCountries.favouriteCountries;
    localStorage.setItem("countries", JSON.stringify(favoriteList));
  });

  return store;
};

export type AppDispatch = ThunkDispatch<InititalState, void, AnyAction>;
export default storeHouse;



