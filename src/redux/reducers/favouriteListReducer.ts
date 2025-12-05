import { ADD_FAVORITE, REMOVE_FAVORITE , Actions} from "@/redux/actions/favouriteListAction";

export type InitialState = {
  favouriteCountries: string[]
}

const initialState: InitialState = {
  favouriteCountries: [],
};

const favouriteListReducer = (state = initialState, action: Actions): InitialState=> {
  switch (action.type) {
    case ADD_FAVORITE:
      const countryName = action.payload;

      //create a country list and check if country name recieved from payload exist in the list
      const isInList = state.favouriteCountries.some(
        (name) => name === countryName
      );
      //if already in a list already return state
      if (isInList) {
        return state;
      }

      //add new country to the list keeping the original list
      return {
        ...state,
        favouriteCountries: [...state.favouriteCountries, countryName],
      };

    case REMOVE_FAVORITE:
      const removeCountryName = action.payload;

      //create a favorite country list and filter the list excluding the 
      //country name recieved from the payload
      const newList = state.favouriteCountries.filter(
        (name) => name !== removeCountryName
      );
      return {
        ...state,
        favouriteCountries: newList,
      };

    default:
      return state;
  }
};

export default favouriteListReducer;
