import React from 'react';
import { Grid } from '@mui/material';


import Layout from '../Layouts/Layout';
import { ForecastItem } from '../../types';

interface WeeklyForecastProps {
  forecastData: {
    list: ForecastItem[];
  };
}

const WeeklyForecast:React.FC<WeeklyForecastProps> = ({forecastData}) => {
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
  }, {});
  console.log(groupedData)
 console.log(Object.keys(groupedData))
console.log(forecastData);
const firstFiveDays = Object.keys(groupedData).slice(1,6);
console.log(firstFiveDays);
const content = (
  <Grid
    item
    container
    display="flex"
    flexDirection="column"
    xs={12}
    gap="4px"
  >
 
      
      
  </Grid>
);
  return (
    <Layout
      title="WEEKLY FORECAST"
      content={content}
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
