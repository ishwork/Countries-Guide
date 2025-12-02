import React from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import { addFavorite } from "../redux/actions/favouriteListAction";
import { Country } from "../types";

export type TableBodyTypes = {
  filteredCountries: Country[]
};

function CountriesTableBody({ filteredCountries}: TableBodyTypes) {
  const styles = useStyles();
  const dispatch = useDispatch();

  const addToFavourite = (countryName: string) => {
    dispatch(addFavorite(countryName));
  };

  console.log(filteredCountries);
  return (
    <>
      <TableBody>
        {filteredCountries?.map((row) => (
          <TableRow
            key={row?.name?.common}
            sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
          >
            <TableCell component="th" scope="row" align="center">
              <img
                height="80"
                width="150"
                src={row?.flags?.png || row?.flags?.svg}
                alt="country flag"
              />
            </TableCell>
            <TableCell align="center">
              <Typography>
                <Link
                  to={`/${row?.name?.common}`}
                  className={styles.countryLink}
                >
                  {row?.name?.common}
                </Link>
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography> {row?.population?.toLocaleString()}</Typography>
            </TableCell>
            <TableCell align="center">
              <Typography> {row?.region}</Typography>
            </TableCell>

              <TableCell align="center">
                {row?.languages && Object.keys(row?.languages).length > 0
                  ? Object.values(row?.languages).map((lang) => {
                      return (
                        <Typography key={lang}>{lang}</Typography>
                      );
                    })
                  : 'N/A'}
              </TableCell> 
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() => addToFavourite(row?.name?.common)}
              >
                Add to favorite
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
}

const useStyles = makeStyles((theme) => ({
  countryLink: {
    textDecoration: "none",
    color: "DodgerBlue",
    "&:hover": {
      color: "red",
    },
  },
}));

export default CountriesTableBody;
