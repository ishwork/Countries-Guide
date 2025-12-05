
import { Typography } from "@mui/material";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { makeStyles } from "@mui/styles";

type CountriesTableHeaderProps = {
  isMobile?: boolean;
}

const useStyles = makeStyles(() => ({
  styleTableHead: {
    backgroundColor: "DodgerBlue",
  },
  headerTitle: {
    color: "whitesmoke",
  },
}));

const CountriesTableHeader = ({ isMobile = false }: CountriesTableHeaderProps) => {
  const styles = useStyles();

  return (
    <TableHead className={styles.styleTableHead}>
      <TableRow>
        <TableCell align="center">
          <Typography className={styles.headerTitle}>FLAG</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography className={styles.headerTitle}>NAME</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography className={styles.headerTitle}>POPULATION</Typography>
        </TableCell>
        <TableCell align="center">
          <Typography className={styles.headerTitle}>REGION</Typography>
        </TableCell>
        {!isMobile && (
          <TableCell align="center">
            <Typography className={styles.headerTitle}>LANGUAGES</Typography>
          </TableCell>
        )}
        <TableCell align="center">
          <Typography 
            className={styles.headerTitle}
            sx={{ fontSize: isMobile ? "0.7rem" : "1rem" }}
          >
            FAVORITES
          </Typography>
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

export default CountriesTableHeader;
