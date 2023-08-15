/**
 * Displays the hourly weather forecast for a specific day, including weather descriptions and times.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {ForecastItem[]} props.hourlyForecast - List of forecast items for hourly weather.
 * @returns {JSX.Element} HourlyForecast component.
 */


import React from "react";
import { Grid } from "@mui/material";
import DayWeatherDetails from "../hourlyForecasts/dayWeatherDetails";
import { ForecastItem } from "../../types";

interface HourlyForecastProps {
  hourlyForecast: ForecastItem[];
}

const HourlyForecast: React.FC<HourlyForecastProps> = ({ hourlyForecast }) => {
  return (
    <Grid container display="flex" flexDirection="row" gap="3rem" sx={{ marginTop: "12px" }}>
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
};

export default HourlyForecast;
