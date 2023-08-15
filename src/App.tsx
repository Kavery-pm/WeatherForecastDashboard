// /**
//  * Main application component for the Weather Dashboard.
//  */
import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  ThemeProvider,
  CssBaseline,
} from "@mui/material";
import Box from "@mui/system/Box"; // Import from @mui/system
import SearchForm from "./components/searchForm";
import {
  fetchForecast,
  fetchWeather,
  fetchWeatherByCoordinates,
} from "./services/apiServices/weatherApi";
import TodayWeather from "./components/weatherToday/todayWeather";
import { getFavorites, saveFavorites } from "./helpers/storage";
import WeeklyForecast from "./components/weeklyForecast/WeeklyForecast";
import ErrorBox from "./components/reusable/errorBox";
import { WeatherData } from "./types";
import theme, { titleFontFamily } from "./themes/themes"; // Import custom theme
import { styled } from "@mui/system";

// Styled components using @mui/system
const AppContainer = styled(Container)(({ theme }) => ({
  background: `linear-gradient(-35deg, ${theme.palette.background.default} 0%, ${theme.palette.primary.main})`,
}));

const AppTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  margin: "5px",
  fontFamily: `${titleFontFamily}!important`,
}));

const FavoritesPaper = styled(Paper)(({ theme }) => ({
  minHeight: "600px",
  padding: "16px",
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
}));
const FavoriteCityItem = styled(Paper)(({ theme }) => ({
  padding: "17px",
  marginBottom: "1rem",
  borderRadius: "4px",
  background: "linear-gradient(-35deg, #FF5722 0%, #FF9800 100%)",
  boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
  fontWeight: 600,
  textTransform: "uppercase",
  transition: "transform 0.2s ease-in-out",
  "&:hover": {
    transform: "scale(1.05)",
  },
  color: theme.palette.text.primary,
  fontFamily: "'Poppins', Arial, sans-serif",
}));
const FavoriteCityName = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  fontFamily: "'Poppins', Arial, sans-serif",
}));
const WeatherPaper = styled(Paper)(({ theme }) => ({
  padding: "2px",
  color: theme.palette.text.primary,
  display: "block",
  minHeight: "550px",
}));

const AnimatedWeatherPaper = styled(WeatherPaper)(({ theme }) => ({
  transition: "transform 0.2s ease-in-out",
  border: `2px solid ${theme.palette.text.primary}`,
  "&:hover": {
    borderColor: theme.palette.secondary.main,
    transform: "scale(1.05)",
    cursor: "pointer",
  },
}));

function App() {
  // State variables
  const [cityName, setCityName] = useState<string>("");
  const [weather, setWeather] = useState<WeatherData | null>(null);
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
        const response = await fetchWeatherByCoordinates(latitude, longitude);
        const forecastResponse = await fetchForecast(response.name);
        setGeoWeather(response);
        setForecast(forecastResponse);
      } catch (error) {
        const errorMessage =
          typeof error === "string"
            ? error
            : "Error fetching geolocation-based weather data";
        setError(errorMessage);
        console.error("Error fetching geolocation-based weather data:", error);
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
        typeof error === "string" ? error : "Enter a valid city name";
      setError(errorMessage + " Enter a valid city name");
    }
  };
  // Handle adding a city to favorites
  const handleAddFavorite = () => {
    if (cityName && weather) {
      const isValidCity = weather.name.toLowerCase() === cityName.toLowerCase();
      if (isValidCity && !favorites.includes(cityName)) {
        const newFavorites = [...favorites, cityName];
        setFavorites(newFavorites);
        saveFavorites(newFavorites);
      }
    }
  };
  // Check if a city is in favorites
  const isCityInFavorites = cityName && favorites.includes(cityName);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppContainer maxWidth="md">
        <AppTitle variant="h4" align="center" gutterBottom>
          Weather Dashboard
        </AppTitle>
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
                <FavoritesPaper elevation={3}>
                  <Typography variant="h6" gutterBottom>
                    Favorite Cities
                  </Typography>
                  {favorites.length > 0 ? (
                    favorites.map((favoriteCity) => (
                      <FavoriteCityItem
                        key={favoriteCity}
                        // className={classes.favoriteCityItem}
                        onClick={() => handleSearch(favoriteCity)}
                      >
                        <FavoriteCityName>{favoriteCity}</FavoriteCityName>
                      </FavoriteCityItem>
                    ))
                  ) : (
                    <Typography>No favorite cities yet.</Typography>
                  )}
                </FavoritesPaper>
              </Grid>

              <Grid item xs={12} md={8}>
                {/* Weather display */}
                {geoWeather && !cityName && (
                  <AnimatedWeatherPaper elevation={3}>
                    <TodayWeather
                      weather={geoWeather}
                      city={geoWeather.name}
                      forecast={forecast}
                    />
                  </AnimatedWeatherPaper>
                )}
                {cityName && weather && (
                  <WeatherPaper elevation={3}>
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
                  </WeatherPaper>
                )}
              </Grid>
            </Grid>
            {/* Weekly forecast */}
            <WeeklyForecast forecastData={forecast} />
          </>
        )}
      </AppContainer>
    </ThemeProvider>
  );
}

export default App;
