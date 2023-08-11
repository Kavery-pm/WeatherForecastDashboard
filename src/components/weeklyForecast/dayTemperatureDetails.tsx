import React from 'react';
import { Typography } from '@mui/material';

interface DayTemperatureDetailsProps {
  maxTemp: number;
  minTemp: number;
  humidity: number
}

const DayTemperatureDetails: React.FC<DayTemperatureDetailsProps> = ({ maxTemp, minTemp,humidity }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
       Humidity: {humidity}%
      </Typography>
       
      <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
        Max: {maxTemp}&deg;C
      </Typography>
      <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
        Min: {minTemp}&deg;C
      </Typography>
    </div>
  );
};

export default DayTemperatureDetails;
