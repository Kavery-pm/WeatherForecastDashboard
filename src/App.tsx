/**
 * Main application component for the Weather Dashboard.
 *
 * @component
 * @returns {JSX.Element} App component.
 */



import  { useState, useEffect } from "react";
import {
  Container,
 Typography,
 Grid,Paper,Button,
  ThemeProvider
} from "@mui/material";

import Box from "@mui/material/Box";
import SearchForm from "./components/searchForm";
import {
  fetchForecast,
  fetchWeather,
  fetchWeatherByCoordinates,
} from "./services/apiServices/weatherApi";
import TodayWeather from "./components/weatherToday/todayWeather";
import { getFavorites, saveFavorites } from "./helpers/storage";
import WeeklyForecast from "./components/weeklyForecast/WeeklyForecast";
import ErrorBox from "./components/Reusable/ErrorBox";
import { WeatherData } from "./types";
import { makeStyles, createStyles } from "@mui/styles";
import theme, { titleFontFamily } from "./themes/themes"; // Import your custom theme
import clsx from 'clsx';

const useStyles = makeStyles((theme) =>
  createStyles({
   
    appContainer: {
      background: `linear-gradient(-35deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main})`,
      
    },
    appTitle: {
      color: theme.palette.text.primary,
      margin: "5px",
      fontFamily: `${titleFontFamily}!important`,
      fontSize:'1rem'
     
    },
    favoritesPaper: {
      minHeight: "600px",
      padding: '16px',
      color: "#FFFFFF",
      background: `linear-gradient(-35deg,${theme.palette.background.default} 0%, ${theme.palette.primary.main})`,
      border: "2px solid #FFFFFF",
      boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
      borderRadius: "8px",
      transition: "transform 0.2s ease-in-out",
  
      "&:hover": {
        borderColor: "#00bcd4",
        transform: "scale(1.05)",
        cursor: "pointer",
      },
    },
    favoriteCityName: {
      color: theme.palette.text.primary,
      fontFamily: "'Poppins', Arial, sans-serif",
    },
    favoriteCityItem: {
      padding: '17px',
      marginBottom: '1rem',
      borderRadius: "4px",
      background: "linear-gradient(-35deg, #FF5722 0%, #FF9800 100%)",
      boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
      fontWeight: 600,
      textTransform: "uppercase",
      transition: "transform 0.2s ease-in-out",
      "&:hover": {
        transform: "scale(1.05)",
      },
    },
    weatherPaper: {
      padding: "2px",
      color: theme.palette.text.primary,
      display: "block",
      minHeight: "550px",
    },
    animatedWeather: {
      transition: "transform 0.2s ease-in-out",
      border: `2px solid ${theme.palette.text.primary}`,
      "&:hover": {
        borderColor: theme.palette.secondary.main,
        transform: "scale(1.05)",
        cursor: "pointer",
      },
    },
  })
);
function App() {
  const classes = useStyles();

    // State variables
  const [cityName, setCityName] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData|null>(null); 
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [forecast, setForecast] = useState<any>(null); 
  const [geoWeather, setGeoWeather] = useState<any>(null); 
  const [error, setError] = useState<string | null>(null); 

  // Fetch geolocation-based weather data on component mount
  useEffect(() => {
    const fetchGeoWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>(
          (resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          }
        );

        const { latitude, longitude } = position.coords;
        const response = await fetchWeatherByCoordinates(
          latitude,
          longitude
        );
        const forecastResponse = await fetchForecast(response.name);
        setGeoWeather(response);
        setForecast(forecastResponse);
      } catch (error) {
        const errorMessage =
          typeof error === "string"
            ? error
            : "Error fetching geolocation-based weather data";
        setError(errorMessage);
        console.error(
          "Error fetching geolocation-based weather data:",
          error
        );
      }
    };

    fetchGeoWeather();
  }, []);

  // Handle city search
  const handleSearch = async (cityName: string) => {
    try {
      const cityWeatherData = await fetchWeather(cityName);
      const cityForecastData = await fetchForecast(cityName);
      setCityName(cityName);
      setWeather(cityWeatherData);
      setForecast(cityForecastData);
      setError(null);
    } catch (error) {
      const errorMessage =
        typeof error === "string"
          ? error
          : "Enter a valid city name";
      setError(errorMessage + " Enter a valid city name");
    }
  };

  // Handle adding a city to favorites
  const handleAddFavorite = () => {
    if (cityName && weather) {
      const isValidCity =
        weather.name.toLowerCase() === cityName.toLowerCase();
      if (isValidCity && !favorites.includes(cityName)) {
        const newFavorites = [...favorites, cityName];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
      }
    }
  };

  // Check if a city is in favorites
  const isCityInFavorites =
    cityName && favorites.includes(cityName);


  return (
     <ThemeProvider theme={theme}>
      
      <Container maxWidth="md"  className={classes.appContainer}>
      <Typography
        variant="h4"
       align="center"
        gutterBottom
        className={classes.appTitle}
       >
         Weather Dashboard
       </Typography>
       {error && (
        <ErrorBox
          margin="3rem auto"
          flex="inherit"
          type="error"
          errorMessage={error}
        />
      )}
            {!error && (
        <>
          {/* Search form */}
          <SearchForm onSearch={handleSearch} />

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={4}>
              {/* Favorite Cities */}
              <Paper
                elevation={3}
               className={classes.favoritesPaper}
              >
                <Typography variant="h6" gutterBottom>
                  Favorite Cities
                </Typography>
                {favorites.length > 0 ? (
                  favorites.map((favoriteCity) => (
                    <Paper
                      key={favoriteCity}
                     className={classes.favoriteCityItem}
                      onClick={() => handleSearch(favoriteCity)}
                    >
                      <Typography className={classes.favoriteCityName}>
                        {favoriteCity}
                      </Typography>
                    </Paper>
                  ))
                ) : (
                  <Typography>No favorite cities yet.</Typography>
                )}
              </Paper>
            </Grid>

            <Grid item xs={12} md={8}>
              {/* Weather display */}
              {geoWeather && !cityName && (
                <Paper elevation={3} className={clsx(classes.weatherPaper, classes.animatedWeather)}>
                  <TodayWeather
                    weather={geoWeather}
                    city={geoWeather.name}
                    forecast={forecast}
                  />
                 
                </Paper>
              )}
              {cityName && weather && (
                <Paper
                  elevation={3}
                 className={classes.weatherPaper}
                >
                  <TodayWeather
                    weather={weather}
                    city={cityName}
                    forecast={forecast}
                  />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      marginTop: 3,
                      marginBottom: 2,
                    }}
                  >
                    {!isCityInFavorites && (
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={handleAddFavorite}
                        sx={{
                          alignItems: "center",
                          padding: "10px",
                        }}
                      >
                        Add to Favorites
                      </Button>
                    )}
                  </Box>
                </Paper>
              )}
            </Grid>
          </Grid>
          {/* Weekly forecast */}
          <WeeklyForecast forecastData={forecast} />
        </>
      )}
      </Container>
     </ThemeProvider>
  );
}

export default App;
