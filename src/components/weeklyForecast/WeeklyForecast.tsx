

import React, { useState } from 'react';
import { Grid, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import Layout from '../Layouts/Layout';
import { ForecastItem } from '../../types';
import DayWeatherDetails from './DayWeatherDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import DayTemperatureDetails from './dayTemperatureDetails';

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
      <div style={{ width: '100%', textAlign: 'center' }}>
        <h1>No weather data available.</h1>
      </div>
    );
  }

  const groupedData = forecastData.list.reduce((acc, item) => {
    const date = item.dt_txt.split(' ')[0];
    if (!acc[date]) {
      acc[date] = [item];
    } else {
      acc[date].push(item);
    }
    return acc;
  }, {} as { [key: string]: ForecastItem[] });
 
  const handleDayClick = (date: string) => {
    setExpandedDay((prevExpanded) => (prevExpanded === date ? false : date));
    setHourlyWeather(groupedData[date]);
  };

  return (
    <Layout
      title={expandedDay ? 'Detailed Forecast' : 'WEEKLY FORECAST'}
      content={
        <Grid item container display="flex" flexDirection="column" xs={12} gap="4px">
          {Object.keys(groupedData).slice(1,6).map((date) => {
            const dayData = groupedData[date];
            const firstDataOfDay = dayData[0];
            console.log(firstDataOfDay)
            const maxTemp = Math.max(...dayData.map((item) => item.main.temp_max));
            const minTemp = Math.min(...dayData.map((item) => item.main.temp_min));
            const humidity = Math.max(...dayData.map(item=>item.main.humidity))

            return (
              <Accordion
                key={date}
                expanded={expandedDay === date}
                onChange={() => handleDayClick(date)}
                sx={{
                    background: 'linear-gradient(-35deg, #000428 0%, #004e92)',
                }}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon sx={{color:'white'}} />}>
                <Grid container xs={12} alignItems="center">
                    <Grid item xs={6}>
                      <DayWeatherDetails day={date} description={firstDataOfDay.weather[0].description} type='' />
                    </Grid>
                    <Grid item xs={6}>
                      <DayTemperatureDetails maxTemp={maxTemp} minTemp={minTemp} humidity={humidity}/>
                    </Grid>
                  </Grid>
                </AccordionSummary>
                <AccordionDetails>
                  <div>
                  
                   
                  </div>

                  {/* Display hourly weather details for the selected day */}
                  <Grid container display="flex" flexDirection="column" xs={12} gap="4px">
                    <Grid item container xs={12} gap="4px">
                      {hourlyWeather.map((hourlyData) => (
                        <Grid
                          item
                          key={hourlyData.dt_txt}
                          xs={2} 
                          display="flex"
                          flexDirection="column"
                          alignItems="center"
                          sx={{
                            padding: '2px 0 2px',
                            background: 'rgba(0, 0, 0, 0.05)',
                            borderRadius: '8px',
                          }}
                        >
                         
                          <DayWeatherDetails type='hourly'
                            day={hourlyData.dt_txt}
                            description={hourlyData.weather[0]?.description}
                          />
                        </Grid>
                      ))}
                    </Grid>
                  </Grid>
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Grid>
      }
      mb=".8rem"
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: '3rem 0 0',
      }}
    />
  );
};

export default WeeklyForecast;

