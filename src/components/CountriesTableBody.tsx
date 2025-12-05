import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router";
import Button from "@mui/material/Button";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { makeStyles } from "@mui/styles";

import { addFavorite } from "@/redux/actions/favouriteListAction";
import { Country } from "@/types";

export type TableBodyTypes = {
  filteredCountries: Country[];
  isMobile?: boolean;
};

const useStyles = makeStyles(() => ({
  countryLink: {
    textDecoration: "none",
    color: "DodgerBlue",
    "&:hover": {
      color: "red",
    },
  },
}));

const CountriesTableBody = ({ filteredCountries, isMobile = false }: TableBodyTypes) => {
  const styles = useStyles();
  const dispatch = useDispatch();

  const addToFavourite = useCallback((countryName: string) => {
    dispatch(addFavorite(countryName));
  }, [dispatch]);

  // console.log(filteredCountries);
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
                height={isMobile ? "40" : "80"}
                width={isMobile ? "60" : "150"}
                src={row?.flags?.png || row?.flags?.svg}
                alt="country flag"
                style={{
                  maxWidth: "100%",
                  height: "auto",
                }}
              />
            </TableCell>
            <TableCell align="center" sx={{ minWidth: isMobile ? "100px" : "auto" }}>
              <Typography sx={{ fontSize: isMobile ? "0.75rem" : "1rem" }}>
                <Link
                  to={`/${row?.name?.common}`}
                  className={styles.countryLink}
                >
                  {row?.name?.common}
                </Link>
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={{ fontSize: isMobile ? "0.7rem" : "1rem" }}>
                {row?.population?.toLocaleString()}
              </Typography>
            </TableCell>
            <TableCell align="center">
              <Typography sx={{ fontSize: isMobile ? "0.7rem" : "1rem" }}>
                {row?.region}
              </Typography>
            </TableCell>

            {!isMobile && (
              <TableCell align="center">
                {row?.languages && Object.keys(row?.languages).length > 0
                  ? Object.values(row?.languages).map((lang) => {
                      return (
                        <Typography key={lang}>{lang}</Typography>
                      );
                    })
                  : 'N/A'}
              </TableCell>
            )}
            
            <TableCell align="center">
              <Button
                variant="contained"
                onClick={() => addToFavourite(row?.name?.common)}
                sx={{
                  fontSize: isMobile ? "0.65rem" : "0.875rem",
                  padding: isMobile ? "4px 8px" : "6px 16px",
                  minWidth: isMobile ? "auto" : "64px",
                }}
              >
                Add to favorite
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </>
  );
};

export default CountriesTableBody;
