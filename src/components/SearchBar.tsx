import React from "react";

type searchBarPropsType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}


const SearchBar = (props: searchBarPropsType) => {
  return (
    <>
      <div style={{ width: "50rem" }}>
        <input
          data-testid="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={props.onChange}
        />
        <span id="search-addon" style={{ color: "DodgerBlue", fontSize: 20 }}>
          <i>Search for a country</i>
        </span>
      </div>
    </>
  );
}

export default SearchBar;
