import React from 'react';
import { Typography } from '@mui/material';

interface DayTemperatureDetailsProps {
  maxTemp: number;
  minTemp: number;
}

const DayTemperatureDetails: React.FC<DayTemperatureDetailsProps> = ({ maxTemp, minTemp }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
  <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
        Visibility: {maxTemp}&deg;C
      </Typography>
         <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
        Sunrise: {maxTemp}&deg;C
      </Typography>
      <Typography variant="body1" color="textPrimary" sx={{color:'white'}}>
        Sunset: {maxTemp}&deg;C
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
