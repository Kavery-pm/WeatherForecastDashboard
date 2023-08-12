import { useState, useEffect } from "react";
import "./App.scss";
import { Container, Typography, Grid, Paper, Button, Box } from "@mui/material";
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

function App() {
  const [cityName, setcityName] = useState("");
  const [weather, setweather] = useState<any>(null);
  const [favorites, setFavorites] = useState<string[]>(getFavorites());
  const [forecast, setForecast] = useState<any>(null);
  const [geoWeather, setGeoWeather] = useState<any | null>(null);
  const [error, seterror] = useState<any | null>(null);
  useEffect(() => {
    const fetchGeoWeather = async () => {
      try {
        const position = await new Promise<GeolocationPosition>((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });

        const { latitude, longitude } = position.coords;
        const response = await fetchWeatherByCoordinates(latitude, longitude);
        const forecastResponse = await fetchForecast(response.name);
        setGeoWeather(response);
        setForecast(forecastResponse);
      } catch (error) {
        const errorMessage =
          typeof error === "string" ? error : "Error fetching geolocation-based weather data";
        seterror(errorMessage);
        console.error("Error fetching geolocation-based weather data:", error);
      }
    };

    fetchGeoWeather();
  }, []);

  const handleSearch = async (cityName: string) => {
    try {
      const cityWeatherData = await fetchWeather(cityName);
      const cityForecastData = await fetchForecast(cityName);
      setcityName(cityName);
      setweather(cityWeatherData);
      setForecast(cityForecastData);
      seterror(null);
    } catch (error) {
      const errorMessage =
      typeof error === "string" ? error : "Enter a valid city name";
      console.log(error);
      seterror(errorMessage + "enter a valid city name");
    }
  };
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
  const isCityInFavorites = cityName && favorites.includes(cityName);

  return (
    <Container maxWidth="md" className="app-container">
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        className="app-title"
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
          <SearchForm onSearch={handleSearch} />

          <Grid container spacing={2} sx={{ marginTop: 2 }}>
            <Grid item xs={12} md={4}>
              <Paper
                elevation={3}
                sx={{
                  minHeight: "400px",
                  padding: 2,
                  color: "#FFFFFF",
                  background: "linear-gradient(-35deg, #000428 0%, #004e92)",
                  border: "2px solid #FFFFFF",
                  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
                  borderRadius: "8px",
                  transition: "transform 0.2s ease-in-out",
                  "&:hover": {
                    borderColor: "#00bcd4",
                    transform: "scale(1.05)",
                    cursor: "pointer",
                  },
                }}
              >
                <Typography variant="h6" gutterBottom>
                  Favorite Cities
                </Typography>
                {favorites.length > 0 ? (
                  favorites.map((favoriteCity) => (
                    <Paper
                      key={favoriteCity}
                      sx={{
                        padding: 2,
                        marginBottom: 4,
                        borderRadius: "4px",
                        background:
                          "linear-gradient(-35deg, #FF5722 0%, #FF9800 100%)",
                        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.25)",
                        transition: "transform 0.2s ease-in-out",
                        fontWeight: "600",
                        textTransform: "uppercase",
                        "&:hover": {
                          transform: "scale(1.05)",
                        },
                      }}
                      onClick={() => handleSearch(favoriteCity)}
                    >
                      <Typography className="favorite-city-name">
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
              {geoWeather && !cityName && (
                <Paper elevation={3} className="weather-paper" >
                  <TodayWeather weather={geoWeather} city={geoWeather.name} />
                  <Box sx={{ marginTop: 2 }}></Box>
                </Paper>
              )}
              {cityName && (
                <Paper
                  elevation={3}
                  className="weather-paper"
                  sx={{ display: "block", }}
                >
                  <TodayWeather weather={weather} city={cityName} />
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                      flexDirection: "column",
                      marginTop: 2,
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
          <WeeklyForecast forecastData={forecast} />
        </>
      )}
    </Container>
  );
}

export default App;
