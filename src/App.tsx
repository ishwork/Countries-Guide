import React from "react";
import { BrowserRouter, Routes, Route } from "react-router";

import "./App.css";
import Home from "./pages/Home";
import Country from "./pages/Country";
import FavouriteCountries from "./pages/FavouriteCountries";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/:countryName" element={<Country />} />
        <Route path="/country/favourites" element={<FavouriteCountries />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
