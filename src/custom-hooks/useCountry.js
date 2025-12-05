// This hook is used to fetch one specific country
import { useEffect, useState } from "react";
import axios from "axios";

const useCountry = (countryName) => {
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const url = `https://restcountries.com/v3.1/name/${countryName}`;

  useEffect(() => {
    const fetch = async () => {
      try {
        const { data } = await axios.get(url);
        setCountry(data);
      } catch (error) {
        setError(error);
      }
      setLoading(false);
    };
    fetch();
  }, [url]);
  return [country, error, loading];
}

export default useCountry;
