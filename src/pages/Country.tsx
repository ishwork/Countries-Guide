import React, { useEffect, useMemo, useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card } from "@mui/material";
import CircularProgress from '@mui/material/CircularProgress';
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { fetchCountryAsMiddleWare } from "../redux/actions/countryAction";
import { InititalState, AppDispatch } from "../redux/store/store";

function Country() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const { countryName } = useParams();

  const country = useSelector((state: InititalState) => state.country.countryData);
  const error = useSelector((state: InititalState) => state.country.error);

  // Memoize country name to prevent unnecessary effect triggers
  const memoizedCountryName = useMemo(() => countryName || null, [countryName]);

  useEffect(() => {
    dispatch(fetchCountryAsMiddleWare(memoizedCountryName));
  }, [dispatch, memoizedCountryName]);

  // Memoize derived values
  const countryData = useMemo(() => country?.[0], [country]);
  
  const languages = useMemo(() => {
    if (!countryData?.languages) return null;
    return Object.values(countryData.languages).map((language) => (
      <p key={language}>{language}</p>
    ));
  }, [countryData?.languages]);

  const borders = useMemo(() => {
    if (!countryData?.borders) return "no border found";
    return countryData.borders.map((border) => <p key={border}>{border}</p>);
  }, [countryData?.borders]);

  // Memoize navigation handler
  const handleBack = useCallback(() => {
    navigate("/");
  }, [navigate]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {countryData ? (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "50px",
          }}
        >
          <Card sx={{ maxWidth: 400 }}>
            <CardHeader
              title={countryData.name.common}
              style={{ textAlign: "center" }}
            />
            <CardMedia
              component="img"
              height="194"
              image={countryData.flags?.png || countryData.flags?.svg}
              alt="Country flag"
            /> 
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Other Names</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{countryData.name?.official}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Capital</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{countryData.capital}</Typography>
              </AccordionDetails>
            </Accordion> 
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Region</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{countryData.region}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Borders</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{borders}</Typography>
              </AccordionDetails>
            </Accordion>
            <Accordion>
              <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1a-content"
                id="panel1a-header"
              >
                <Typography>Languages</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>
                  {languages || "no languages found"}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="small"
                onClick={handleBack}
              >
                BACK
              </Button>
            </CardActions>
          </Card>
        </div>
      ) :
      <CircularProgress/>
      }
    </>
  );
}

export default Country;
