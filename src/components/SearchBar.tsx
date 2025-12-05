import React from "react";

type searchBarPropsType = {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchBar = (props: searchBarPropsType) => {
  return (
    <>
      <div style={{ 
        width: "100%", 
        maxWidth: "50rem",
        display: "flex",
        flexDirection: "column",
        gap: "8px"
      }}>
        <input
          data-testid="search-input"
          type="search"
          placeholder="Search"
          aria-label="Search"
          aria-describedby="search-addon"
          onChange={props.onChange}
          style={{
            width: "100%",
            padding: "10px 15px",
            fontSize: "16px",
            border: "1px solid #ccc",
            borderRadius: "4px",
            boxSizing: "border-box"
          }}
        />
        <span id="search-addon" style={{ 
          color: "DodgerBlue", 
          fontSize: "clamp(14px, 3vw, 20px)"
        }}>
          <i>Search for a country</i>
        </span>
      </div>
    </>
  );
}

export default SearchBar;
