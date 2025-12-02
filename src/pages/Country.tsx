import React, { useEffect } from "react";
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

  useEffect(() => {
    dispatch(fetchCountryAsMiddleWare(countryName || null));
  }, [dispatch, countryName]);

  if (error) {
    return <p>Something went wrong</p>;
  }

  return (
    <>
      {country ? (
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
              title={country[0]?.name.common}
              style={{ textAlign: "center" }}
            />
            <CardMedia
              component="img"
              height="194"
              image={country[0]?.flags?.png || country[0]?.flags?.svg}
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
                <Typography>{country[0]?.name?.official}</Typography>
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
                <Typography>{country[0]?.capital}</Typography>
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
                <Typography>{country[0]?.region}</Typography>
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
                <Typography>
                  {country[0]?.borders
                    ? country[0]?.borders.map((border) => {
                        return <p key={border}>{border}</p>;
                      })
                    : "no border found"}
                </Typography>
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
                  {country[0]?.languages
                    ? Object.values(country[0]?.languages).map((language) => {
                        return <p key={language}>{language}</p>;
                      })
                    : "no languages found"}
                </Typography>
              </AccordionDetails>
            </Accordion>
            <CardActions sx={{ justifyContent: "center" }}>
              <Button
                size="small"
                onClick={() => {
                  navigate("/");
                }}
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
