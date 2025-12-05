// This hook is used to fetch all countries
import { useState, useEffect } from "react";
import axios from "axios";

const useCountries = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://restcountries.com/v3.1/all`;
  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(url);
        setCountries(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetch();
  }, [url]);
  return [countries, error, loading];
}

export default useCountries;
