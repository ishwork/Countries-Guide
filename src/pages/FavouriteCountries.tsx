import React from "react";
import Button from "@mui/material/Button";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Card, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { makeStyles } from "@mui/styles";
import DeleteIcon from '@mui/icons-material/Delete';

import { removeFavorite } from "../redux/actions/favouriteListAction";
import {InititalState} from "../redux/store/store"

const useStyles = makeStyles((theme) => ({
  parentDiv: {
    display: "flex",
    justifyContent: "center",
    marginTop: "50px",
  },
  countriesCard: {
    marginTop: 20
  },
  favCountriesList: {
    display: "flex",
    marginTop: 10,
    justifyContent: "center",
  },
  countriesName: {
    width: 200,
    justifyContent: "center",
  },
  deleteButton: {
    width: 50,
    cursor:"pointer",
    color: "red"
  },
  favBackBtn: {
    display: "flex",
    marginTop: 20,
    justifyContent: "center",
  }
  
}));

function FavouriteCountries() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const styles = useStyles();

  const favCountriesList = useSelector(
    (state: InititalState) => state.favCountries.favouriteCountries
  );

  return (
    <div className={styles.parentDiv}>
      <div>
        <Typography variant="h4" color="DodgerBlue">
          Favorite Countries
        </Typography>
        <Card className={styles.countriesCard}>
        {favCountriesList?.length === 0 ? (
          <p>No favourite countries</p>
        ) : (
          favCountriesList.map((country) => {
            return (
              <div key={country} className={styles.favCountriesList}>
                <div className={styles.countriesName}>
                  <Typography>{country}</Typography>
                  </div>
                <div className={styles.deleteButton}><DeleteIcon onClick={() => {
                    dispatch(removeFavorite(country));
                  }}/>
                  </div>
              </div>
            );
          })
        )}
        </Card>
        <div className={styles.favBackBtn}>
          <Button variant="outlined" onClick={() => navigate(-1)}>
            BACK
          </Button>
        </div>
      </div>
    </div>
  );
}

export default FavouriteCountries;
