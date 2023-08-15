/**
 * Displays the current weather, air conditions, and hourly forecast for a specific city.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {WeatherData} props.weather - Current weather data for the city.
 * @param {string} props.city - Name of the city.
 * @param {Object} props.forecast - Forecast data for the city.
 * @param {Array<ForecastItem>} props.forecast.list - List of forecast items.
 * @returns {JSX.Element} TodayWeather component.
 */
import React from "react";
import { ForecastItem, WeatherData } from "../../types";
import { Card, CardContent, Box, Grid } from "@mui/material";
import Details from "./details";
import AirConditions from "./airConditions/airCondition";
import Layout from "../Reusable/layout";
import HourlyForecast from "../hourlyForecasts/hourlyForecasts";

interface TodayWeatherProps {
  weather: WeatherData;
  city: string;
  forecast: {
    list: ForecastItem[];
  };
}

const TodayWeather: React.FC<TodayWeatherProps> = ({
  weather,
  city,
  forecast,
}) => {
  const currentDate = new Date().toISOString().slice(0, 10); // Get current date in YYYY-MM-DD format
  const hourlyForecast = forecast?.list.filter((item: any) =>
    item.dt_txt.includes(currentDate)
  );

  return (
    <Card sx={{ background: "linear-gradient(-35deg, #000428 0%, #004e92)" }}>
      <CardContent>
        <Box mt={1}>
          <Grid
            container
            sx={{ padding: "3rem 0rem 0rem" }}
            className="todayWeatherbox"
          >
            <Details data={weather} city={city} />
            <AirConditions data={weather} />
            {/* displays the hourly forecast for the current date */}
            <Layout
              title="HOURLY FORECAST"
              content={<HourlyForecast hourlyForecast={hourlyForecast} />}
              mb="1rem"
              sx={{ marginTop: "2.9rem" }}
            />
          </Grid>
        </Box>
      </CardContent>
    </Card>
  );
};

export default TodayWeather;
