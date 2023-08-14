/**
 * Displays weather details for a specific day or hour.
 *
 * @component
 * @param {Object} props - Component props.
 * @param {string} props.description - Description of the weather.
 * @param {string} props.day - Date and time of the weather data.
 * @param {string} props.type - Type of weather data (day, hourly, DayHourly).
 * @returns {JSX.Element} DayWeatherDetails component.
 */


import { Box, Grid, Typography } from '@mui/material';
import React from 'react';
import { getDays } from '../../utilities/dateUtilities';

interface details {
  description: string;
  day: string;
  type: string | undefined;
}

const DayWeatherDetails: React.FC<details> = ({ description, day, type }) => {
  const time = day.split(' ')[1];

  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        // paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
      }}
    >
      <Box>
          {/* Display date or time based on the type */}
        <Typography
          variant="body1"
          component="div"
          sx={{
            fontFamily: 'Poppins',
            fontWeight: { xs: 400, sm: 600 },
            fontSize: { xs: '12px', sm: '13px', md: '14px' },
            color: 'white',
            lineHeight: 1,
            height: '31px',
            alignItems: 'center',
            display: 'block',
          }}
        >
          {type === 'hourly' || type === 'DayHourly' ? time : day}
             {/* Display day of the week for day type */}
          {type === 'day' && getDays(day)}
        </Typography>
      </Box>

      <Box>
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            fontWeight: 800,
            color: 'rgba(255,255,255, .8)',
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
           
          }}
        >
          {description}
        </Typography>
      </Box>
    </Grid>
  );
};

export default DayWeatherDetails;
