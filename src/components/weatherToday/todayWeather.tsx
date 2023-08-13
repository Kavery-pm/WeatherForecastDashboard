import React from "react";
import { ForecastItem, WeatherData } from "../../types";
import { Card, CardContent, Box, Grid } from "@mui/material";
import Details from "./Details";
import AirConditions from "./AirConditions/AirCondition";
import DayWeatherDetails from "../hourlyForecasts/hourlyForecast";
import Layout from "../Reusable/Layout";

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

  const hourlyContent = (
    <Grid
      container
      display="flex"
      flexDirection="column"
      spacing={2}
      gap="3rem"
      sx={{ marginTop: "12px" }}
    >
      {hourlyForecast.map((hourlyData) => (
        <Grid
          item
          key={hourlyData.dt_txt}
          xs={2}
          display="flex"
          flexDirection="column"
          alignItems="center"
          sx={{
            padding: "2px 0 2px",
            background: "rgba(0, 0, 0, 0.05)",
            borderRadius: "8px",
          }}
        >
          <DayWeatherDetails
            type="DayHourly"
            day={hourlyData.dt_txt}
            description={hourlyData.weather[0]?.description}
          />
        </Grid>
      ))}
    </Grid>
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
            <Layout
              title="HOURLY FORECAST"
              content={hourlyContent}
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
