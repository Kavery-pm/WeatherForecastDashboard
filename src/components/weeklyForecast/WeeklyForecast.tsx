/**
 * Displays the weekly forecast, grouped by days, with the ability to expand and view hourly details for each day.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {Object} props.forecastData - Weather forecast data containing a list of ForecastItem objects.
 * @param {ForecastItem[]} props.forecastData.list - List of forecast items.
 * @returns {JSX.Element} WeeklyForecast component.
 */

import React, { useState } from "react";
import {
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import Layout from "../reusable/layout";
import { ForecastItem } from "../../types";
import DayWeatherDetails from "../hourlyForecasts/dayWeatherDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import DayTemperatureDetails from "./dayTemperatureDetails";
import HourlyForecast from "../hourlyForecasts/hourlyForecasts";

interface WeeklyForecastProps {
  forecastData: {
    list: ForecastItem[];
  };
}

const WeeklyForecast: React.FC<WeeklyForecastProps> = ({ forecastData }) => {
  const [expandedDay, setExpandedDay] = useState<string | false>(false);
  const [hourlyWeather, setHourlyWeather] = useState<ForecastItem[]>([]);

  if (!forecastData || !forecastData.list || forecastData.list.length === 0) {
    return (
      <div style={{ width: "100%", textAlign: "center" }}>
        <h1>No weather data available.</h1>
      </div>
    );
  }
  // Group forecast data by day
  const groupedData = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!acc[date]) {
      acc[date] = [item];
    } else {
      acc[date].push(item);
    }
    return acc;
  }, {} as { [key: string]: ForecastItem[] });
  // Handle click on a day to expand and show hourly details
  const handleDayClick = (date: string) => {
    setExpandedDay((prevExpanded) => (prevExpanded === date ? false : date));
    setHourlyWeather(groupedData[date]);
  };

  return (
    <Layout
      title={expandedDay ? "Detailed Forecast" : "WEEKLY FORECAST"}
      content={
        <Grid
          item
          container
          display="flex"
          flexDirection="column"
          xs={12}
          gap="4px"
        >
          {Object.keys(groupedData)
            .slice(1, 6) // Display up to 5 days of forecast
            .map((date) => {
              const dayData = groupedData[date];
              const firstDataOfDay = dayData[0];

              const maxTemp = Math.max(
                ...dayData.map((item) => item.main.temp_max)
              );
              const minTemp = Math.min(
                ...dayData.map((item) => item.main.temp_min)
              );
              const humidity = Math.max(
                ...dayData.map((item) => item.main.humidity)
              );

              return (
                <Accordion
                  key={date}
                  expanded={expandedDay === date}
                  onChange={() => handleDayClick(date)}
                  sx={{
                    background: "linear-gradient(-35deg, #000428 0%, #004e92)",
                  }}
                >
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon sx={{ color: "white" }} />}
                  >
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={6}>
                        <DayWeatherDetails
                          day={date}
                          description={firstDataOfDay.weather[0].description}
                          type="day"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DayTemperatureDetails
                          maxTemp={maxTemp}
                          minTemp={minTemp}
                          humidity={humidity}
                        />
                      </Grid>
                    </Grid>
                  </AccordionSummary>
                  <AccordionDetails>
                    <div></div>

                    {/* Display hourly weather details for the selected day */}
                    <Grid
                      container
                      display="flex"
                      flexDirection="column"
                      gap="4px"
                    >
                      <Layout
                        title="HOURLY FORECAST"
                        content={
                          <HourlyForecast hourlyForecast={hourlyWeather} />
                        }
                        mb="1rem"
                        sx={{ marginTop: "2.9rem" }}
                      />
                    </Grid>
                  </AccordionDetails>
                </Accordion>
              );
            })}
        </Grid>
      }
      mb=".8rem"
      sx={{
        display: "flex",
        alignItems: "center",
        flexDirection: "column",
        justifyContent: "center",
        padding: "3rem 0 0",
      }}
    />
  );
};

export default WeeklyForecast;
