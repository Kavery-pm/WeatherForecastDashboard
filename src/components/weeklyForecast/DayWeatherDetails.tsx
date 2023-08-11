import { Box, Grid, Typography } from '@mui/material';
import React from 'react';

interface details {
  description: string;
  day: string,
  type:string|undefined;

}
const DayWeatherDetails :React.FC<details> = ({description,day,type}) => {
console.log(day)
  const time = day.split(' ')[1]
  return (
    <Grid
      container
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-start',
        paddingLeft: { xs: '12px', sm: '20px', md: '32px' },
      }}
    >
        <Typography
        variant="body1" 
        component="div"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: 400, sm: 600 },
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
        color:'white',
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'block',
        }}
      >
        {type==='hourly'?time:day}
      
      <Typography
        variant="body1" 
        component="div"
        sx={{
          fontFamily: 'Poppins',
          fontWeight: { xs: 400, sm: 600 },
          fontSize: { xs: '12px', sm: '13px', md: '14px' },
        color:'white',
          lineHeight: 1,
          height: '31px',
          alignItems: 'center',
          display: 'block',
        }}
      >
        Sunday
      </Typography>
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          height: '31px',
        }}
      >
   
       
        <Typography
          variant="h4"
          component="h4"
          sx={{
            fontSize: { xs: '12px', md: '14px' },
            fontWeight: 800,
            color: 'rgba(255,255,255, .8)',
            lineHeight: 1,
            fontFamily: 'Roboto Condensed',
            marginLeft: 3
          }}
        >
         &nbsp; {description}
        </Typography>
        
      </Box>
       
    </Grid>
  );
};

export default DayWeatherDetails;
