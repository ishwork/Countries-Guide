import React, { useState, useMemo, useCallback } from "react";
import { Link } from "react-router";
import { Typography, CircularProgress, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import Button from "@mui/material/Button";
import TableContainer from "@mui/material/TableContainer";
import Table from "@mui/material/Table";

import CountriesTableHeader from "../components/CountriesTableHeader";
import CountriesTableBody from "../components/CountriesTableBody";
import SearchBar from "../components/SearchBar";
import { Country } from "../types";
import { useInfiniteCountries, useAllCountries } from "../hooks/useInfiniteCountries";

const Home = () => {
  const styles = useStyles();
  const [search, setSearch] = useState<string>("");

  // Use TanStack Query for infinite loading
  const {
    data,
    error,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage,
    status,
  } = useInfiniteCountries();

  // Fetch all countries for search functionality
  const {
    data: allCountriesData,
    error: allCountriesError,
  } = useAllCountries();

  // Memoize filtered countries to avoid recalculation on every render
  const filteredCountries = useMemo(() => {
    if (search === "") {
      // No search - show paginated results
      return data?.pages.flatMap(page => page.countries) || [];
    } else {
      // Searching - filter through all countries
      if (allCountriesData) {
        return allCountriesData.filter((item: Country) => 
          item.name.common.toLowerCase().includes(search.toLowerCase())
        );
      }
      return [];
    }
  }, [data, allCountriesData, search]);

  // Memoize search handler to prevent recreation on every render
  const SearchHandler = useCallback((event: any) => {
    setSearch(event.target.value);
  }, []);

  // Memoize load more handler
  const handleLoadMore = useCallback(() => {
    fetchNextPage();
  }, [fetchNextPage]);

  // Memoize total count
  const totalCount = useMemo(() => {
    return data?.pages[0]?.totalCount || 0;
  }, [data?.pages]);

  if (status === 'pending') {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
        <Typography variant="h6" sx={{ ml: 2 }}>Loading countries...</Typography>
      </Box>
    );
  }

  if (status === 'error' || allCountriesError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <Typography variant="h6" color="error">
          Something went wrong: {error?.message || allCountriesError?.message}
        </Typography>
      </Box>
    );
  }

  return (
    <div>
      <div className={styles.homePageTitle}>
        <Typography variant="h3" color="DodgerBlue">COUNTRIES DATA</Typography>
        <Typography variant="h4" className={styles.titleText}>
          Get Information About Countries
        </Typography>
      </div>
      <div className={styles.searchFavorite}>
        <div className={styles.search}>
          <SearchBar onChange={SearchHandler} />
        </div>
        <div className={styles.favorite}>
          <Link to="/country/favourites" className={styles.favoriteLink}>
            <Button variant="outlined">See Favorite Countries</Button>
          </Link>
        </div>
      </div>
      <div>
        <TableContainer>
          <Table sx={{ minWidth: 650 }} aria-label="simple table">
            <CountriesTableHeader />
            <CountriesTableBody
              filteredCountries={filteredCountries}
            />
          </Table>
        </TableContainer>
        
        {/* Load More Button - only show when not searching and there are more pages */}
        {hasNextPage && search === "" && (
          <Box display="flex" justifyContent="center" mt={4} mb={2}>
            <Button 
              variant="contained" 
              onClick={handleLoadMore}
              disabled={isFetchingNextPage}
              size="large"
              color="primary"
            >
              {isFetchingNextPage ? (
                <>
                  <CircularProgress size={20} sx={{ mr: 1, color: 'white' }} />
                  Loading More...
                </>
              ) : (
                'Load More Countries'
              )}
            </Button>
          </Box>
        )}

        {/* Loading indicator for background fetching */}
        {isFetching && !isFetchingNextPage && (
          <Box display="flex" justifyContent="center" mt={2}>
            <CircularProgress size={24} />
          </Box>
        )}

        {/* Show total count and current progress */}
        <Box display="flex" justifyContent="center" mt={2} mb={4}>
          <Typography variant="body2" color="text.secondary">
            {search === "" ? (
              // Not searching - show pagination info
              <>
                Showing {filteredCountries.length} countries
                {totalCount > 0 && ` of ${totalCount}`}
              </>
            ) : (
              // Searching - show search results
              <>
                Found {filteredCountries.length} countries matching "{search}"
                {allCountriesData && ` out of ${allCountriesData.length} total`}
              </>
            )}
          </Typography>
        </Box>

        {/* No more countries message */}
        {!hasNextPage && search === "" && data && (
          <Box display="flex" justifyContent="center" mt={2} mb={4}>
            <Typography variant="body2" color="text.secondary" fontStyle="italic">
              All countries loaded!
            </Typography>
          </Box>
        )}
      </div>
    </div>
  );
}

export default Home;

const useStyles = makeStyles((theme) => ({
  homePageTitle: {
    width: "100%",
    textAlign: "center",
    marginTop: 50,
    marginBottom: 50,
  },
  titleText: {
    color: "orange",
  },
  searchFavorite: {
    marginBottom: 100,
  },
  search: {
    float: "left",
    marginLeft: 50,
  },
  favorite: {
    float: "right",
    marginRight: 50,
  },
  favoriteLink: {
    textDecoration: "none",
  },
}));
